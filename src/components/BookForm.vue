<template>
    <el-form ref="formbook" :model="form" :rules="rules" >
      <el-form-item label="Book Id :- " prop="bookId">
        <el-input v-model="form.bookId"></el-input>
      </el-form-item>
      <el-form-item label="Book Title :- " prop="bookTitle">
        <el-input v-model="form.bookTitle"></el-input>
      </el-form-item>
      <el-form-item label="Author :- " prop="author">
        <el-input v-model="form.author"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitBook">Create</el-button>
        <el-button type="info" @click="updateBook">Update</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'BookForm',
    props: {
      bookData: Array,
      bookToEdit: Object,

    },
    data() {
      return {
        form: {
          bookId: '',
          bookTitle: '',
          author: '',
        },
        rules: {
          bookId: [
            { required: true, message: 'Please enter the Book ID', trigger: 'blur' },
            { validator: this.validateBookId, trigger: 'blur'},
          ],
          bookTitle: [
            { required: true, message: 'Please enter the Book Title', trigger: 'blur' },
          ],
          author: [
            { required: true, message: 'Please enter the Book Author', trigger: 'blur' },
          ],
        },
      };
    },
    watch: {
    bookToEdit: {
      handler(newBookToEdit) {
        // Update the form fields when bookToEdit changes
        if (newBookToEdit) {
          this.form.bookId = newBookToEdit.id;
          this.form.bookTitle = newBookToEdit.name;
          this.form.author = newBookToEdit.author;
        } else {
          // Clear the form fields when bookToEdit becomes null
          this.resetForm();
        }
      },
      immediate: true, // Invoke the handler immediately on component mount
    },
  },
    methods: {
      onSubmitBook() {
        this.$refs.formbook.validate(valid => {
          if (valid) {
            const newBook = {
              id: this.form.bookId,
              name: this.form.bookTitle,
              author: this.form.author,
            };
  
            axios.post('https://localhost:7141/Add/Book/', newBook)
              .then(response => {
                console.log('Book created successfully:', response.data);
                this.$emit('book-created', newBook); // Emit the event
                this.resetForm();
                this.$notify.success({
                  title: 'Book Created',
                  message: 'The book has been created successfully!',
                  offset: 100,
                });
              })
              .catch(error => {
                console.error('Error creating book:', error);
                
              });
          }
        });
      },
  
      validateBookId(rule, value, callback) {
      if (isNaN(value)) {
        callback(new Error('Book ID must be a number'));
      } else if (value <= 0) {
        callback(new Error('Book ID must be greater than 0'));
      } else {
        callback();
      }
    },

    updateBook() {
      this.$refs.formbook.validate(valid => {
          if (valid) {
        const updatedBook = {
          id: this.form.bookId,
          name: this.form.bookTitle,
          author: this.form.author,
        };

        axios.put(`https://localhost:7141/Book/${updatedBook.id}`, updatedBook)
          .then(response => {
            console.log('Book updated successfully:', response.data);
            
            // Find the index of the updated book in the bookData array
            const index = this.bookData.findIndex(book => book.id === updatedBook.id);
            if (index !== -1) {
              // Update the book in the bookData array
              this.$emit('book-updated', updatedBook);                 
            }
          })
          
        }
      });
          
      },

    },

    

    
  };
  </script>
  