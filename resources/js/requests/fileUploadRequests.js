import request from "./api";

function uploadFile(data) {
    return request({
        url:    '/api/file/upload',
        method: 'POST',
        data: data,
    });
}

const FileUploadService = {
    uploadFile
}

export default FileUploadService;
