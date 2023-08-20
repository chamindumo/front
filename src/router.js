// router.js

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: () => import('./components/HelloWorld.vue') // Replace with your actual home component path
  },
  {
    path: '/book',
    name: 'Book',
    component: () => import('./components/BookIteam.vue') // Replace with your actual about component path
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import('./components/ProductIteam.vue') // Replace with your actual about component path
  },
  {
    path: '/allproducts',
    name: 'AllProducts',
    component: () => import('./components/AllProducts.vue') // Replace with your actual about component path
  },
];

const router = new Router({
  routes,
  mode: 'history' // Use history mode for cleaner URLs
});

export default router;
