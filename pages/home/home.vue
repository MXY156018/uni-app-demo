<template>
	<view>
		<!-- 搜索组件 -->
		<view class="search-box">
			<my-search @myclick="gotoSearch()"></my-search>
		</view>
		
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true"
			indicator-color="rgba(255, 255, 255, .3)" indicator-active-color="rgba(255, 255, 255, .6)">
			<swiper-item v-for="(item,i) in swiperList" :key="i">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,i) in navList" :key="i" @click="navClickHandler(item)">
				<image :src="item.image_src" class="nav-image"></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,i) in floorList" :key="i">
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<!-- 楼层图片区域 -->
				<view class="floor-img-box">
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src"
							:style="{width:item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</navigator>
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(item2,i2) in item.product_list" :key="i2"
							 :url="item2.url">
							<view v-if="i2 !==0">
								<image :src="item2.image_src" mode="widthFix" :style="{width:item2.image_width+'rpx'}">
								</image>
							</view>
							
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getSwiperList,
		getNavList,
		getFloorList
	} from '../../common/api.js'
	export default {
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: []
			};
		},
		methods: {
			async getSwiper() {
				await getSwiperList().then(res => {
					if (res.meta.status !== 200) {
						return uni.$showMsg()
					}
					this.swiperList = res.message
				})
			},
			getNav() {
				getNavList().then(res => {
					if (res.meta.status !== 200) {
						return uni.$showMsg()
					}
					this.navList = res.message
				})
			},
			getFloor() {
				getFloorList().then(res => {
					if (res.meta.status !== 200) {
						return uni.$showMsg()
					}
					//对数据进行处理
					res.message.forEach(floor => {
						floor.product_list.forEach(prod => {
							prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
						})
					})
					this.floorList = res.message
				})
			},
			navClickHandler(item) {
				if (item.name === "分类") {
					uni.switchTab({
						url: "../cate/cate"
					})
				}
			},
			gotoSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		},
		onLoad() {
			this.getSwiper()
			this.getNav()
			this.getFloor()
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {

		display: flex;
		justify-content: space-around;
		margin-top: 15px;

		.nav-image {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-title {
		width: 100%;
		height: 60rpx;
		margin-left: 5px;
	}

	.right-img-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.floor-img-box {
		display: flex;
		padding-left: 10px;
	}
	.search-box{
		position: sticky;
		top: 0;
		z-index: 999;
	}
</style>
