from flask import Flask, request
import subprocess

app = Flask(__name__)

@app.route('/execute', methods=['POST'])
def execute_code():
    # リクエストからコードと入力を取得
    data = request.get_json()
    code = data.get('code')
    language = data.get('language')
    user_input = data.get('input')

    # コードを一時ファイルに書き込む
    file_extension = 'cpp' if language == 'cpp' else 'py'
    filename = f'temp_code.{file_extension}'
    with open(filename, 'w') as f:
        f.write(code)

    if language == 'cpp':
        # C++コードをコンパイルして実行
        compile_command = ['g++', '-o', 'temp_code', filename]
        subprocess.run(compile_command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        execution_result = subprocess.run(['./temp_code'], input=user_input, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    elif language == 'python':
        # Pythonコードを実行
        execution_result = subprocess.run(['python', filename], input=user_input, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    else:
        return "Unsupported language", 400

    # 一時ファイルと実行ファイルを削除
    subprocess.run(['rm', filename])
    if language == 'cpp':
        subprocess.run(['rm', 'temp_code'])

    # 結果を返す
    return execution_result.stdout if execution_result.returncode == 0 else execution_result.stderr, execution_result.returncode

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
