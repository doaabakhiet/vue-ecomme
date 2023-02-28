<template>
  <div class="AddtoCart">
    <a href="#" class="btn btn-primary" @click="AddToCartt()" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><font-awesome-icon icon="fa-solid fa-cart-plus" /></a>
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel"><font-awesome-icon icon="fa-solid fa-cart-plus" /> Cart Items</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
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
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="checkout">Check Out</button>
        </div>
        </div>
    </div>
    </div>
 
    
  </div>
</template>

<script>
import { mapActions ,mapState,mapMutations} from 'vuex';
export default {
  name: 'AddtoCart',
  props:{
    id:String,
    productName:String,
    price:Number,
    image:String

  },
  data(){
    return{
        item:{
            pid:this.id,
            name:this.productName,
            ProdPrice:this.price,
            image:this.image,
            qty:1
        }
    }
  },
  mounted(){
    // this.asd();
  },
  computed:{
    ...mapState(['cart'])
  },
  methods:{
    ...mapActions(['redirectTo']),
    ...mapMutations(['AddToCart','DeleteFromCart']),
    AddToCartt(){
        this.AddToCart(this.item);
    },
    checkout(){
        $('#staticBackdrop').modal('hide');
        this.redirectTo({val:'CheckOut'})
    },
  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
