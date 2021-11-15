export default {
	namespace: true,
	state: {
		//每个商品的信息对象   都包含 {goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state}
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	},
	mutations: {
		addToCart(state, goods) {
			const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
			if (!findResult) {
				state.cart.push(goods)
			} else {
				findResult.goods_count++
			}
			this.commit('saveToStorage')
		},
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		//更新购物车中商品的勾选状态
		updateGoodsState(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if (findResult) {
				findResult.goods_state = goods.goods_state
				this.commit('saveToStorage')
			}
		},
		updataGoodsCount(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)

			if (findResult) {
				findResult.goods_count = goods.goods_count
				this.commit('saveToStorage')
			}
		},
		//根据id删除购物车商品
		removeGoodsById(state, goods_id) {
			state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			this.commit('saveToStorage')
		},

		updateAllGoodsState(state, newState) {
			state.cart.forEach(x => x.goods_state = newState)
			this.commit('saveToStorage')
		}
	},
	getters: {
		total(state) {
			// let c = 0
			// state.cart.forEach(goods => c += goods.goods_count)
			// return c
			return state.cart.reduce((total, item) => total += item.goods_count, 0)
		},
		checkedCount(state) {
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
		},
		checkedGoodsAmount(state) {
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count * item
				.goods_price, 0).toFixed(2)
		}
	}
}
