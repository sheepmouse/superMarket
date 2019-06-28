import req from './request';

/* 商品添加 */
export function goodsAdd(params) {
    return req.post('/goods', params)
}

export function goodsList(params){
    return req.post('/goods/goodsList',params)
}
export function delgoods(params){
    return req.get('/goods/delgoods',params)
}
