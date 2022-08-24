import request from './api'

function get() {
    return request({
        url:    `/api/form`,
        method: 'GET'
    });
}

function store(data) {
    return request({
        url:    '/api/form/add',
        method: 'POST',
        data: data,
    });
}

function update({data, id}) {
    return request({
        url:    `/api/form/${id}`,
        method: 'POST',
        data: data
    });
}

function updateStatus({data, id}) {
    return request({
        url:    `/api/form/updateStatus/${id}`,
        method: 'POST',
        data: data
    });
}

function edit({data, id}) {
    return request({
        url:    `/api/form/edit/${id}`,
        method: 'POST',
        data: data
    });
}

function destroy(id) {
    return request({
        url:    `/api/form/destroy/${id}`,
        method: 'POST',
    });
}

const CalendarService = {
    get, store, update, updateStatus, edit, destroy
}

export default CalendarService;
