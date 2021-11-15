<template>
	<view>
		<!-- 选择收货地址的盒子 -->
		<view class="address-choose-box" v-if="JSON.stringify(this.address)==='{}'">
			<button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
		</view>

		<view class="address-info-box" v-else @click="chooseAddress">
			<view class="row1">
				<view class="row1-left">
					<view class="username">
						<text>收货人:{{address.userName}}</text>
					</view>
				</view>
				<view class="row1-right">
					<view class="phone">
						<text>电话：{{address.telNumber}}</text>
						<uni-icons type="arrowright" size="16"></uni-icons>
					</view>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">
					收货地址：
				</view>
				<view class="row2-right">
					{{addStr}}
				</view>
			</view>
		</view>
		<!-- 底部边框线 -->
		<image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		name: "my-address",
		data() {
			return {

			};
		},
		methods: {
			...mapMutations(['updateAddress']),
			chooseAddress() {
				var that = this
				uni.chooseAddress({
					success(res) {
						that.updateAddress(res)
					},
					fail(res) {
						uni.$showMsg(res)
					}
				})
			}
		},
		computed: {
			...mapState({
				address: state => state.user.address
			}),
			...mapGetters(['addStr'])
		}
	}
</script>

<style lang="scss">
	.address-border {
		display: block;
		width: 100%;
		height: 5px;
	}

	.address-choose-box {
		height: 90px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.address-info-box {
		font-size: 12px;
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 5px;

		.row1 {
			display: flex;
			justify-content: space-between;

			.row1-right {
				display: flex;
				justify-content: space-between;

			}
		}

		.row2 {
			display: flex;
			align-items: center;
			margin-top: 10px;

			.row2-left {
				white-space: nowrap;
			}

		}
	}
</style>
