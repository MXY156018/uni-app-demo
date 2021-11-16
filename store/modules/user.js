export default {
	namespace: true,
	state: {
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		token: uni.getStorageSync('token') || 'adfhfdfasehghsdfgsxffsa',
		userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		redirectInfo: null, //重定向
	},
	mutations: {
		updateAddress(state, address) {
			state.address = address
			this.commit('saveAddressToStorage')
		},
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		updateUserInfo(state, userinfo) {
			state.userinfo = userinfo
			this.commit('saveUserInfoToStorage')
		},
		saveUserInfoToStorage(state) {
			uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
		},
		updateToken(state, token) {
			state.token = token
			this.commit('saveTokenToStorage')
		},
		saveTokenToStorage(state) {
			uni.setStorageSync('token', state.token)
		},
		updateRedirectInfo(state, info) {
			state.redirectInfo = info
		}
	},
	getters: {
		addStr(state) {
			if (!state.address.provinceName) return ''

			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address
				.detailInfo
		}
	}
}
