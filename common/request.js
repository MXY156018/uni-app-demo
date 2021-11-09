const api = "http://127.0.0.1:8888"

//请求封装
function request({
	url,
	method,
	data
}) {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: "加载中"
		})
		uni.request({
			url: api + url,
			data: data,
			header: {
				'content-type': 'application/json'
			},
			method: method,
			success: ({
				data,
				statusCode,
				header
			}) => {
				uni.hideLoading()
				if (data.code == 200) {
					console.log(data)
					resolve(data)
				} else {
					reject(data.msg)
				}
			},
			fail: (errot) => {
				uni.hideLoading()
				console.log("失败", res)
				reject(errot)
			},
			complete() {
				
			}
		})
	}).catch(res => {
		console.log(res)
	})
}
export default request
