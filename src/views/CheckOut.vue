<template>
    <div class="CheckOut">
     
        <NavBar/>
        <div class="container pt-5">
            <div class="row">
                <div class="col-md-9">
                    <ul>
                        <li v-for="c in cart" class="d-flex justify-content-between">
                            <img :src="c.image" width="30" height="30" />
                            <h6>{{c.name}}
                            <br>
                            {{c.ProdPrice}} $
                            <br>
                            Qty: {{c.qty}} 
                        </h6>
                        <a href="#" class="btn btn-primary m-3" @click="DeleteFromCart(c)" >X</a>
                        </li>
                    </ul>
                </div>
                <div class="col-md-3"></div>
            </div>
        </div>
      
    </div>
  </template>
  
  <script>
import NavBar from '@/components/NavBar.vue';
import { mapActions ,mapState,mapMutations} from 'vuex';
  export default {
    name: "CheckOut",
    components: { NavBar },
    computed:{
    ...mapState(['cart'])
    },
    mounted(){
        console.log(this.cart)
    },
    methods:{
        ...mapMutations(['DeleteFromCart']),
    }
}
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
  
  </style>
  