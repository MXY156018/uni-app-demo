import request from "./request.js"

export function test(){
	return request({
		url:'/test/test'
	})
}