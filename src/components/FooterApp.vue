<template>
    <div class="FooterApp">
      <footer class="text-center text-lg-start pt-5 bg-secondary" >
              <div class="container d-flex justify-content-center py-5 ">
              <button type="button" class="btn text-warning btn-lg btn-floating mx-2">
                  <font-awesome-icon :icon="['fab', 'facebook']"/>
              </button>
              <button type="button" class="btn text-warning btn-lg btn-floating mx-2">
                  <font-awesome-icon :icon="['fab', 'youtube']"/>
              </button>
              <button type="button" class="btn text-warning btn-lg btn-floating mx-2">
                  <font-awesome-icon :icon="['fab', 'instagram']"/>
              </button>
              <button type="button" class="btn text-warning btn-lg btn-floating mx-2">
                  <font-awesome-icon :icon="['fab', 'twitter']"/>
              </button>
          </div>
  
          <!-- Copyright -->
          <div class="text-center text-white p-3" style="background-color: rgba(0, 0, 0, 0.2);">
          © 2020 Copyright:
          <a class="text-white" href="https://mdbootstrap.com/">Doaa Bakhiet</a>
          </div>
          <!-- Copyright -->
    </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: "FooterApp",
  
  };
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
  
  </style>
  