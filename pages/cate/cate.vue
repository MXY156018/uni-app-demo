<template>
	<view>
		<my-search @myclick="gotoSearch()"></my-search>
		<view class="scroll-view-container">
			<!-- 左侧的滑动区域 -->
			<scroll-view class="left-scroll-view" scroll-y="true" style="height: 300px;" :style="{height:wh+'px'}">
				<block v-for="(item,i) in cateList" :key="i">
					<view :class="['left-scroll-view-item',i === active ? 'active':'']" @click="activeChange(i)">
						{{item.cat_name}}
					</view>
				</block>
			</scroll-view>
			<!-- 右侧的滑动区域 -->
			<scroll-view class="right-scroll-view" scroll-y="true" style="height: 300px;" :style="{height:wh+'px'}" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2,i2) in cateLevel2" :key="i2">
					<view class="cate-lv2-title">
						/{{item2.cat_name}}/
					</view>
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" v-for="(item3,i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
							<image :src="item3.cat_icon" mode=""></image>						
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>

			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		getCateList
	} from '../../common/api.js'
	import badgeMix from '../../mixins/tarbar-badge.js'
	export default {
		mixins:[badgeMix],
		data() {
			return {
				wh: 0,
				active: 0,
				scrollTop:0,
				cateList: [],
				cateLevel2: [], //二级分类列表
			};
		},
		methods: {
			async getCate() {
				await getCateList().then(res => {
					if (res.meta.status !== 200) {
						return uni.$showMsg()
					}
					this.cateList = res.message
					this.cateLevel2 = res.message[0].children
				})
			},
			activeChange(i) {
				this.active = i
				//重新为二级分类赋值
				this.cateLevel2 = this.cateList[i].children
				this.scrollTop = 0
			},
			//跳转到商品列表页
			gotoGoodsList(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cid='+item.cat_id
				})
			},
			gotoSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		},
		onLoad() {
			const info = uni.getSystemInfoSync()
			this.wh = info.screenHeight -50
			this.getCate()
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;
	}

	.left-scroll-view {
		width: 120px;

		.left-scroll-view-item {
			background-color: #f7f7f7f7;
			line-height: 60px;
			text-align: center;
			font-size: 12px;

			&.active {
				background-color: #FFFFFF;
				position: relative;

				&::before {
					content: ' ';
					display: block;
					width: 3px;
					height: 30px;
					background-color: #c00000;
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
				}
			}
		}

	}

	.cate-lv2-title {
		font-size: 12px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;
	}
	.cate-lv3-list{
		display: flex;
		flex-wrap: wrap;
		.cate-lv3-item{
			width: 33.3%;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			margin-bottom: 10px;
			image{
				width: 60px;
				height: 60px;
			}
			text{
				font-size: 12px;
			}
		}
	}
</style>
