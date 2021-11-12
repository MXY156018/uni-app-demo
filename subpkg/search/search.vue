<template>
	<view>
		<view class="search-box">
			<uni-search-bar @input="input" :radius="100" cancelButton="none" placeholder="请输入搜索内容">
			</uni-search-bar>
		</view>
		<view class="sugg-list" v-if="searchResultList.length!==0">
			<view class="sugg-item" v-for="(item,i) in searchResultList" :key="i" @click="gotoDeatil(item)">
				<view class="goods-name">
					{{item.goods_name}}
				</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="clean()"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag :text="item" v-for="(item,i) in histotys" :key="i" @click="gotoGoodsList(item)"></uni-tag>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		searchGoods
	} from '../../common/api.js'
	export default {
		data() {
			return {
				timer: null,
				kw: '',
				searchResultList: [],
				historyList: []
			};
		},
		computed: {
			histotys() {
				return [...this.historyList].reverse()
			}
		},
		methods: {
			input(e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.kw = e
					this.getSearchList()
				}, 500)
			},
			getSearchList() {
				if (this.kw.length === 0) {
					this.searchResultList = []
					return
				}
				searchGoods({
					'query': this.kw
				}).then(res => {
					if (res.meta.status !== 200) {
						return uni.$showMsg()
					}
					this.searchResultList = res.message
					this.saveSearchList()
				})
			},
			gotoDeatil(item) {
				uni.navigateTo({
					url: '../goods_detail/goods_detail?goods_detail=' + item.goods_id
				})
			},
			saveSearchList() {
				const set = new Set(this.historyList)
				set.delete(this.kw)
				set.add(this.kw)
				this.historyList = Array.from(set)

				uni.setStorageSync('kw', JSON.stringify(this.historyList))
			},
			clean() {
				this.historyList = []
				uni.setStorageSync('kw', [])

			},
			gotoGoodsList(item) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query=' + item
				})
			}
		},
		onLoad() {
			uni.setStorageSync('kw', JSON.stringify(this.historyList))
			this.historyList = JSON.parse(uni.getStorageSync('kw'))||[];
		},
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.sugg-list {
		padding: 0 5px;

		.sugg-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;

			.goods-name {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}

	.history-box {
		padding: 0 5px;

		.history-title {
			display: flex;
			justify-content: space-between;
			height: 40px;
			align-items: center;
			font-size: 13px;
			border-bottom: 1px solid #efefef;
		}

		.history-list {
			display: flex;
			flex-wrap: wrap;

			.uni-tag {
				margin-top: 5px;
				margin-right: 5px;
			}
		}

	}
</style>
