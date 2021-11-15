<template>
	<view class="goods-item">
		<!-- 左侧盒子 -->
		<view class="goods-item-left">

			<radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="redioClickHandler" />

			<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
		</view>
		<!-- 右侧盒子 -->
		<view class="goods-item-right">
			<view class="goods-name">{{goods.goods_name}}</view>
			<view class="goods-info-box">
				<view class="goods-price">
					￥{{tofixed(goods.goods_price)}}
				</view>
				<uni-number-box v-if="showNum" :min="1" :value="goods.goods_count" @change="numChangeHandler">
				</uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-goods",
		props: {
			goods: {
				type: Object,
				default: {}
			},
			showRadio: {
				type: Boolean,
				default: false //默认不展示radio
			},
			//是否显示numbox
			showNum: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		methods: {
			tofixed(num) {
				return Number(num).toFixed(2)
			},
			//redio的点击事件处理函数
			redioClickHandler() {
				this.$emit('radio-change', {
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
			//监听组件数量变化
			numChangeHandler(val) {
				this.$emit('num-change', {
					goods_id: this.goods.goods_id,
					goods_count: +val
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		// width: 750rpx;
		// box-sizing: border-box;
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;

		.goods-item-left {
			margin-right: 5px;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			flex: 1;

			.goods-name {
				font-size: 13px;
			}

			.goods-info-box {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.goods-price {
					color: #c00000;
					font-size: 16px;
				}
			}
		}
	}
</style>
