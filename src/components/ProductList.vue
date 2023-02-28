<template>
  <div class="ProductList">
    <div class="container ">
        
            <!-- <div class=" " v-if="listOfProducts.length>0">
                {{x= listOfProducts.length}} -->
                <div class="row p-5" v-if="listOfProducts.length">
                <div class="col-sm-4 " v-for="(prod,i) in listOfProducts" :key="i">  
                    <div class="card m-2 border-warning">                           
                                 <img :src="prod.data().images[0]" class="card-img-top img-thumbnail border-warning" style="height:250px;" alt="..."/>                         
                            <div class="card-body">
                               
                                <h5 class="card-title">{{prod.data().name}}</h5>

                                    <!-- <CurrencyFilter :accountBalance=prod.data().price></CurrencyFilter> -->
                                {{prod.data().price +"$"}}
                                <!-- <h6>{{prod.price | currencyUSD}} $</h6> -->
                                <p class="card-text" v-html="prod.data().description"></p>
                                <AddtoCart 
                                    :productName="prod.data().name" 
                                    :price="prod.data().price" 
                                    :image="prod.data().images[0]"
                                    :id="prod.id"
                                    />
                            </div>
                    </div>   
                </div>
            </div>

            <div class="alert alert-warning" role="alert" v-else >No Location Added Yet.</div> 
            
</div>
  </div>
</template>

<script>
import { collection,getDocs} from "firebase/firestore"; 
import {db} from "@/firebase.js";
// import CurrencyFilter from "./CurrencyFilter.vue";
import AddtoCart from "./AddtoCart.vue";
export default {
  name: 'ProductList',
  components: {
    // CurrencyFilter,
    AddtoCart
},
  data(){
    return{
        listOfProducts:[],
        listOfProducts1:[],
        x:0
    }
  },
  async mounted(){
    $('.owl-carousel').owlCarousel({
            loop:true,
            margin:10,
            responsiveClass:true,
            responsive:{
                0:{
                    items:1,
                    nav:true
                },
                600:{
                    items:3,
                    nav:false
                },
                1000:{
                    items:5,
                    nav:true,
                    loop:false
                }
            }
        });
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      this.listOfProducts.push(doc);
      console.log(doc.id);
    });
    console.log();
    if(this.listOfProducts){
        this.x=this.listOfProducts.length;
        
    }
        // this.listOfProducts1=this.listOfProducts;
        // console.log(this.listOfProducts1)
        
       
        
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.owl-carousel .owl-stage { display: flex; align-items: center; }
</style>
