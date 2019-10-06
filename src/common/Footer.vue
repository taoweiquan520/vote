<template>
  <div class="pos footer">
    <a @click="routerTo(leftUrl)" class="btn activity-btn"><slot name="left"></slot></a>
    <a @click="routerTo(rightUrl)" class="btn join-btn"><slot name="right"></slot></a>
    <div class="foot-block"></div>
  </div>
</template>

<script>
export default {
  props: {
    leftUrl: String,
    rightUrl: String,
  },
  methods: {
    routerTo(to) {
      this.$router.push(`/${to}`);
    },
  },
};
</script>

<style lang="less" scoped>
@import '../assets/css/variable.less';
.footer {
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  height: @footerHeight;
  .btn {
    img {
      width: 100%;
    }
  }
  .foot-block {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 11px;
    background-color: #eac99e;
  }
}
</style>
