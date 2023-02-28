<template>
  <div class="NavBar">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">E-commerce</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                    <router-link class="nav-link "  to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                    <router-link class="nav-link" to="#">Contact</router-link>
                    </li>
                    <li class="nav-item">
                    <router-link class="nav-link" to="#">About</router-link>
                    </li>
                    
                </ul>
                <button type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#loginsignup">
                  <font-awesome-icon icon="fa-solid fa-arrow-right-to-bracket" />
                </button> &nbsp;&nbsp;
                <a href="#" class="btn btn-outline-warning" @click="AddToCartt()" data-bs-toggle="modal" data-bs-target="#staticBackdrop" title="Add To Cart">
                  <font-awesome-icon icon="fa-solid fa-cart-plus" />
                </a>

                </div>
            </div>
        </nav>
 
    <LoginSignupmodal/>
  </div>
</template>

<script>
import LoginSignupmodal from './LoginSignupmodal.vue';
export default {
    name: "NavBar",
    components: { LoginSignupmodal }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
