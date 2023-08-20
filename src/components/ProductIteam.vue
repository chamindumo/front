<template>
    <div class="app">
  
<Headder/>
        
    <main class="app-main">

    <el-drawer
      :visible.sync="drawerproduct"
      :direction="directionproduct"
      size="50%">
      <h2>Product Form</h2>
    
    <product-form  :product-to-edit=" productToEdit"  @product-created="handleProductCreated" @product-updated="handleproductUpdated"/>



    </el-drawer> 
    
    <h2 class="table-title">Product Table</h2>

<div class="button-container">

<el-button @click="drawerproduct = true" type="text" icon="el-icon-plus"  >
  Add Product
</el-button>
</div>

<ProductTable :productData="productData" @edit-product="handleEditProduct" @delete-product="deleteproduct"/>

<el-button @click="fetchData" type="text">Add</el-button>

</main>

<Fotter/>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import Headder from './Headder.vue';
import Fotter from './Fotter.vue';
import ProductTable from './ProductTable.vue';
import ProductForm from './ProductForm.vue';



export default {
    name: 'HelloWorld',
    props: {
        msg: String,
        productIndex: Number,
    },
    components: {
    Headder,
    Fotter,
    ProductTable,
    ProductForm
},
    computed: {
        filteredProductData() {
            if (!this.productSearch) {
                return this.productData;
            }
            const searchLower = this.productSearch.toLowerCase();
            return this.productData.filter(product => product.Id.toLowerCase().includes(searchLower));
        },
    },
    data() {
        return {
            form: {
                Id: '',
                Names: '',
                Descriptions: '',
                price: '',
                isAvalable: false,
                expirDate: null,
                ImageData:''
            },
           
            productData: [],
            editingProductIndex: -1,
            visible: false,
            drawerproduct: false,
            directionproduct: 'rtl',
            productToEdit: null,
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            }
        };
    },
    methods: {

        handleProductCreated(newProduct) {
      this.productData.push(newProduct); // Update the bookData array
    },

    handleproductUpdated(updatedProduct) {
      const index = this.productData.findIndex(product => product.id === updatedProduct.id);
      if (index !== -1) {
        this.productData.splice(index, 1, updatedProduct); // Update the bookData array
      }
    },
        formatDateToISO(date) {
            if (!date)
                return ''; // Handle cases where date might be undefined or null
            return new Date(date).toISOString();
        },
        openproduct(productIndex) {
            this.$confirm('Are you sure you want to delete this product? This action cannot be undone.', 'Delete Product', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: 'Product deleted successfully'
                });
                this.handleDeleteproduct(productIndex);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Delete canceled'
                });
            });
        },
        formatDate(date) {
            return moment(date).format('MMM D, YYYY');
        },
        fetchData() {
            axios.get('https://localhost:7141/product/')
                .then(response => {
                this.productData = response.data;
            })
                .catch(error => {
                console.error('Error fetching data:', error);
            });
        },
        deleteproduct( Id) {
            this.$confirm('Are you sure you want to delete this pro? This action cannot be undone.', 'Delete Book', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: 'Book deleted successfully'
                });
                this.deleteProductbyId(Id);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Delete canceled'
                });
            });
        },
      
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        
        deleteProductbyId(Id) {
            axios.delete(`https://localhost:7141/product/${Id}`)
                .then(response => {
                console.log('Product deleted successfully:', response.data);
                // Update the bookData array to remove the deleted book
                this.productData = this.productData.filter(product => product.id !== Id);
            })
                .catch(error => {
                console.error('Error deleting product:', error);
            });
            console.log(Id);
        },
        handleEditProduct(product) {
            this.productToEdit = product; // Set the bookToEdit prop when editing
            this.drawerproduct = true; // Open the form drawer
    },
       
        cancelEditProduct() {
            this.editingProductIndex = -1;
            this.resetForm();
        },
        
        
        handleDeleteproduct(productIndex) {
            console.log(productIndex);
            this.productData.splice(productIndex, 1);
        }
    },
}
</script>

<style>
/* Style the main container */
.nav {
padding: 20px;
}

/* Style the drawer header */
.el-drawer__header {
background-color: #f0f0f0;
padding: 10px;
border-bottom: 1px solid #ccc;
}

/* Style the drawer content */
.el-drawer__body {
padding: 20px;
background-color: #ffffff;
}

/* Style the drawer title */
.el-drawer__title {
font-size: 20px;
}

/* Style the form labels */
.el-form-item__label {
font-weight: bold;
}

/* Style the date picker */
.el-date-picker {
width: 100%;
}

/* Style the search input */
.search-input {
margin-bottom: 20px;
}

/* Style the buttons */
.el-button {
margin-right: 10px;
}

/* Style the table headers */
.el-table__header th {
font-weight: bold;
font-size: 14px;
background-color: #f0f0f0;
}

/* Style the table cells */
.el-table__body td {
vertical-align: middle;
}

/* Style the edit and delete buttons */
.operation-buttons {
display: flex;
justify-content: space-between;
align-items: center;
}

/* Style the plus icon */
.el-icon-plus:before {
font-size: 20px;
}

/* Style the notification */
.el-notification {
top: 80px;
}

/* Style the drawer size */
.el-drawer {
max-width: 90%;
}

/* Add spacing to the bottom of the row */
.el-row {
margin-bottom: 10px;
}

/* Add spacing between tables */
.el-table {
margin-bottom: 30px;
}

/* Style the background of alternating rows */
.el-table__row:nth-child(even) {
background-color: #f9fafc;
}

/* Style the background of hovered rows */
.el-table__row:hover {
background-color: #226c8f;
}

.app {
background-color: #f5f5f5;
min-height: 100vh;
display: flex;
flex-direction: column;
}




/* Style the footer */


.button-container {
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 20px;
}

/* Style the primary buttons */
.el-button--primary {
background-color: #226c8f;
color: #fff;
}

/* Style the success buttons */
.el-button--success {
background-color: #00a86b;
color: #fff;
}

/* Style the warning buttons */
.el-button--warning {
background-color: #e6a23c;
color: #fff;
}

/* Style the error buttons */
.el-button--danger {
background-color: #f56c6c;
color: #fff;
}

/* Style the clear buttons */
.el-button--text {
color: #226c8f;
}

/* Style the input components */
.el-input {
width: 100%;
border: 1px solid #ccc;
border-radius: 4px;
padding: 8px;
}

/* Style the textarea component */
.el-textarea {
width: 100%;
border: 1px solid #ccc;
border-radius: 4px;
padding: 8px;
}

/* Style the radio buttons */
.el-radio {
margin-right: 10px;
}

/* Style the notification */
.el-notification {
top: 80px;
background-color: #76bada;
color: #fff;
border-radius: 4px;
}

/* Style the table pagination */
.el-pagination {
margin-top: 20px;
text-align: right;
}

/* Style the footer */
.app-footer {
background-color: #333;
color: #fff;
padding: 10px;
text-align: center;
}

.custom-table {
border: 1px solid #ccc;
border-radius: 4px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
font-size: 14px;
}

/* Style the table title */
.table-title {
font-size: 18px;
margin-top: 30px;
margin-bottom: 10px;
}

/* Style the table header */
.el-table__header th {
background-color: #f0f0f0;
color: #333;
font-weight: bold;
font-size: 14px;
padding: 10px;
}

/* Style the table rows */
.el-table__row {
transition: background-color 0.2s ease;
}

.el-table__row:nth-child(even) {
background-color: #f9fafc;
}

.el-table__row:hover {
background-color: #eaf2f8;
}

/* Style the pagination */
.el-pagination {
margin-top: 20px;
text-align: right;
font-size: 14px;
}

/* Style the table cell alignment */
.el-table__body td {
vertical-align: middle;
}

/* Style the operation buttons */
.operation-buttons {
display: flex;
justify-content: space-between;
align-items: center;
}

.operation-buttons .el-button {
margin-right: 5px;
padding: 5px 10px;
font-size: 12px;
border-radius: 4px;
}


/* Style the edit and delete icons */
.el-button.icon-button {
font-size: 18px;
padding: 0;
margin-right: 5px;
color: #0b69c7;
}

.el-message-box__wrapper {
border-radius: 4px;
box-shadow: 0 2px 8px rgba(26, 25, 25, 0.1);
}

.el-message-box__header {
background-color: #f0f0f0;
padding: 10px;
border-radius: 4px 4px 0 0;
}

.el-message-box__title {
font-weight: bold;
}

.el-message-box__message {
padding: 20px;
}

.el-message-box__btns {
text-align: center;
margin-top: 10px;
}

.el-message-box__btns button {
margin: 0 5px;
}
</style>


