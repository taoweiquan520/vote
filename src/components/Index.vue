<template>
  <div class="page index-page">
    <HomeBgImg />
    <div>
      <img class="pos home-bg" src="../assets/images/home-bg.png" />
    </div>
    <div class="pos fubao-wrap">
      <img class="fubao1" src="../assets/images/fubao1.png" />
      <img class="fubao2" src="../assets/images/fubao2.png" />
    </div>
    <div class="pos btn-wrap">
      <a @click="routerTo('activity')" class="btn activity-btn"
        ><img src="../assets/images/activity-btn.png"
      /></a>
      <a @click="routerTo('list')" class="btn list-btn"
        ><img src="../assets/images/list-btn.png"
      /></a>
      <a @click="routerTo('upload')" class="btn join-btn"
        ><img src="../assets/images/join-btn.png"
      /></a>
    </div>
  </div>
</template>

<script>
import { HomeBgImg } from '../common';

export default {
  name: 'index',
  components: {
    HomeBgImg,
  },
  methods: {
    routerTo(to) {
      this.$router.push(`/${to}`);
    },
  },
};
</script>

<style lang="less" scoped>
.home-bg {
  top: 15px;
  left: 0;
  width: 100%;
}
.fubao-wrap {
  top: 50%;
  left: -20px;
  right: -20px;
  display: flex;
  justify-content: space-between;
  img {
    width: 80px;
    height: 111px;
  }
}
.btn-wrap {
  left: 0;
  right: 0;
  bottom: 30px;
  display: flex;
  justify-content: space-between;

  img {
    width: 100%;
  }
}
</style>
