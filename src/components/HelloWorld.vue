<template>
  <div class="app">
 <Headder/>
<main class="app-main">

 <div class="item-search-container">
   <div class="search-form">

     <el-form ref="form" :model="form" :rules="rules" label-width="120px">
     
       <el-form-item label="Enter Id" prop="searchId">
         <el-input :rules="rules" v-model="form.searchId"></el-input>
       </el-form-item>
       <el-form-item>
         <el-button type="primary" @click="fetchItem('books')" round icon="el-icon-search">Book</el-button>
         <el-button type="primary" @click="fetchItem('product')" round icon="el-icon-search">product</el-button>
       </el-form-item>

     </el-form>

</div>
<div v-if="item === 'not-searched'" class="item-not-searched">
 <p class="error-message">Please enter an ID to search.</p>
       
       
     </div>

     <div v-else-if="item === 'not-found'" class="item-not-found">
       <p class="error-message">Item not found in the database.</p>
     </div>


<div v-if="item" class="item-details">

   <h2 class="item-title">{{ item.name || item.names }}</h2>
   <el-card class="item-card">
     <div class="item-properties">
       <p><strong>ID:</strong> {{ item.id }}</p>
       <p v-if="item.author"><strong>Author:</strong> {{ item.author }}</p>
       <p v-if="item.title"><strong>Title:</strong> {{ item.title }}</p>
       <p v-if="item.names"><strong>Name:</strong> {{ item.names }}</p>
       <p v-if="item.descriptions"><strong>Descriptions:</strong> {{ item.descriptions }}</p>
       <p v-if="item.isActive"><strong>Available:</strong> {{ item.isActive }}</p>
       <p v-if="item.expirDate"><strong>Expiry Date:</strong> {{ formatDate(item.expirDate) }}</p>
       <p v-if="item.price"><strong>Price:</strong> {{ item.price }}</p>
       <p v-if="item.imageData"><strong>Image:</strong> <img :src="getImageUrl(item.imageData)" alt="Item Image" class="item-image"  style="width: 100px; height: 100px" :fit="fit"/></p>

     </div>
   </el-card>
 </div>
 
 
 </div>
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
   Fotter
},
 name: 'MyComponent',
 data() {
   return {
     item: 'not-searched', 
     form: {
     searchId: '',
     },
     rules: {
       searchId: [
         { required: true, message: 'Please enter the Book or Product ID', trigger: 'blur' },
         { validator: this.validateId, trigger: 'blur'},
     ],
           
   },
   };
 },
 methods: {
   fetchItem(type) {
     this.$refs['form'].validate(valid => {
             if (valid) {

     if (this.form.searchId) {
       axios.get(`https://localhost:7141/${type}/${this.form.searchId}`)
         .then(response => {
           this.item = response.data || 'not-found';
           this.getImageUrl();
         })

         .catch(error => {
           if (error.response && error.response.status === 404) {
             this.item = 'not-found'; // No item found
           } else {
             console.error('Error fetching item:', error);
             this.item = null; // Display error message
           }
         });
     } else {
       this.item = 'not-searched'; // Display "Please enter an ID to search" message
     }
   }
 });

   },
   
 getImageUrl(filename) {
   // Assuming you have a public URL to access the uploaded images
   console.log(filename)
   return `https://localhost:7141/Photos/${filename}`;
 },

   open2() {
           this.$message({
             showClose: true,
             message: 'Congrats, Your Iteam is updated.',
             type: 'fail'
           });
         },

   validateId(rule, value, callback) {
     if (isNaN(value)) {
       callback(new Error('ID must be a number'));
     } else if (value <= 0) {
       callback(new Error('ID must be greater than 0'));
     } else {
       callback();
     }
   },


   formatDate(date) {
     return moment(date).format('MMM D, YYYY');
   },

 }
};
</script>
<style scoped>
.item-search-container {
 display: flex;
 flex-direction: column;
 align-items: center;
 padding: 20px;
}

.item-details {
 border: 1px solid #ccc;
 border-radius: 4px;
 padding: 20px;
 width: 80%;
 text-align: center;
 margin-top: 20px;
 background-color: #f9f9f9; /* Background color for the output area */
 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.item-card {
 width: 80%;
 margin-top: 20px;
 margin-left: 10%;
 margin-bottom: 5%;
}

.item-title {
 margin-bottom: 10px;
 color: #226c8f;
 text-transform: uppercase; /* Set the text to uppercase */

}

.item-properties {
 font-size: 14px;
}

.item-properties p {
 margin-bottom: 5px;
}

.search-form {
 display: flex;
 align-items: center;
 margin-bottom: 20px;
}

.search-input {
 padding: 10px;
 border: 1px solid #ccc;
 border-radius: 4px;
 font-size: 14px;
 width: 200px;
}

.search-buttons {
 display: flex;
 align-items: center;
}

.search-button {
 padding: 10px 15px;
 border: none;
 border-radius: 4px;
 cursor: pointer;
 transition: background-color 0.3s ease;
}

.search-button-books {
 background-color: #0b69c7;
 color: #fff;
}

.search-button-books:hover {
 background-color: #08509b;
}

.search-button-product {
 background-color: #e6a23c;
 color: #fff;
}

.search-button-product:hover {
 background-color: #d48b15;
}

.button-space {
 width: 20px;
}

.app {
background-color: #f5f5f5;
min-height: 100vh;
display: flex;
flex-direction: column;
}



</style>