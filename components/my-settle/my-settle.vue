<template>
	<view class="my-settle-container">
		<label class="radio" @click="changeAllState">
			<radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
		</label>
		<view class="amount-box">
			合计:<text class="amount">￥ {{checkedGoodsAmount}}</text>
		</view>
		<view class="btn_settle" @click="settlement">
			结算（{{checkedCount}}）
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations,
		mapState
	} from 'vuex'
	import {
		createOrder,
		prePay,
		checkOrder
	} from '../../common/api.js'
	export default {
		name: "my-settle",
		computed: {
			...mapGetters(['checkedCount', 'total', 'checkedGoodsAmount', 'addStr']),
			...mapState({
				token: state => state.user.token,
				cart: state => state.cart.cart
			}),
			isFullCheck() {
				return this.total === this.checkedCount
			}
		},
		data() {
			return {
				second: 3,
				timer: null, //定时器
			};
		},
		methods: {
			...mapMutations(['updateAllGoodsState', 'updateRedirectInfo']),
			changeAllState() {
				this.updateAllGoodsState(!this.isFullCheck)
			},
			settlement() {
				if (!this.checkedCount) return uni.$showMsg("请选择要结算的商品")
				if (!this.addStr) return uni.$showMsg("请选择收货地址")
				if (!this.token) {
					return this.delayNavigate()
				}
				this.payOrder()
			},
			payOrder() {
				const orderInfo = {
					order_price: 0.01,
					consignee_addr: this.addStr,
					goods: this.cart.filter(x => x.goods_state).map(x => ({
						goods_id: x.goods_id,
						goods_number: x.gooods_count,
						goods_price: x.goods_price
					}))
				}
				//发起创建订单请求
				createOrder(orderInfo, this.token).then(res => {
					var that = this
					if (res.meta.status !== 200) return uni.$showMsg("订单创建失败")

					const orderNumber = res.message.order_number //订单号
					//2、订单预支付
					prePay({
						order_number: orderNumber
					}, this.token).then(res => {

						if (res.meta.status !== 200) return uni.$showMsg("预付订单生成失败")

						const payInfo = res.message.pay
						//3、发起微信支付
						uni.requestPayment({
							payInfo,
							success(res) {

							},
							fail: (res) => {
								return uni.$showMsg("订单未支付")
							},
							complete() {
								checkOrder({
									order_number: orderNumber
								}, that.token).then(res => {
									if (res.meta.status !== 200) return uni.$showMsg(
										"订单未支付")

									uni.showToast({
										title: "支付完成",
										icon: 'success'
									})
								})
							}
						})
					})
				})
			},
			//展示倒计时的提示消息
			showTips(n) {
				uni.showToast({
					icon: "none",
					title: "请登录后再结算! " + n + "秒之后自动跳转到登录页",
					mask: true,
					duration: 1500
				})
			},
			//延迟导航到登录页面
			delayNavigate() {
				this.second = 3
				this.showTips(this.second)
				this.timer = setInterval(() => {
					this.second--
					if (this.second <= 0) {
						clearInterval(this.timer)
						uni.switchTab({
							url: '/pages/my/my',
							success: () => {
								this.updateRedirectInfo({
									openType: 'switchTab',
									from: '/pages/cart/cart'
								})
							}
						})
						return
					}
					this.showTips(this.second)
				}, 1000)
			}

		}
	}
</script>

<style lang="scss">
	.my-settle-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		background-color: #fff;

		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount-box {
			.amount {
				color: #C00000;
				font-weight: bold;
			}
		}

		.btn_settle {
			background-color: #C00000;
			height: 50px;
			color: white;
			line-height: 50px;
			padding: 0 10px;
			min-width: 100px;
			text-align: center;
		}
	}
</style>
