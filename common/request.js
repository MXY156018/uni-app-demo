const api = "https://www.uinav.com"

//请求封装
function request({
	url,
	method,
	data,
	token=''
}) {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: "加载中"
		})
		uni.request({
			url: api + url,
			data: data,
			header: {
				'content-type': 'application/json',
				'Authorization': token
			},
			method: method,
			success: ({
				data,
				statusCode,
				header
			}) => {
				uni.hideLoading()
				if (statusCode == 200) {
					resolve(data)
				} else {
					reject(data.meta.msg)
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
