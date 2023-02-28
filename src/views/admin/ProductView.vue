<template>
  <div class="ProductView">
    <h3>Add Your Product Data</h3>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addData">
        Add Product
    </button>
    <div class="modal fade " id="addData" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Product Title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="alert alert-warning" v-if="successMessage">{{successMessage}}</div>
                <form @click="preventDefault">
                 <div class="container">
                  <div class="row">
                    <div class="col-sm-7">
                      <div class="form-outline mb-4" :class="{'form-group-error':v$.name.$error}">
                        <span class="error-feedback text-danger" v-if="v$.name.$error">{{v$.name.$errors[0].$message}}</span><br>
                        <label class="form-label" for="form1Example1">Name</label>
                        <input type="text" v-model="name" id="form1Example1" class="form-control" />
                      </div>
                      <div class="form-outline " :class="{'form-group-error':v$.description.$error}">
                        <span class="error-feedback text-danger" v-if="v$.description.$error">{{v$.description.$errors[0].$message}}</span><br>
                        <label class="form-label" for="form1Example2">Description</label>
                        <quill-editor  v-model:content="description" contentType="html"  theme="snow" :modules="modules" :toolbar=toolbarOptions></quill-editor>
                        <!-- <VueEditor /> -->
                        <!-- <QuillEditor theme="snow" v-model="description" /> -->
                        <!-- <textarea class="form-control" v-model="description" id="exampleFormControlTextarea1" rows="8"></textarea> -->
                      </div>
                    </div>

                  <div class="col-sm-5">
                    <h3>Product Details </h3>
                    <div class="form-outline mb-4" :class="{'form-group-error':v$.price.$error}">
                      <span class="error-feedback text-danger" v-if="v$.price.$error">{{v$.price.$errors[0].$message}}</span><br>
                      <label class="form-label" for="form1Example2">Price</label>
                      <input type="number" v-model="price" id="form1Example2" class="form-control" />
                    </div>
                    <div class="form-outline mb-4" :class="{'form-group-error':v$.tags.$error}">
                      <span class="error-feedback text-danger" v-if="v$.tags.$error">{{v$.tags.$errors[0].$message}}</span><br>
                      <label class="form-label" for="form1Example2">Product Tags</label>
                      <input type="text" v-model="tag" @keyup.,="addTag()" id="form1Example2" class="form-control" />
                      <div v-for="t in tags" class="d-inline">
                          <span class=" ">{{t}}</span>
                      </div>
                    </div>
                    <div class="form-outline mb-4" :class="{'form-group-error':v$.images.$error}">
                      <span class="error-feedback text-danger" v-if="v$.images.$error">{{v$.images.$errors[0].$message}}</span><br>
                      <label class="form-label" for="form1Example2">Images</label>
                      <input type="file" v-on:change="uploadimages" id="form1Example2" class="form-control" />
                    </div>
                    <div class="form-outline">
                      <div class="row">
                        <div class="col-sm-3" v-for="(img,i) in images">
                          <div class=" " style="position:relative">
                              <span style="position: absolute; z-index:1" @click="deleteImage(img,i)">&#10540;</span>
                              <img :src="img" alt="product" width="100" height="100" style="position: absolute;">
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
                </div>
                  <!-- Submit button -->
                  <button type="button" class="btn btn-primary" @click="saveData">Submit</button>
                </form>
              </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Understood</button>
            </div>
            </div>
        </div>
        </div>
    <br><br><hr>
    <table class="table caption-top" v-if="listOfProducts.length>0">
            <caption>List of Products {{listOfProducts.length}}</caption>
              <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Delete</th>
                    <th>Update</th>
                </tr>
              </thead>
              <tbody>
                  <tr v-for="(prod,i) in listOfProducts" :key="i">
                    <td>{{i+1}}</td>
                    <!-- {{prod.id}} -->
                    <th class="textColor">{{prod.data().name}}</th>
                    <td>{{prod.data().price}}</td>
                    <td>
                      <!-- <router-link :to="{name:'DeleteLocation',params:{LocationId:loc.id}}">
                          <button class="btn btn-danger">Delete</button>
                      </router-link> -->
                      <button class="btn btn-light text-success" @click="delProduct(prod.id)">Delete</button>
                    </td>
                    <td>   
                        <UpdateProd :ProdData='prod' :getprodData="getproductsData" />
                    </td>
                </tr> 
              </tbody>
            </table>

            <div class="alert alert-warning" role="alert" v-else >No Location Added Yet.</div>

            
  </div>
</template>

<script>

// @ is an alias to /src
import { collection, addDoc , getDocs,doc,deleteDoc,onSnapshot} from "firebase/firestore"; 
import {db} from "@/firebase.js";
import useValidate from '@vuelidate/core';
import {required,minLength }from '@vuelidate/validators';
import UpdateProd from "@/components/admin/UpdateProd.vue";
import { QuillEditor ,Quill} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import BlotFormatter from 'quill-blot-formatter';
import { getStorage, ref, uploadBytes,getDownloadURL,uploadBytesResumable,deleteObject } from "firebase/storage";
export default {
  name: 'ProductView',
  components: {
    UpdateProd, QuillEditor 
},
  validations(){
    return{
      name:{required,minLength:minLength(5)},
      price:{required},
      description:{required},
      images:{required},
      tags:{required},
    };
  },
  data(){
    return{
      v$: useValidate(),
      name:"",
      price:"",
      description:"",
      images:[],
      tags:[],
      tag:"",
      successMessage:"",
      listOfProducts:{},
      toolbarOptions : [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],

                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction

                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [ 'link', 'image', 'video', 'formula' ],          // add's image support
                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],

                ['clean']                                         // remove formatting button
            ],
            modules : {module: BlotFormatter}
    }
  },
  async mounted(){
    // const querySnapshot = await getDocs(collection(db, "products"));
    // querySnapshot.forEach((doc) => {
    //   this.listOfProducts.push(doc);
    // });
    
    const unsubscribe = onSnapshot(collection(db, "products"), (querySnapshot) => {
      this.listOfProducts=[]
      querySnapshot.forEach((doc) => {
        this.listOfProducts.push(doc);
      });

    });
  },
  firestore(){
    return{
      products:db.collection("products")
          // .add({ name: this.name, price: this.price})
          // .then(() => {
          //   console.log("Document successfully written!");
          // })
          // .catch((error) => {
          //   console.error("Error writing document: ", error);
          // });
    }
  },
  methods:{
    deleteImage(img,i){
        
        const storage = getStorage();
        // Create a reference to the file to delete
        const desertRef = ref(storage, img);
        // Delete the file
        deleteObject(desertRef).then(() => {
          this.images.splice(i,1);
          console.log(1);
          // File deleted successfully
        }).catch((error) => {
          // Uh-oh, an error occurred!
        });
    },
    async uploadimages(e){
      let file=e.target.files[0];
      const storage = getStorage();
      // const mountainsRef = ref(storage, file.name);
      // const mountainImagesRef = ref(storage, 'images/'+file.name);
      const storageRef = ref(storage, 'images/'+file.name);
      await uploadBytes(storageRef , file.name).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
      const uploadTask = uploadBytesResumable(storageRef, file);
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      this.images.push(downloadURL);
      console.log('File available at', downloadURL);
      console.log(this.images);
      });
      console.log(this.images);
    },
    addTag(){
       this.tags.push(this.tag);
       this.tag="";
       console.log(this.tags)
    },
    getproductsData(products){
      this.listOfProducts=products;
    },
    async saveData(){
      this.v$.$validate();
      console.log(this.description)
      if(!this.v$.$error){
          try {
            const docRef = await addDoc(collection(db, "products"), {
              name: this.name,
              price: this.price,
              description:this.description,
              images:this.images,
              tags:this.tags,
            });
            this.successMessage="Product Added Successfully";
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            this.successMessage="";
            console.error("Error adding document: ", e);
          }
          const unsubscribe = onSnapshot(collection(db, "products"), (querySnapshot) => {
            this.listOfProducts=[]
          querySnapshot.forEach((doc) => {
            this.listOfProducts.push(doc);
          });
        });
      }
    },
    async delProduct(id){
      if(confirm("Are You Sure ?")){
        await deleteDoc(doc(db, "products", id));
        const unsubscribe = onSnapshot(collection(db, "products"), (querySnapshot) => {
            this.listOfProducts=[]
          querySnapshot.forEach((doc) => {
            this.listOfProducts.push(doc);
          });
        });
      }
    }
  }
}
</script>
<style scoped lang="scss">
@import "~vue2-editor/dist/vue2-editor.css";
$gl-ms         : "screen and (max-width: 23.5em)"; // up to 360px
$gl-xs         : "screen and (max-width: 35.5em)"; // up to 568px
$gl-sm         : "screen and (max-width: 48em)";   // max 768px
$gl-md         : "screen and (max-width: 64em)";   // max 1024px
$gl-lg         : "screen and (max-width: 80em)";   // max 1280px

// table style
@media #{$gl-xs}              {
  
  table					              { display:block;
	  > *,tr,td,th              { display:block }
    
    thead                     { display:none }
    tbody tr                  { height:auto; padding:8px 0;
      td                      { padding-left:45%; margin-bottom:12px;
        &:last-child          { margin-bottom:0 }
        &:before              { 
          position:absolute;
          font-weight:700;
          width:40%;
          left:10px;
          top:0
        }
        
        &:nth-child(1):before { content:"#";}
        &:nth-child(2):before { content:"Name";}
        &:nth-child(3):before { content:"Price";}
        &:nth-child(4):before { content:"Delete";}
        &:nth-child(5):before { content:"Update";}
      }        
    }
  }
}  	
</style>
