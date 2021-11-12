import request from "./request.js"

export function getSwiperList(){
	return request({
		url:'/api/public/v1/home/swiperdata'
	})
}
export function getNavList(){
	return request({
		url:'/api/public/v1/home/catitems'
	})
}
export function getFloorList(){
	return request({
		url:'/api/public/v1/home/floordata'
	})
}
export function getCateList(){
	return request({
		url:'/api/public/v1/categories'
	})
}
export function searchGoods(data){
	return request({
		url:'/api/public/v1/goods/qsearch',
		data
	})
}

export function getGoods(data){
	return request({
		url:'/api/public/v1/goods/search',
		data
	})
}