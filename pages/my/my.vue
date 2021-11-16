<template>
	<view class="my-container">
		<my-login v-if="!token"></my-login>
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
	import badgeMix from '../../mixins/tarbar-badge.js'
	import {
		mapState
	} from 'vuex'
	import {
		userLogin
	} from '../../common/api.js'
	export default {
		mixins: [badgeMix],
		data() {
			return {

			};
		},
		computed: {
			...mapState({
				token: state => state.user.token
			})
		}
	}
</script>


<style lang="scss">
	page,
	.my-container {
		height: 100%;
	}
</style>
