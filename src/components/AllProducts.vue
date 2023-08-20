<template>
    <div class="app">
      <Headder/>
      <main class="app-main">
        <!-- Your search form and item details code... -->
  
        <div v-if="products && products.length > 0" class="all-products">
          <h2>All Products</h2>
          <ul class="product-list">
            <li v-for="product in products" :key="product.id" class="product-item">
              <h3 class="product-name">{{ product.id }}</h3> 
              <div class="product-details">
                <img :src="getImageUrl(product.imageData)" alt="Product Image" class="product-image" />
                <div class="product-properties">
                  <p><strong>ID:</strong> {{ product.id }}</p>
                  <p><strong>Name:</strong> {{ product.names }}</p>
                  <p><strong>Description:</strong> {{ product.descriptions }}</p>
                  <p><strong>Price:</strong> {{ product.price }}</p>
                  <p><strong>Available:</strong> {{ product.isActive }}</p>
                  <p><strong>Expiry Date:</strong> {{ formatDate(product.expirDate) }}</p>

                </div>
              </div>
            </li>
          </ul>
        </div>
  
        <!-- Rest of your template... -->
      </main>
      <Fotter/>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import moment from 'moment';
  import Headder from './Headder.vue';
  import Fotter from './Fotter.vue';
  
  export default {
    components: {
      Headder,
      Fotter,
    },
    name: 'MyComponent',
    data() {
      return {
        products: [],
        // ... Other data properties ...
      };
    },
    created() {
      this.fetchAllProducts();
    },
    methods: {
      fetchAllProducts() {
        axios.get('https://localhost:7141/product') // Update the API endpoint
          .then(response => {
            this.products = response.data || [];
          })
          .catch(error => {
            console.error('Error fetching products:', error);
          });
      },
      getImageUrl(filename) {
        return `https://localhost:7141/Photos/${filename}`;
      },
      formatDate(date) {
        return moment(date).format('MMM D, YYYY');
      },
      // ... Other methods ...
    },
  };
  </script>
  
  <style scoped>
  /* Your existing styles... */
  .product-list {
    list-style: none;
    padding: 0;
  }
  
  .product-item {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    margin: 10px 0;
    display: flex;
    align-items: center;
  }
  
  .product-name {
    margin: 0;
    color: #226c8f;
  }
  
  .product-details {
    display: flex;
    align-items: center;
  }
  
  .product-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 20px;
  }
  
  .product-properties {
    font-size: 14px;
    margin-left: 20px; /* Add some space between image and details */
  }
  </style>
  