<template>
  <div style="display: flex;justify-content: flex-end;margin-top: 15px;">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="items.page"
      :page-sizes="[10, 15, 20, 50, 100]"
      :page-size="items.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="items.total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'PageTag',
    props: ['items'],
    methods: {
      handleSizeChange(val) {
        var page = 1;
        var size = val;
        this.$emit('reload', { size, page });
      },
      handleCurrentChange(val) {
        var size = this.items.pageSize;
        var page = val;
        this.$emit('reload', { size, page });
      },
    },
  };
</script>
