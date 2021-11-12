<template>
	<view>
		<view class="goods-list">
			<view v-for="(goods,i) in goodsList" :key="i" @click="gotoDatail(goods)">
				<my-goods :goods="goods"></my-goods>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		getGoods
	} from '../../common/api.js'
	export default {
		data() {
			return {
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				goodsList: [],
				total: 0,
				isloading: false
			};
		},
		methods: {
			async getGoodsList(cb) {
				this.isloading = true
				await getGoods(this.queryObj).then(res => {
					this.isloading = false
					cb &&cb()
					if (res.meta.status !== 200) return uni.$showMsg()
					
					
					this.goodsList = [...this.goodsList, ...res.message.goods]
					this.total = res.message.total
					
					
				})
			},
			gotoDatail(goods){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+goods.goods_id
				})
			}
		},
		onLoad(option) {
			this.queryObj.query = option.query || ''
			this.queryObj.cid = option.cid || ''
			this.getGoodsList()
		},
		onReachBottom() {
			if(this.queryObj.pagenum*this.queryObj.pagesize>=this.total) return uni.$showMsg("数据加载完毕")
			if (this.isloading) return
			this.queryObj.pagenum++
			this.getGoodsList()
		},
		onPullDownRefresh(){
			//重置数据
			this.queryObj.pagenum=1
			this.total=0
			this.isloading = false
			this.goodsList = []
			//重新发起数据请求
			this.getGoodsList(()=>uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">

</style>
