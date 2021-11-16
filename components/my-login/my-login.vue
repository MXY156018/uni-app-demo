<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
		<button type="primary" class="btn-login" @click="getUserInfo">一键登录</button>
		<view class="tips-text">
			登录后尽享更多权益
		</view>
	</view>

</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	import {
		userLogin
	} from '../../common/api.js'
	export default {
		name: "my-login",
		data() {
			return {

			};
		},
		methods: {
			...mapMutations(['updateUserInfo', 'updateToken','updateRedirectInfo']),
			getUserInfo() {
				uni.getUserProfile({
					desc: 'Wexin',
					success: info => {
						console.log(info)
						uni.login({
							provider: "Wexin",
							success: res => {
								if (res.errMsg == "login:ok") {
									const query = {
										code: res.code,
										encryptedData: info.encryptedData,
										iv: info.iv,
										rawData: info.rawData,
										signature: info.signature
									}
									userLogin(query).then(res => {
										this.updateToken("1231245345")
										// if (res.meta.status !== 200) return uni.$showMsg(
										// 	"登录失败")
										if (res.meta.status !== 200) {
											console.log("登陆失败")
										}
									})
									
								}
							}
						})
						this.updateUserInfo(info.userInfo)
						this.navigateBack()
					},
					fail(res) {
						uni.$showMsg("您取消了授权")
					}
				})
			},
			navigateBack(){
				if(this.redirectInfo && this.redirectInfo.openType==='switchTab'){
					uni.switchTab({
						url:this.redirectInfo.from,
						complete() {
							this.updateRedirectInfo(null)
						}
					})
				}
			}
		},
		computed: {
			...mapState({
				redirectInfo: state => state.user.redirectInfo
			})
		}
	}
</script>

<style lang="scss">
	.login-container {
		height: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #f8f8f8;
		position: relative;
		overflow: hidden;

		&::after {
			content: ' ';
			display: block;
			width: 100%;
			height: 40px;
			background-color: white;
			position: absolute;
			bottom: 0;
			left: 0;
			border-radius: 100%;
			transform: translateY(50%);
		}

		.btn-login {
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: #C00000;
		}

		.tips-text {
			font-size: 12px;
			color: gray;
		}
	}
</style>
