import request from './api'

function get() {
    return request({
        url:    `/api/user`,
        method: 'GET'
    });
}

function update({data, id}) {
    return request({
        url:    `/api/user/${id}`,
        method: 'POST',
        data: data
    });
}

const UserService = {
    get, update
}

export default UserService;