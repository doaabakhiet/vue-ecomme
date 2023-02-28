import { createStore } from "vuex";
import router  from "@/router";
let cart=localStorage.getItem("cartData");
const state={
    cart:cart ? JSON.parse(cart) : [],
};
const getters={};
const mutations={
    redirectTo(state,payload){
        router.push({name:payload});
      },
    AddToCart(state,payload){
        let found=state.cart.find(product => product.pid==payload.pid);
        if(found){
          found.qty++;
          //found.price*found.qty;
        }
        else{
            state.cart.push(payload);   
        }
        this.commit('saveData');
    },
    saveData(state){
        localStorage.setItem("cartData",JSON.stringify(state.cart));
    },
    DeleteFromCart(state,payload){
        let index=state.cart.indexOf(payload);
        console.log(payload,index,state.cart);
        state.cart.splice(index,1);
    }
};
const actions={
    redirectTo({commit},payload){
        commit("redirectTo",payload.val);
      }
};
export default createStore({
    state,
    getters,
    mutations,
    actions,
    modules: {},
});