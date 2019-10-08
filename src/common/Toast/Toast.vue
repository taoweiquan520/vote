<template>
  <div class="toast" v-if="showToast">
    <div class="toast-container" :style="{ 'text-align': align, width: width }">
      {{ text }}
    </div>
    <div :class="{ mask: mask }"></div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data() {
    return {
      showToast: false,
      text: '', // 内容
      align: '',
      mask: true,
      width: 'auto',
    };
  },
};
</script>

<style lang="less">
@import '../style/vars.less';
.toast {
  line-height: 22px;
  color: #fff;
  font-size: 14px;
  word-break: break-all;
  .toast-container {
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 13px 12px;
    transform: translate(-50%, -50%);
    max-height: 90%;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 8px;
    z-index: 99999;
  }
  .mask {
    position: absolute;
    top: @headerHeight;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: transparent;
    z-index: 99998;
  }
}
</style>
