export default {
	namespace: true,
	state: {
		address: JSON.parse(uni.getStorageSync('address') || '{}')
	},
	mutations: {
		updateAddress(state, address) {
			state.address = address
			this.commit('saveAddressToStorage')
		},
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
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
