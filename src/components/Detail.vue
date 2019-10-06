<template>
  <div class="page detail-page">
    <HomeBgImg />
    <Header title="才艺展示" />
    <div class="content">
      <div class="pos content-wrap">
        <div class="avatar-wrap">
          <img :src="avatar" />
        </div>
        <div class="detail-content-wrap">
          <p class="e-mb10">{{ number }}号选手：{{ name }}</p>
          <div class="detail-info e-mb20">
            <p>性别：{{ sex === 1 ? '男' : '女' }}</p>
            <p>年龄：{{ age }}岁</p>
            <p>组别：{{ group }}组</p>
          </div>
          <p>得票：{{ note }}票</p>
          <div class="detail-video-wrap">
            <video src=""></video>
          </div>
        </div>
        <div class="item-handler">
          <a>投TA一票</a>
          <a>分享助力</a>
        </div>
      </div>
    </div>
    <Footer leftUrl="" rightUrl="activity">
      <template #left>
        <img src="../assets/images/back-btn.png" />
      </template>
      <template #right>
        <img src="../assets/images/activity-btn.png" />
      </template>
    </Footer>
  </div>
</template>

<script>
import { Footer, Header, HomeBgImg } from '../common';

export default {
  name: 'detail',
  components: {
    Footer,
    Header,
    HomeBgImg,
  },
  data() {
    return {
      id: '1',
      avatar:
        'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/topnav/bdbri_72.png?v=md5',
      name: '小福宝',
      note: 1234,
      another: '少年说六合福宝评选',
      rank: 1,
      number: 66,
      sex: 1,
      age: 10,
      group: 'A',
      video: '',
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
@import '../assets/css/variable.less';
.e-mb10 {
  margin-bottom: 10px;
}
.e-mb20 {
  margin-bottom: 20px;
}
.content {
  position: absolute;
  top: @headerHeight;
  left: 0;
  right: 0;
  bottom: @footerHeight;
  background: url('../assets/images/detail-bg.png') @detailBgTop @detailBgLeft no-repeat;
  background-size: @detailPercent @detailPercent;
}
.content-wrap {
  top: @detailBgTop;
  left: @detailBgLeft;
  width: @detailPercent;
  height: @detailPercent;
  padding: 60px 25px 20px 10px;
  box-sizing: border-box;
}
.avatar-wrap {
  width: 80px;
  height: 80px;
  margin: 0 auto 9px;
  border: 1px dashed #2b5669;
  border-radius: 8px;
  img {
    width: 100%;
  }
}
.detail-content-wrap {
  color: #2b5669;
  .detail-video-wrap {
    position: relative;
    margin: 17px auto 0;
    width: 130px;
    height: 125px;
    background-color: #fff;
    video {
      position: absolute;
      top: 0;
      left: 8px;
      right: 8px;
      bottom: 0;
    }
  }
}
.detail-info {
  display: flex;
  justify-content: space-around;
  padding: 0 20px;
}
.item-handler {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 50px;
  display: flex;
  justify-content: space-around;
  padding: 0 20px;
  a {
    font-size: 12px;
    display: inline-block;
    padding: 2px 4px;
    border: 1px solid #265766;
    border-radius: 8px;
  }
}
</style>
