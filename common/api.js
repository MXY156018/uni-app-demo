import request from "./request.js"

export function getSwiperList() {
	return request({
		url: '/api/public/v1/home/swiperdata'
	})
}
export function getNavList() {
	return request({
		url: '/api/public/v1/home/catitems'
	})
}
export function getFloorList() {
	return request({
		url: '/api/public/v1/home/floordata'
	})
}
export function getCateList() {
	return request({
		url: '/api/public/v1/categories'
	})
}
export function searchGoods(data) {
	return request({
		url: '/api/public/v1/goods/qsearch',
		data
	})
}

export function getGoods(data) {
	return request({
		url: '/api/public/v1/goods/search',
		data
	})
}

export function getGoodDetailApi(data) {
	return request({
		url: '/api/public/v1/goods/detail',
		data
	})
}

export function userLogin(data) {
	return request({
		url: '/api/public/v1/users/wxlogin',
		method: "POST",
		data
	})
}

export function createOrder(data,token){
	return request({
		url: '/api/public/v1/my/orders/create',
		method: "POST",
		data,
		token
	})
}
export function prePay(data,token){
	return request({
		url: '/api/public/v1/my/orders/req_unifiedorder',
		method: "POST",
		data,
		token
	})
}
export function checkOrder(data,token){
	return request({
		url: '/api/public/v1/my/orders/chkOrder',
		method: "POST",
		data,
		token
	})
}