import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminView from '../views/admin/AdminView.vue'
import PortfolioApp from '../views/admin/PortfolioApp.vue'
import OrderView from '../views/admin/OrderView.vue'
import ContactView from '../views/admin/ContactView.vue'
import ProductView from '../views/admin/ProductView.vue'
import CheckOut from '../views/CheckOut.vue'
import {auth} from '../firebase'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/CheckOut',
    name: 'CheckOut',
    component: CheckOut
  },
  {
    path: '/Admin',
    name: 'admin',
    component: AdminView,
    meta:{requiresAuth:true},
    children:[
      {
        path: "orderview",
        name: "orderview",
        component: OrderView,
      },
       {
        path: 'Portfolio',
        name: 'PortfolioApp',
        component: PortfolioApp
      },
      {
        path: 'Contact',
        name: 'ContactView',
        component: ContactView
      },
      {
        path: 'Product',
        name: 'ProductView',
        component: ProductView
      },
      
    ]

  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  //how to get current user
  const currentUser=auth.currentUser;
  if (requiresAuth && !currentUser){
    next('/');
  }else{
    next();
  }
});
export default router
