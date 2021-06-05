import { getCart } from 'network/cartshop'
const actions = {
    updateCart({ commit }) {
        getCart().then(res => {
            // console.log(res);
            commit("addCart", { count: res.data.length || 0 })
        })
    }

}
export default actions;