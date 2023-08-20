<template>
    <el-form ref="formproduct" :model="form" :rules="rules" >
      <el-form-item label="Product Id:- " prop="Id">
        <el-input v-model="form.Id"></el-input>
      </el-form-item>
      <el-form-item label="Product Name:- " prop="Names">
        <el-input v-model="form.Names"></el-input>
      </el-form-item>
      <el-form-item label="Description:- " prop="Descriptions">
        <el-input type="textarea" v-model="form.Descriptions"></el-input>
      </el-form-item>
      <el-form-item label="Product Price:- " prop="price">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="Is Active:- ">
        <el-radio v-model="form.isAvalable" :label="true">Yes</el-radio>
        <el-radio v-model="form.isAvalable" :label="false">No</el-radio>
      </el-form-item>
      <el-form-item label="Expire Date:- " prop="expirDate">
        <el-date-picker
          v-model="form.expirDate"
          type="date"
          placeholder="Pick a date"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="Product Image">
        <input type="file" @change="handleImageUpload">
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitProduct" round >Create</el-button>
        <el-button type="info"  @click="UpdateProduct" round>Update</el-button>
      </el-form-item>
    </el-form>

  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ProductForm',
    props: {
      productData: Array,
      productToEdit: Object,
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
                ImageData: null, 
            },

           
            rules: {
                Id: [
                    { required: true, message: 'Please enter the Product ID', trigger: 'blur' },
                    { validator: this.validateProductId, trigger: 'blur' },
                ],
                Names: [
                    { required: true, message: 'Please enter the Product Name', trigger: 'blur' },
                ],
                Descriptions: [
                    { required: true, message: 'Please enter the Product Description', trigger: 'blur' },
                ],
                price: [
                    { required: true, message: 'Please enter the Product price', trigger: 'blur', },
                    { validator: this.validateProductPrice, trigger: 'blur' },
                ],
                expirDate: [
                    { required: true, message: 'Please enter the Product Expire Date', trigger: 'blur' },
                ],
            },
      };
    },
    watch: {
       productToEdit: {
                  handler(newProductToEdit) {
                    if (newProductToEdit) {
                      this.form.Id = newProductToEdit.id;
                      this.form.Names = newProductToEdit.names;
                      this.form.Descriptions = newProductToEdit.descriptions;
                      this.form.price = newProductToEdit.price;
                      this.form.isAvalable = newProductToEdit.isAvalable;
                      this.form.expirDate = newProductToEdit.expirDate;

                    } else {
                      this.resetForm();
                    }
                  },
                  immediate: true, // Invoke the handler immediately on component mount
                },
              },


    methods: {
      onSubmitProduct() {
        this.$refs.formproduct.validate(valid => {
          if (valid) {
            const newProduct = {
                id: this.form.Id,
                names: this.form.Names,
                descriptions: this.form.Descriptions,
                expirDate: this.formatDateToISO(this.form.expirDate),
                isAvalable: this.form.isAvalable,
                price: this.form.price,
                imageData: this.form.ImageData,

            };
            axios.post('https://localhost:7141/Add/product/', newProduct)
                        .then(response => {
                        console.log('Product added successfully:', response.data);
                        this.$emit('product-created', newProduct); // Emit the event
                        this.cancelEditProduct();
                        this.$notify.success({
                            title: 'Product Submit',
                            message: 'The product was successfully created!',
                            offset: 100
                        });
                    })
                        .catch(error => {
                        console.error('Error adding product:', error);
                    });
                    console.log(newProduct);
                }
            });

  
        },
        getImageUrl(filename) {
    // Assuming you have a public URL to access the uploaded images
    return `https://localhost:7141/Photos/${filename}`;
  },


        handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('postedFile', file);

      axios.post('https://localhost:7141/SaveFile', formData)
        .then(response => {
          console.log('Image uploaded successfully:', response.data);
          // Update the ImageData property in your form
          this.form.ImageData = response.data; // Assuming response.data contains the image filename
        })
        .catch(error => {
          console.error('Error uploading image:', error);
        });
    },
        validateProductId(rule, value, callback) {
            if (isNaN(value)) {
                callback(new Error('Product ID must be a number'));
            }
            else if (value <= 0) {
                callback(new Error('Product ID must be greater than 0'));
            }
            else {
                callback();
            }
        },
        validateProductPrice(rule, value, callback) {
            if (isNaN(value)) {
                callback(new Error('Product price must be a number'));
            }
            else if (value <= 0) {
                callback(new Error('Product price must be greater than 0'));
            }
            else {
                callback();
            }
        },

    



      UpdateProduct() {
        this.$refs.formproduct.validate(valid => {
          if (valid) {
          
                const updatedProduct = {
                    id: this.form.Id,
                    names: this.form.Names,
                    descriptions: this.form.Descriptions,
                    expirDate: this.formatDateToISO(this.form.expirDate),
                    isAvalable: this.form.isAvalable,
                    price: this.form.price,
                };
                axios.put(`https://localhost:7141/product/${updatedProduct.id}`, updatedProduct)
                    .then(response => {
                    console.log('Product updated successfully:', response.data);
                    // Update the productData array with the updated product
                    const index = this.productData.findIndex(product => product.id === updatedProduct.id);
                    if (index !== -1) {
                        // Update the book in the bookData array
                        this.$emit('product-updated', updatedProduct); 
                        
                    }
                })
                    .catch(error => {
                    console.error('Error updating product:', error);
                    
                });
            
        }
     });
        },
        resetForm(){
          this.form= {
                Id: '',
                Names: '',
                Descriptions: '',
                price: '',
                isAvalable: false,
                expirDate: null,
            };
          },
        formatDateToISO(date) {
            if (!date)
                return ''; // Handle cases where date might be undefined or null
            return new Date(date).toISOString();
        },

        
    },
  };
  </script>
  