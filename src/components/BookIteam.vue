<template>
    <div class="app">
      <Headder/>
      <main class="app-main">


<el-drawer
  :visible.sync="drawerbook"
  :direction="directionbook"
  size="55%">
  <h2>Book Application</h2>
      <book-form  :book-to-edit="bookToEdit" :bookData="bookData" @book-created="handleBookCreated" @book-updated="handleBookUpdated"/>
</el-drawer>

<el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
</el-row>
    <h2 class="table-title">Book Table</h2>
    <div class="button-container">
    <el-button @click="drawerbook = true" icon="el-icon-plus" type="text" >
      Add Book
    </el-button>
    </div>
    <BookTable :bookData="bookData" @edit-book="handleEditBook" @delete-book="deleteBook"/>
    <el-button @click="fetchData" type="text">Add</el-button>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>
    <Fotter/>
        </main>
    </div>
</template>



<script>
import axios from 'axios';
import Headder from './Headder.vue';
import Fotter from './Fotter.vue';
import BookTable from './BookTable.vue';
import BookForm from './BookForm.vue';


export default {
  name: 'HelloWorld',
  components: {
    Headder,
    Fotter,
    BookTable,
    BookForm,
},
  props: {
    msg: String,
    bookIndex: Number,
  },
  computed: {
  filteredBookData() {
    if (!this.bookSearch) {
      return this.bookData;
    }
    const searchLower = this.bookSearch.toLowerCase();
      return this.bookData.filter(book =>
        book.id.toLowerCase().includes(searchLower)
      );
  },
 
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
            bookTitle:[
            { required: true, message: 'Please enter the Book Title', trigger: 'blur' },

            ],
            author:[
            { required: true, message: 'Please enter the Book Author', trigger: 'blur' },

            ]

    },

          bookData: [],
          editingBookIndex: -1,
          visible: false,
          drawerbook: false,
          responseData: null,  
          bookToEdit: null,     
      }

    },
    methods: {
           
          handleBookCreated(newBook) {
      this.bookData.push(newBook); // Update the bookData array
    },
    handleBookUpdated(updatedBook) {
      const index = this.bookData.findIndex(book => book.id === updatedBook.id);
      if (index !== -1) {
        this.bookData.splice(index, 1, updatedBook); // Update the bookData array
      }
    },


        fetchData() {
          axios.get('https://localhost:7141/Books/')
            .then(response => {
              this.bookData = response.data;
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
        },


        deleteBookById(bookId) {
        axios.delete(`https://localhost:7141/Book/${bookId}`)
          .then(response => {
            console.log('Book deleted successfully:', response.data);
            // Update the bookData array to remove the deleted book
            this.bookData = this.bookData.filter(book => book.id !== bookId);
          })
          .catch(error => {
            console.error('Error deleting book:', error);
          });
          console.log(bookId);
      },
      

      
        open(bookIndex) {
            this.$confirm('Are you sure you want to delete this book? This action cannot be undone.', 'Delete Book',  {
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: 'Book deleted successfully'
              });
              this.handleDelete(bookIndex,1);
            }).catch(() => {
              this.$message({
                type: 'info',
                message: 'Delete canceled'
              });          
            });
          },
        
          deleteBook(bookId) {
        this.$confirm('Are you sure you want to delete this book? This action cannot be undone.', 'Delete Book', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'Book deleted successfully'
          });
          this.deleteBookById(bookId);
          }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          });
        });
      },

      
        
     
            open2() {
            this.$message({
              showClose: true,
              message: 'Congrats, Your Iteam is updated.',
              type: 'success'
            });
          },

            
          
            handleSelect(key, keyPath) {
            console.log(key, keyPath);  
            },
           

    handleEditBook(book) {
      this.bookToEdit = book; // Set the bookToEdit prop when editing
      this.drawerbook = true; // Open the form drawer
    },
 
    saveEditedBook() {
      if (this.editingBookIndex >= 0) {
        const updatedBook = {
          id: this.form.bookId,
          name: this.form.bookTitle,
          author: this.form.author
        };

        this.bookData.splice(this.editingBookIndex, 1, updatedBook);
        this.cancelEditBook();
        this.resetForm();
      }
    },
    
    


            handleUpdateBook() {
          if (this.editingBookIndex >= 0) {
            this.bookData[this.editingBookIndex].id = this.form.bookId;
            this.bookData[this.editingBookIndex].name = this.form.bookTitle;
            this.bookData[this.editingBookIndex].author = this.form.author;
            
            this.cancelEditBook();
            this.open2();
            
          }
        },
        
      
        cancelEditBook() {
          this.editingBookIndex = -1;
          this.resetForm();
        },
      
        resetForm() {
          this.form = {
            bookId: '',
            bookTitle: '',
            author: '',
          };
        },      
        handleDelete(bookIndex) {
            console.log(bookIndex);
            this.bookData.splice(bookIndex,1);
          },
          
        }
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

/* Style the header */
.app-header {
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
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
