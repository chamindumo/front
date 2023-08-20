<template>
  <div>
    <el-table
      :data="bookData"
      class="custom-table"
    >
      <el-table-column
        prop="id"
        label="Book Id"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="Book Title"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="author"
        label="Author"
        width="180"
      ></el-table-column>
      <el-table-column label="Operations">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEditBook(scope.row)"
            icon="el-icon-edit"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDeleteBook(scope.row.id)"
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ['bookData'],
  methods: {
    handleEditBook(book) {
      this.$emit('edit-book', book);
    },
    handleDeleteBook(bookId) {
      this.$emit('delete-book', bookId);
    }
  }
};
</script>

<style scoped>
</style>
