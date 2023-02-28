<template>
    <div class="PortfolioApp">
        <h1>Hi, </h1>
        <h6>{{emaill}}</h6>
        <h3>Profile Settings</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, id</p>
        
        <div class="container">
          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Login</button>
              <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Sign in</button>
            
            </div>
          </nav>
          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active pt-2" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            <form>
              <div class="row">
              <div class="col-sm-6">
                <div class="form-outline flex-fill mb-0" :class="{'form-group-error':v$.name.$error}">
                  <span class="error-feedback text-danger" v-if="v$.name.$error">{{v$.name.$errors[0].$message}}</span>
                  <input type="text" v-model.trim="state1.name" id="form3Example4c1" class="form-control" />
                  <label class="form-label" for="form3Example4c1">Full Name</label>
                </div>
                <div class="form-outline flex-fill mb-0" :class="{'form-group-error':v$.address.$error}">
                  <span class="error-feedback text-danger" v-if="v$.address.$error">{{v$.address.$errors[0].$message}}</span>
                  <textarea v-model.trim="state1.address" id="form3Example4c2" class="form-control" ></textarea>
                  <label class="form-label" for="form3Example4c2">Address</label>
                </div>

              </div>
              <div class="col-sm-6">
                <div class="form-outline flex-fill mb-0" :class="{'form-group-error':v$.phone.$error}">
                  <span class="error-feedback text-danger" v-if="v$.phone.$error">{{v$.phone.$errors[0].$message}}</span>
                  <input type="text" v-model.trim="state1.phone" id="form3Example4c3" class="form-control" />
                  <label class="form-label" for="form3Example4c3">Phone</label>
                </div>
                <div class="form-outline flex-fill mb-0" :class="{'form-group-error':v$.postcode.$error}">
                  <span class="error-feedback text-danger" v-if="v$.postcode.$error">{{v$.postcode.$errors[0].$message}}</span>
                  <input type="text" v-model.trim="state1.postcode" id="form3Example4c4" class="form-control" />
                  <label class="form-label" for="form3Example4c4">Postcode</label>
                </div>
                <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" class="btn btn-primary btn-lg" @click="ProfileData">Log In</button>
                </div>
              </div>
            </div>
          </form>
            </div>
            <div class="tab-pane fade pt-2" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
              <form>
              <div class="row">
              <div class="col-sm-6">
                <div class="form-outline flex-fill mb-0" :class="{'form-group-error':p$.username.$error}">
                  <span class="error-feedback text-danger" v-if="p$.username.$error">{{p$.username.$errors[0].$message}}</span>
                  <input type="text" v-model.trim="state2.username" id="form3Example4c" class="form-control" />
                  <label class="form-label" for="form3Example4c">Full Name</label>
                </div>
                <div class="form-outline flex-fill mb-0" :class="{'form-group-error':p$.email.$error}">
                  <span class="error-feedback text-danger" v-if="p$.email.$error">{{p$.email.$errors[0].$message}}</span>
                  <input type="email" v-model="state2.email" id="form3Example4c" class="form-control" />
                  <label class="form-label" for="form3Example4c">Email</label>
                </div>

              </div>
              <div class="col-sm-6">
                <div class="form-outline flex-fill mb-0" :class="{'form-group-error':p$.password.$error}">
                  <span class="error-feedback text-danger" v-if="p$.password.$error">{{p$.password.$errors[0].$message}}</span>
                  <input type="text" v-model="state2.password" id="form3Example4c5" class="form-control" />
                  <label class="form-label" for="form3Example4c5">Password</label>
                </div>
                <div class="form-outline flex-fill mb-0" :class="{'form-group-error':p$.verifypassword.$error}">
                  <span class="error-feedback text-danger" v-if="p$.verifypassword.$error">{{p$.verifypassword.$errors[0].$message}}</span>
                  <input type="text" v-model="state2.verifypassword" id="form3Example4c6" class="form-control" />
                  <label class="form-label" for="form3Example4c6">verify password</label>
                </div>
            
              </div>

            </div>
            <div class="form-outline mb-4" :class="{'form-group-error':p$.images.$error}">
                      <span class="error-feedback text-danger" v-if="p$.images.$error">{{p$.images.$errors[0].$message}}</span><br>
                      <label class="form-label" for="form1Example2">Images</label>
                      <input type="file" v-on:change="uploadimages" id="form1Example27" class="form-control" />
                </div>
                <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                  <button type="button" class="btn btn-primary btn-lg" @click="accountSetting">Save Changes</button>&nbsp;&nbsp;
                  <button type="button" class="btn btn-primary btn-lg" @click="resetPassword">Reset Password via Email</button>
                </div>
          </form>

            </div>
        </div>
        </div>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
import useVuelidate from '@vuelidate/core';
import {reactive,computed} from "vue";
import {required,email,minLength }from '@vuelidate/validators'; 
import { doc, updateDoc,collection,query, where,getDocs } from "firebase/firestore";
import { getAuth,updateProfile,sendPasswordResetEmail } from "firebase/auth";
import {db} from "@/firebase.js";
  export default {
    name: 'PortfolioApp',
    data(){
      return{
        namee:"",
        emaill:""
      }
    },
    setup(){
    const state1=reactive({
        name:"",
        address:"",
        phone:"",
        postcode:""
    });
    const state2=reactive({
        username:"",
        email:"",
        password:"",
        verifypassword:"",
        images:""});
    const rules1=computed(()=>{
      return{
        name:{required},
        address:{required},
        phone:{required},
        postcode:{required}
        }});
      const rules2=computed(()=>{
        return{
           username:{required},
          email:{required},
          password:{required},
          verifypassword:{required},
          images:{required}
        }});
        const v$=useVuelidate(rules1,state1);
        const p$=useVuelidate(rules2,state2);
        return {state1,v$,state2,p$}
    },
    components: {
  
    },
    async mounted(){
      const auth = getAuth();
      const user = auth.currentUser;
      console.log(2)
      if (user) {
        this.namee=user.displayName;
        this.emaill = user.email;
        // const photoURL = user.photoURL;
        // const emailVerified = user.emailVerified;


        const profilesRef = collection(db, "profiles");
            // Create a query against the collection.
        const q = query(profilesRef, where("id", "==", getAuth().currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.namee=doc.data().name; 
          this.state1.name=doc.data().email; 
          this.state2.email=this.emaill;

      });
    }
    },
    methods:{
        async ProfileData(){
          this.v$.$validate();
            if(!this.v$.$error){
              // console.log(getAuth().currentUser.id )
            const profilesRef = collection(db, "profiles");

            // Create a query against the collection.
            let docId;
            const q = query(profilesRef, where("id", "==", getAuth().currentUser.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              console.log(doc.id, " => ", doc.data());
              docId=doc.id;
              console.log(docId);
          });
          const washingtonRef = doc(db,"profiles",docId);
            // Atomically add a new region to the "regions" array field.
            await updateDoc(washingtonRef, {
              name:this.state1.name,
              address:this.state1.address,
              phone:this.state1.phone,
              postcode:this.state1.postcode
            });
          }
                
        },
        accountSetting(){
          this.p$.$validate();
            if(!this.p$.$error){
              updateProfile(auth.currentUser, {
                displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
              }).then(() => {
                // Profile updated!
                // ...
              }).catch((error) => {
                // An error occurred
                // ...
              });
            }
        },
        resetPassword(){
          const auth = getAuth();
          sendPasswordResetEmail(auth, this.emaill)
            .then(() => {
              alert("See Your Email");
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // ..
            });
        }

    }
  }
  </script>
<style>
.nav .nav-link{
  color:rgb(236, 140, 14) !important;
}
.form-group-error input{
    color:red;
    border-color: red;
}
</style>