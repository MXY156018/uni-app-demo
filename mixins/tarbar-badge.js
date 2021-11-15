import {
	mapGetters
}
from 'vuex'
export default {
	computed: {
		...mapGetters([
			'total'
		])
	},
	methods: {
		setBadge() {
			uni.setTabBarBadge({
				index: 2,
				text: this.total + ''
			})
		}
	},
	onShow() {
		this.setBadge()
	}
}
