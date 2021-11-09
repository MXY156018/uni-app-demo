<template>
	<view>
		<button type="default" @click="test1">测试</button>
	</view>
</template>

<script>
	import {
		test
	} from '../../common/api.js'
	export default {
		data() {
			return {

			};
		},
		methods: {
			test1() {
				// uni.request({
				// 	url:"http://127.0.0.1:8888/test/test",
				// 	method:"GET",
				// 	header:{
				// 		'content-type':'application/json',
				// 	},
				// 	success(res) {
				// 		console.log(res)
				// 	}
				// })
				test().then(res => {
					console.log(res.code)
				})

			}
		}
	}
</script>

<style lang="scss">

</style>
