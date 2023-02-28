<template>
    <div class="UpdateProd">
     
      <!-- {{ProdData.id}} -->
      <div style="display:none">
      {{dtarget="#p"+ProdData.id }}
      {{idmodal="p"+ProdData.id}}
      </div>
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target=dtarget>
        Edit
        </button>

        <!-- Modal -->
        <div class="modal fade" :id=idmodal data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Product Title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="alert alert-warning" role="alert" v-if="successMessage">{{successMessage}}</div>
                <form @click="preventDefault">
                <!-- Email input -->
                <div class="form-outline mb-4" :class="{'form-group-error':v$.name.$error}">
                    <span class="error-feedback text-danger" v-if="v$.name.$error">{{v$.name.$errors[0].$message}}</span><br>
                    <label class="form-label" for="form1Example1">Name</label>
                    <input type="text" v-model="name" id="form1Example1" class="form-control" />
                </div>

                <!-- Password input -->
                <div class="form-outline mb-4" :class="{'form-group-error':v$.price.$error}">
                    <span class="error-feedback text-danger" v-if="v$.price.$error">{{v$.price.$errors[0].$message}}</span><br>
                    <label class="form-label" for="form1Example2">Price</label>
                    <input type="number" v-model="price" id="form1Example2" class="form-control" />
                </div>

                <!-- Submit button -->
                <button type="button" class="btn btn-primary btn-block" @click="updateData(ProdData.id)">Update</button>
                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Understood</button>
            </div>
            </div>
        </div>
        </div>
      
    </div>
  </template>
  
  <script>
import useValidate from '@vuelidate/core';
import {required,minLength }from '@vuelidate/validators';
import {db} from "@/firebase.js";
import { doc, updateDoc} from "firebase/firestore";
import { collection, query, onSnapshot } from "firebase/firestore";
  export default {
    name: 'UpdateProd',
    props:{ProdData:Object,getprodData:Function},
    validations(){
    return{
      name:{required,minLength:minLength(5)},
      price:{required}
    };
  },
  data(){
    return{
      v$: useValidate(),
      name:this.ProdData.data().name,
      price:this.ProdData.data().price,
      successMessage:"",
      products:[],
      listOfProducts:[]
    }
  },
  mounted(){
    
  },
  methods:{
    watcher(){
        const q = query(collection(db, "products"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        this.products = [];
        querySnapshot.forEach((doc) => {
            this.products.push(doc);
        });
        });
    },
    async updateData(id){
        this.v$.$validate();
            if(!this.v$.$error){
            const washingtonRef = doc(db,"products",id);
            // Atomically add a new region to the "regions" array field.
            await updateDoc(washingtonRef, {
                name:this.name,
                price:this.price,
            });
            
            this.successMessage="Product Updated Successfully";
            // setTimeout(() => { window.location.reload();},5000);
            const unsubscribe = onSnapshot(collection(db, "products"), (querySnapshot) => {
            this.listOfProducts=[]
            querySnapshot.forEach((doc) => {
            this.listOfProducts.push(doc);
          });
          this.getprodData(this.listOfProducts);
        });
        }
    }
  }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.form-group-error input{
    color:red;
    border-color: red;
}
</style>
  