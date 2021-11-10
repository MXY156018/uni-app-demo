import App from './App'

import {
	createSSRApp
} from 'vue'
//封装弹框的方法
uni.$showMsg = function(title = '数据请求失败！', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: "none"
	})
}
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
