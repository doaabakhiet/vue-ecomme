<template>
  <div class="home">
   
  <NavBar/>
  <HomeHeader/>
  <ProductList/>
  <FooterApp/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import ProductList from '@/components/ProductList.vue';
import HomeHeader from '@/components/HomeHeader.vue';
import FooterApp from '@/components/FooterApp.vue';
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
    NavBar,
    ProductList,
    HomeHeader,
    FooterApp
}
}
</script>
