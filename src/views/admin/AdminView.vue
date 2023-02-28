<template>
  <div class="admin">
        <div class="wrapper d-flex align-items-stretch">
<nav id="sidebar">

<div class="p-4 pt-5">
<a href="#" >
<img src="@/assets/logoadmin.jpg"  class="img logo rounded-circle mb-5" alt="sidebar background" /> 
</a>
<ul class="list-unstyled components mb-5">
<li class="active">
<a href="#homeSubmenu"  aria-expanded="false" class="dropdown-toggle">Home</a>
</li>
<li>
  <router-link to="/about">About</router-link>
</li>
<li>
  <router-link to="/Admin/Contact">Contact</router-link>
</li>
<li>
  <router-link to="/Admin/Portfolio">Portfolio</router-link>
</li>
<li>
  <router-link to="/Admin/Product">Products</router-link>
</li>
<li>
  <router-link to="/Admin/orderview">
        <span class="menu-icon">
          <span class="iconify" data-icon="ri:vip-diamond-fill"></span>
        </span>
        <span class="menu-title">Orders</span>
        <span class="menu-suffix">&#x1F525;</span>
  </router-link>          
</li>
<li>
  <a href="#" @click="logout">Logout</a>
</li>
</ul>
<div class="footer">
<p>
Copyright &copy; All rights reserved | This template is made with <i class="icon-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib.com</a>
</p>
</div>
</div>
</nav>
<div id="content" class="p-4 p-md-5">
<nav class="navbar navbar-expand-lg navbar-light bg-light">
<div class="container-fluid">
<button type="button" id="sidebarCollapse" class="btn btn-primary" @click="toggleSidebar">
<i class="fa fa-bars"></i>
<span class="sr-only">Toggle Menu</span>
</button>
<button class="btn btn-dark d-inline-block d-lg-none ml-auto" @click="toggleMenu" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
<i class="fa fa-bars"></i>
</button>
<div class="collapse navbar-collapse" id="navbarSupportedContent">
<ul class="nav navbar-nav ml-auto">
<li class="nav-item active">
<router-link class="nav-link" to="/admin">Home</router-link>
</li>
<li class="nav-item">
<router-link class="nav-link" to="/about">About</router-link>
</li>
<li class="nav-item">
   <!-- <router-link class="nav-link" to="/admin/PortfolioApp">Portfolio</router-link> -->
  <!-- <router-link to="/admin/overview" class="nav-link" >
                    <span class="menu-icon">
                      <span class="iconify" data-icon="ri:vip-diamond-fill"></span>
                    </span>
                    <span class="menu-title">OverView</span>
                    <span class="menu-suffix">&#x1F525;</span>
  </router-link>  -->
</li>
<li class="nav-item">
  <router-link to="/Admin/Contact" class="nav-link">Contact</router-link>
</li>
</ul>
</div>
</div>
</nav>
<main class="content">
  <font-awesome-icon icon="fa-solid fa-cart-plus" class="text-warning" style="width:100px;height:200px;" />

  <router-view></router-view>
</main>
</div>
</div> 
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import router from "@/router";
export default {
  name: 'AdminView',

  methods:{
      toggleSidebar(){
        $('#sidebarCollapse').on('click',function(){$('#sidebar').toggleClass('active');});
      },
      toggleMenu(){
        $('#sidebarCollapse').on('click',function(){$('#sidebar').toggleClass('active');});
      },
      logout(){
        alert("sure")
        const auth = getAuth();
        signOut(auth).then(() => {
          // Sign-out successful.
          router.push('/');
        }).catch((error) => {
          // An error happened.
          console.log("error")
        });
      }
    }
   
}
</script>
