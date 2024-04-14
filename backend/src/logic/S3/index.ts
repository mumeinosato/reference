import * as Minio from 'minio';
import { config } from 'dotenv';

config();

const s3client = new Minio.Client({
    endPoint: process.env.ENDPOINT || 'default-value',
    port: parseInt(process.env.PORT || '9000'),
    useSSL: false,
    accessKey: process.env.ACCESSKEY || 'accessKey',
    secretKey: process.env.SECRETKEY || 'secretKey'
});

const sourcefile = 'src/logic/S3/test.txt';

const bucket = 'reference';

const destfile = 'test.txt';

const metaData = {
    'Content-Type': 'text/plain',
    'X-Amz-Meta-Testing': 1234,
    'example': 5678
};

export function s3Upload() {
    
}

/*s3client.fPutObject(bucket, destfile, sourcefile, metaData, (err: Error | null) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('File ' + sourcefile + ' uploaded as object ' + destfile + ' in bucket ' + bucket);
    }
});
*/