import os
import zipfile
from flask import Flask, request, jsonify, send_file
from rembg import remove
from flask_cors import CORS
from waitress import serve

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'uploads'
OUTPUT_FOLDER = 'outputs'


@app.route('/rembg', methods=['POST'])
def remove_background():
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    files = request.files.getlist("images")
    if not files:
        return jsonify({'error': 'No files were uploaded'}), 400

    for file in files:
        img_data = file.read()
        output_data = remove(img_data)
        filename = file.filename
        output_path = os.path.join(UPLOAD_FOLDER, filename)
        with open(output_path, "wb") as f:
            f.write(output_data)

    zip_output_name = "processed_images.zip"
    with zipfile.ZipFile(zip_output_name, "w") as zip_file:
        for root, _, files in os.walk(UPLOAD_FOLDER):
            for file in files:
                file_path = os.path.join(root, file)
                zip_file.write(file_path, file)

    for root, _, files in os.walk(UPLOAD_FOLDER):
        for file in files:
            os.remove(os. path. join(root, file))
    os.rmdir(UPLOAD_FOLDER)

    return send_file(zip_output_name)


if __name__ == '__main__':
    serve(host='0.0.0.0', port=3001, app=app)
