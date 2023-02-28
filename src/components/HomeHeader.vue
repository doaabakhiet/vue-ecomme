<template>
    <div class="HomeHeader">
     
        <section class="p-5 bg-secondary">
          <div class="container">
            <h3 class="mb-3 mb-md-0 text-warning">Sign Up For Free</h3>
            <div class="d-md-flex justify-content-between align-items-center">
              
              <font-awesome-icon icon="fa-solid fa-cart-plus" class="text-warning" style="width:300px;height:300px;" />
                  
                  <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#loginsignup">
                  Sign In <font-awesome-icon icon="fa-solid fa-arrow-right-to-bracket" />
                </button> 
            </div>
            
          </div>

      </section>
        
    </div>
  </template>
  
  <script>
  import LoginSignupmodal from './LoginSignupmodal.vue';
  export default {
    name: 'HomeHeader',
    components: { LoginSignupmodal }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
  .imgbg{
    background-image: url('./../../public/headerImg.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  </style>