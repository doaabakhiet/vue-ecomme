<template>
    <div class="LoginSignupmodal">
        <!-- Modal -->
        <div class="modal fade" id="loginsignup" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="loginLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="loginLabel">Sign In /Sign Up</h5>
               
  
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                 <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                      <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Login</button>
                      <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Sign in</button>
                   
                    </div>
                  </nav>
                  <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active pt-2" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
  
                      <!-- <form e.preventdefault> -->
                        <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label">Email address</label>
                          <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div class="mb-3">
                          <label for="exampleInputPassword1" class="form-label">Password</label>
                          <input type="password" v-model="password" class="form-control" id="exampleInputPassword1">
                        </div>
                        <div class="mb-3 form-check">
                          <input type="checkbox" class="form-check-input" id="exampleCheck1">
                          <label class="form-check-label" for="exampleCheck1">Check me out</label>
                        </div>
                        <button type="button" class="btn btn-primary" @click="login">Login</button>
                      <!-- </form> -->
  
  
                    </div>
                    <div class="tab-pane fade pt-2" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                        <h5 class="text-warning">{{verifyEmail}}</h5>
                        <div class="mb-3">
                          <label for="name" class="form-label">UserName</label>
                          <input type="text" v-model="name" class="form-control" id="name">
                          
                        </div>
                        <div class="mb-3">
                          <label for="email" class="form-label">Email address</label>
                          <input type="email" v-model="email" class="form-control" id="email" >
                          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div class="mb-3">
                          <label for="password" class="form-label">Password</label>
                          <input type="password" v-model="password" class="form-control" id="password">
                        </div>
  
                        <button  @click="signup" class="btn btn-primary">Submit</button>
                      
                    </div>
                  </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                
              </div>
            </div>
          </div>
        </div>
    </div>
  </template>
  
  <script>
  import router from "@/router";
    //  import {useRouter} from 'vue-router';
  import {db} from "@/firebase.js";
  import { collection, addDoc} from "firebase/firestore"; 
  import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,sendEmailVerification,onAuthStateChanged} from "firebase/auth";
  import 'bootstrap';
  export default {
    name: 'LoginSignupmodal',
    props: {
      msg: String
    },
    data(){
      return{
          name:null,
          email:null,
          password:null,
          emaill:null,
          passwordd:null,
          verifyEmail:""
      }
    },
    methods:{
      signup(){
          
            // Email verification sent!
            // ...
          
          createUserWithEmailAndPassword(getAuth(),this.email, this.password)
          .then(async ()=>{
          // router.push('/admin');
          //$('#loginsignup').modal('hide');
          let user=getAuth().currentUser;
            if (user && !user.emailVerified) {
            sendEmailVerification(user)
            .then(() => {
            this.verifyEmail="Please Verify Your Email...!"
            console.log("inside of sendEmailVerification, sending mail");
            });
            }

            const docRef = await addDoc(collection(db, "profiles"), {
              id:getAuth().currentUser.uid,
              name: this.name,
              address:"",
              phone:"",
              postcode:""
            });

         })
            .catch((error)=> {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
      },
      login(){
        console.log("ss")
        signInWithEmailAndPassword(getAuth(), this.email, this.password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            $('#loginsignup').modal('hide');
            router.push('/admin');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          });
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
  
  </style>
  