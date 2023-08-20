<template>
    <div>
        <el-table
      :data="productData"
      class="custom-table">
      <el-table-column
        prop="id"
        label="Product Id"
        width="90">
      </el-table-column>
      <el-table-column
        prop="names"
        label="Product Name"
        width="120">
      </el-table-column>
      <el-table-column
        prop="descriptions"
        label="Description"
        width=120>
      </el-table-column>
      <el-table-column
        prop="price"
        label="Price"
        width=120>
      </el-table-column>
      <el-table-column
        prop="expirDate"
        label="Expire Date"
        width=120>
        <template slot-scope="scope">
    {{ formatDate(scope.row.expirDate) }}
  </template>
      </el-table-column>
      <el-table-column
        prop="isAvalable"
        label="Available"
        width=150>
        <template slot-scope="scope">
          {{ scope.row.isAvalable ? 'Yes' : 'No' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="imageData"
        label="ImageData"
        width=120>
      </el-table-column>
      <el-table-column
      label="Operations">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEditProduct(scope.row)" icon="el-icon-edit"></el-button>
        <el-button size="mini" type="danger" @click="deleteproduct(scope.row.id)" icon="el-icon-delete"></el-button>

      </template>
    </el-table-column>
</el-table>
    </div>
</template>

<script>
import moment from 'moment';
export default {
  props: ['productData'],
  methods: {
    handleEditProduct(product) {
      this.$emit('edit-product', product);
    },
    deleteproduct(productId) {
      this.$emit('delete-product', productId);
    },
    formatDate(date) {
            return moment(date).format('MMM D, YYYY');
        },
  }
};
</script>

<style scoped>
</style>
