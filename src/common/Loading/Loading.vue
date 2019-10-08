<template>
  <div class="loading" v-if="showLoading">
    <div class="loading-container" :style="{ 'text-align': align, width: width, height: height }">
      <div class="lds-css ng-scope">
        <div class="lds-spinner" style="width:100%;height:100%">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <!--<img :src="img" />-->
      <span>{{ text }}</span>
    </div>
    <div :class="{ mask: mask }"></div>
  </div>
</template>

<script>
// import loadingImg from '@/assets/images/loading3.gif';
// import loadingImg from '@/assets/images/loading.svg';
export default {
  name: 'Toast',
  data() {
    return {
      showLoading: false,
      // img: loadingImg,
      text: '', // 内容
      align: '',
      mask: true,
      width: '100px',
      height: '100px',
    };
  },
};
</script>

<style lang="less">
@import '../style/vars.less';
.loading {
  line-height: 22px;
  /* no */
  color: #fff;
  font-size: 14px;
  /* no */
  word-break: break-all;
  .loading-container {
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 13px 12px;
    /* no */
    transform: translate(-50%, -50%);
    max-height: 90%;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 8px;
    /* no */
    z-index: 999999;
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
  @keyframes lds-spinner {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @-webkit-keyframes lds-spinner {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  .lds-spinner {
    position: relative;
    width: 80%;
  }
  .lds-spinner div {
    left: 318%;
    /* no */
    top: 0px;
    /* no */
    position: absolute;
    -webkit-animation: lds-spinner linear 1s infinite;
    animation: lds-spinner linear 1s infinite;
    background: #b8b8b8;
    width: 15px;
    /* no */
    height: 67px;
    /* no */
    border-radius: 72%;
    -webkit-transform-origin: 6px 102px;
    /* no */
    transform-origin: 6px 102px;
    /* no */
  }
  .lds-spinner div:nth-child(1) {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-animation-delay: -0.916666666666667s;
    animation-delay: -0.916666666666667s;
  }
  .lds-spinner div:nth-child(2) {
    -webkit-transform: rotate(30deg);
    transform: rotate(30deg);
    -webkit-animation-delay: -0.833333333333333s;
    animation-delay: -0.833333333333333s;
  }
  .lds-spinner div:nth-child(3) {
    -webkit-transform: rotate(60deg);
    transform: rotate(60deg);
    -webkit-animation-delay: -0.75s;
    animation-delay: -0.75s;
  }
  .lds-spinner div:nth-child(4) {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-animation-delay: -0.666666666666667s;
    animation-delay: -0.666666666666667s;
  }
  .lds-spinner div:nth-child(5) {
    -webkit-transform: rotate(120deg);
    transform: rotate(120deg);
    -webkit-animation-delay: -0.583333333333333s;
    animation-delay: -0.583333333333333s;
  }
  .lds-spinner div:nth-child(6) {
    -webkit-transform: rotate(150deg);
    transform: rotate(150deg);
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
  }
  .lds-spinner div:nth-child(7) {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
    -webkit-animation-delay: -0.416666666666667s;
    animation-delay: -0.416666666666667s;
  }
  .lds-spinner div:nth-child(8) {
    -webkit-transform: rotate(210deg);
    transform: rotate(210deg);
    -webkit-animation-delay: -0.333333333333333s;
    animation-delay: -0.333333333333333s;
  }
  .lds-spinner div:nth-child(9) {
    -webkit-transform: rotate(240deg);
    transform: rotate(240deg);
    -webkit-animation-delay: -0.25s;
    animation-delay: -0.25s;
  }
  .lds-spinner div:nth-child(10) {
    -webkit-transform: rotate(270deg);
    transform: rotate(270deg);
    -webkit-animation-delay: -0.166666666666667s;
    animation-delay: -0.166666666666667s;
  }
  .lds-spinner div:nth-child(11) {
    -webkit-transform: rotate(300deg);
    transform: rotate(300deg);
    -webkit-animation-delay: -0.083333333333333s;
    animation-delay: -0.083333333333333s;
  }
  .lds-spinner div:nth-child(12) {
    -webkit-transform: rotate(330deg);
    transform: rotate(330deg);
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
  }
  .lds-spinner {
    width: 50px !important;
    /* no */
    height: 50px !important;
    /* no */
    -webkit-transform: translate(-17.5px, -17.5px) scale(0.175) translate(17.5px, 17.5px);
    /* no */
    transform: translate(-17.5px, -17.5px) scale(0.175) translate(17.5px, 17.5px);
    /* no */
  }
}
</style>
