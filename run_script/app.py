from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
import boto3
import subprocess

load_dotenv()

app = Flask(__name__)

@app.route('/run', methods=['POST'])
def run_code():
    data = request.get_json()
    code = data.get('code')
    language = data.get('language')
    user_input = data.get('input')

    print(code)
    print(language)
    print(user_input)

    s3 = boto3.resource(
        's3',
        endpoint_url=os.getenv('ENDPOINT_URL'),
        aws_access_key_id=os.getenv('ACCESS_KEY'),
        aws_secret_access_key=os.getenv('SECRET_KEY')
    )

    bucket = s3.Bucket('reference')
    bucket.download_file(code, code)
    bucket.download_file(user_input, user_input)


    file_name, file_extension= os.path.splitext(code)
    out_script  = file_name + '.out'

    if language == 'cpp':
        compile_process = subprocess.Popen(['g++', '-o', out_script, code])
        _, compile_error = compile_process.communicate()

        if compile_process.returncode != 0:
            error_file = 'error_' + user_input
            with open(error_file, 'w') as f:
                f.write(compile_error.decode())
                bucket.upload_file(error_file, 'output_' + user_input)
                delete_file(error_file)
                delete_file(code)
                delete_file(user_input)
                return jsonify({"success": True, "message": "Compilation failed."}), 500

        elif compile_process.returncode == 0:
            execute_process = subprocess.Popen(['./' + out_script], stdin=subprocess.PIPE, stdout=subprocess.PIPE)

            with open(user_input, 'r') as f:
                input_data = f.read()

                output_data, _ = execute_process.communicate(input_data.encode())

                output_file = 'output_' + user_input

                with open(output_file, 'w') as f:
                    f.write(output_data.decode())
                
                bucket.upload_file(output_file, output_file)

                delete_file(code)
                delete_file(user_input)
                delete_file(out_script)
                delete_file(output_file)

                return jsonify({"success": True, "message": "Compilation and execution successful."}), 200

        else:
            delete_file(code)
            delete_file(user_input)
            delete_file(out_script)
            return jsonify({"success": False, "message": "Compilation failed."}), 500
        
    elif language == 'python':
        try:
            execute_process = subprocess.Popen(['python3', code], stdin=subprocess.PIPE, stdout=subprocess.PIPE)

            with open(user_input, 'r') as f:
                input_data = f.read()

                output_data, error_data = execute_process.communicate(input_data.encode())

                output_file = 'output_' + user_input

                with open(output_file, 'w') as f:
                    f.write(output_data.decode())
                
                if error_data:
                    error_file = 'error_' + user_input
                    with open(error_file, 'w') as f:
                        f.write(error_data.decode())
                        bucket.upload_file(error_file, output_file)
                        delete_file(error_file)
                        delete_file(code)
                        delete_file(user_input)
                        delete_file(output_file)
                        return jsonify({"success": True, "message": "Execution failed."}), 500

                bucket.upload_file(output_file, output_file)

                delete_file(code)
                delete_file(user_input)
                delete_file(output_file)

                return jsonify({"success": True, "message": "Execution successful."}), 200
        except Exception as e:
            delete_file(code)
            delete_file(user_input)
            return jsonify({"success": False, "message": str(e)}), 500


def delete_file(file_path):
    if os.path.exists(file_path):
        os.remove(file_path)

if __name__ == '__main__':
    app.run()