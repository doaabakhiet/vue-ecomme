import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";

// import "jquery"
// import JQuery from 'jquery'
// window.$ = JQuery
// import JQuery from 'jquery'
// window.$ = JQuery
import 'popper.js'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import './assets/app.scss'
//golbal component
import NavBar from './components/NavBar.vue';
// import Vue from 'vue'
// import VueFirestore from 'vue-firestore'
// Vue.use(VueFirestore)
import './firebase';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import {faArrowRightToBracket,faCartPlus} from '@fortawesome/free-solid-svg-icons';
import { faFacebook ,faTwitter,faInstagram,faYoutube} from '@fortawesome/free-brands-svg-icons';
library.add(faArrowRightToBracket,faCartPlus,faFacebook ,faTwitter,faInstagram,faYoutube);
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
let app="";
onAuthStateChanged(auth, (user) => {
  if(!app){
    app=createApp(App).use(store);
    app.component('NavBar',NavBar);
    app.component('font-awesome-icon', FontAwesomeIcon);
    app.use(router);
    app.mount('#app');
  }
});


