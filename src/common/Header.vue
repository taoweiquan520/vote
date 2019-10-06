<template>
  <div class="pos detail-header">
    <h3 class="detail-title">{{ title }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
  methods: {},
};
</script>

<style lang="less" scoped>
@import '../assets/css/variable.less';
.detail-header {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  height: @headerHeight;
  background: url('../assets/images/header.png') no-repeat;
  background-size: 100% 100%;
  .detail-title {
    color: #4d6c6f;
    line-height: @headerHeight;
    font-size: 18px;
    letter-spacing: 2px;
  }
}
</style>
