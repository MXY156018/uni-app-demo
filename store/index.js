import {
	createStore
} from "vuex"

import cart from './modules/cart.js'
import user from './modules/user.js'
export default createStore({
	modules: {
		cart,
		user
	}
})

