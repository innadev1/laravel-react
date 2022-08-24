import request from "./api";

function get() {
    return request({
        url:    `/api/folder`,
        method: 'GET'
    });
}

function storeFolder(data) {
    return request({
        url:    '/api/folder/storeFolder',
        method: 'POST',
        data: data,
    });
}

function editFolder({data, id}) {
    return request({
        url:    `/api/folder/editFolder/${id}`,
        method: 'POST',
        data: data
    });
}

function destroyFolder(id) {
    return request({
        url:    `/api/folder/destroyFolder/${id}`,
        method: 'POST',
    });
}

function moveFolder({data, id}) {
    return request({
        url:    `/api/folder/moveFolder/${id}`,
        method: 'POST',
        data: data
    });
}

function storeGroup(data) {
    return request({
        url:    '/api/group/storeGroup',
        method: 'POST',
        data: data,
    });
}

function editGroup({data, id}) {
    return request({
        url:    `/api/group/editGroup/${id}`,
        method: 'POST',
        data: data
    });
}

function destroyGroup(id) {
    return request({
        url:    `/api/group/destroyGroup/${id}`,
        method: 'POST',
    });
}

function moveGroup({data, id}) {
    return request({
        url:    `/api/group/moveGroup/${id}`,
        method: 'POST',
        data: data
    });
}

function storeCustomer(data) {
    return request({
        url:    '/api/customer/storeCustomer',
        method: 'POST',
        data: data,
    });
}

function editCustomer({data, id}) {
    return request({
        url:    `/api/customer/editCustomer/${id}`,
        method: 'POST',
        data: data
    });
}

function destroyCustomer({data, id}) {
    return request({
        url:    `/api/customer/destroyCustomer/${id}`,
        method: 'POST',
        data: data
    });
}

const SegmentService = {
    get, storeFolder, editFolder, destroyFolder, moveFolder, storeGroup, editGroup, destroyGroup, moveGroup, storeCustomer, editCustomer, destroyCustomer
}

export default SegmentService;
