<template>
  <div class="page activity-page">
    <div class="activity-wrap">
      <img src="../assets/images/activity-bg.png" />
      <div class="btn-wrap">
        <a @click="routerTo('')" class="btn activity-btn"
          ><img src="../assets/images/back-btn.png"
        /></a>
        <a @click="routerTo('upload')" class="btn join-btn"
          ><img src="../assets/images/join-btn.png"
        /></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'activity',
  methods: {
    routerTo(to) {
      this.$router.push(`/${to}`);
    },
  },
};
</script>

<style lang="less" scoped>
.activity-wrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  img {
    width: 100%;
  }
  .btn-wrap {
    margin-top: -50px;
    display: flex;
    justify-content: space-around;
  }
}
</style>
