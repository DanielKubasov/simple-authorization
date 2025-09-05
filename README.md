# General info

it is just a simple showcase of authorization + file upload system, a lot of aspects might be significantly improved.

## How to run S3 storage (MinIO) locally

download executable file (https://www.min.io/download?platform=windows), run the following command from the directory you downloaded minio.exe in:

` minio.exe server F:\Data`

"F:/data" - Directory that will contain all the information uploaded to S3. Then create a bucket and setup local environment variables accordingly, that is it!
