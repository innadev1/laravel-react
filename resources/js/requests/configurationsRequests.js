import request from './api'

function getBrand() {
    return request({
        url:    `/api/brand`,
        method: 'GET'
    });
}

function destroyBrand(id) {
    return request({
        url:    `/api/brand/destroy/${id}`,
        method: 'POST',
    });
}

function storeBrand(data) {
    return request({
        url:    '/api/brand/add',
        method: 'POST',
        data: data,
    });
}

function updateBrand(data) {
    return request({
        url:    `/api/brand/${data.id}`,
        method: 'POST',
        data: {brand_name: data.brand_name, domainArr: data.domainArr, languageArr: data.languageArr, productArr: data.productArr}
    });
}

function getDomain() {
    return request({
        url:    `/api/domain`,
        method: 'GET'
    });
}

function destroyDomain(id) {
    return request({
        url:    `/api/domain/destroy/${id}`,
        method: 'POST',
    });
}

function storeDomain(data) {
    return request({
        url:    '/api/domain/add',
        method: 'POST',
        data: data,
    });
}

function updateDomain(data) {
    return request({
        url:    `/api/domain/${data.id}`,
        method: 'POST',
        data: {domain_name: data.domain_name}
    });
}

function getLanguage() {
    return request({
        url:    `/api/language`,
        method: 'GET'
    });
}

function destroyLanguage(id) {
    return request({
        url:    `/api/language/destroy/${id}`,
        method: 'POST',
    });
}

function storeLanguage(data) {
    return request({
        url:    '/api/language/add',
        method: 'POST',
        data: data,
    });
}

function updateLanguage(data) {
    return request({
        url:    `/api/language/${data.id}`,
        method: 'POST',
        data: {language_key: data.language_key}
    });
}

function getProduct() {
    return request({
        url:    `/api/product`,
        method: 'GET'
    });
}

function destroyProduct(id) {
    return request({
        url:    `/api/product/destroy/${id}`,
        method: 'POST',
    });
}

function storeProduct(data) {
    return request({
        url:    '/api/product/add',
        method: 'POST',
        data: data,
    });
}

function updateProduct(data) {
    return request({
        url:    `/api/product/${data.id}`,
        method: 'POST',
        data: {product_name: data.product_name}
    });
}

const ConfigurationsService = {
    getBrand,
    destroyBrand,
    storeBrand,
    updateBrand,
    getDomain,
    destroyDomain,
    storeDomain,
    updateDomain,
    getLanguage,
    destroyLanguage,
    storeLanguage,
    updateLanguage,
    getProduct,
    destroyProduct,
    storeProduct,
    updateProduct
}

export default ConfigurationsService;
