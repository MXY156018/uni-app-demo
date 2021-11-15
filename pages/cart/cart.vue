<template>
	<view style="padding-bottom: 50px;" v-if="cart.length!==0">
		<my-address></my-address>
		<!-- 商品列表的标题 -->
		<view class="cart-title">
			<!-- 左侧图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 右侧的文本 -->
			<text class="cart-title-text">购物车</text>
		</view>

		<!-- 循环渲染购物车数据 -->

		<uni-swipe-action>
			<block v-for="(goods,i) in cart" :key="i">
				<uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(goods)">
					<my-goods :goods="goods" :showRadio="true" :showNum="true" @radio-change="redioChangeHandler"
						@num-change="numChangeHandler"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>

		<my-settle></my-settle>

	</view>

	<view class="empty-cart" v-else>
		<image src="/static/cart_empty@2x.png" class="empty-img"></image>
		<text class="tip-text">空空如也~</text>
	</view>
</template>

<script>
	import badgeMix from '../../mixins/tarbar-badge.js'
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		mixins: [badgeMix],
		computed: {
			...mapState({
				cart: state => state.cart.cart
			})
		},
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: "#c00000"
					}
				}]
			};
		},
		methods: {
			...mapMutations(['updateGoodsState', 'updataGoodsCount', 'removeGoodsById']),
			redioChangeHandler(e) {
				this.updateGoodsState(e)
			},
			numChangeHandler(e) {
				this.updataGoodsCount(e)
				this.setBadge()
			},
			swipeItemClickHandler(goods) {
				this.removeGoodsById(goods.goods_id)
				this.setBadge()
			}
		},
	}
</script>

<style lang="scss">
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			font-size: 14px;
			margin-left: 10px;
		}
	}

	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150px;

		.empty-img {
			width: 90px;
			height: 90px;
		}

		.tip-text {
			font-size: 12px;
			color: gray;
			margin-top: 15px;
		}
	}
</style>
