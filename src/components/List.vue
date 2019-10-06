<template>
  <div class="page list-page">
    <HomeBgImg />
    <div class="pos header">
      <img class="search-icon" src="../assets/images/search-icon.png" />
      <input type="text" placeholder="输入姓名/选手ID以检索" />
      <a class="search">搜索</a>
    </div>
    <div class="content">
      <h3 class="list-title">选手</h3>
      <div class="list-wrap">
        <div class="list-item" v-for="item in list" :key="item.id">
          <div class="rank-wrap" v-if="item.rank === 1">
            <img src="../assets/images/rank-1.png" />
          </div>
          <div class="rank-wrap" v-else-if="item.rank === 2">
            <img src="../assets/images/rank-2.png" />
          </div>
          <div class="rank-wrap" v-else-if="item.rank === 3">
            <img src="../assets/images/rank-3.png" />
          </div>
          <div v-else></div>
          <div class="item-avatar">
            <img :src="item.avatar" />
          </div>
          <div class="item-content">
            <div class="item-info">
              <p class="e-mb15">{{ item.name }}</p>
              <p>{{ item.note ? item.note : 0 }}票</p>
              <p>{{ item.another }}</p>
            </div>
            <div class="item-handler">
              <a class="e-mb5">查看才艺</a>
              <a>投TA一票</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer leftUrl="" rightUrl="upload">
      <template #left>
        <img src="../assets/images/back-btn.png" />
      </template>
      <template #right>
        <img src="../assets/images/join-btn.png" />
      </template>
    </Footer>
  </div>
</template>

<script>
import { Footer, HomeBgImg } from '../common';

export default {
  name: 'list',
  components: {
    Footer,
    HomeBgImg,
  },
  data() {
    return {
      list: [
        {
          id: '1',
          avatar:
            'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/topnav/bdbri_72.png?v=md5',
          name: '小福宝',
          note: 1234,
          another: '少年说六合福宝评选',
          rank: 1,
        },
        {
          id: '2',
          avatar:
            'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/topnav/bdbri_72.png?v=md5',
          name: '小福宝',
          note: 1234,
          another: '少年说六合福宝评选',
          rank: 2,
        },
        {
          id: '4',
          avatar:
            'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/topnav/bdbri_72.png?v=md5',
          name: '小福宝',
          note: 1234,
          another: '少年说六合福宝评选',
          rank: 3,
        },
        {
          id: '5',
          avatar:
            'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/topnav/bdbri_72.png?v=md5',
          name: '小福宝',
          note: 1234,
          another: '少年说六合福宝评选',
          rank: 4,
        },
        {
          id: '6',
          avatar:
            'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/topnav/bdbri_72.png?v=md5',
          name: '小福宝',
          note: 1234,
          another: '少年说六合福宝评选',
          rank: 5,
        },
        {
          id: '7',
          avatar:
            'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/topnav/bdbri_72.png?v=md5',
          name: '小福宝',
          note: 1234,
          another: '少年说六合福宝评选',
          rank: 6,
        },
        {
          id: '8',
          avatar:
            'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/topnav/bdbri_72.png?v=md5',
          name: '小福宝',
          note: 1234,
          another: '少年说六合福宝评选',
          rank: 7,
        },
        {
          id: '9',
          avatar:
            'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/topnav/bdbri_72.png?v=md5',
          name: '小福宝',
          note: 1234,
          another: '少年说六合福宝评选',
          rank: 8,
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
@import '../assets/css/variable.less';
.e-mb5 {
  margin-bottom: 5px;
}
.e-mb15 {
  margin-bottom: 15px;
}
.list-page {
  color: #e34544;
}
.header {
  top: 0;
  left: 0;
  right: 0;
  height: @headerHeight;
  background: url('../assets/images/search-banner.png') no-repeat;
  background-size: 100% 100%;
  .search-icon {
    height: 30px;
  }
  input {
    margin-top: 30px;
    padding-left: 10px;
    height: 25px;
    width: 185px;
    line-height: 25px;
    color: @headerColor;
    background-color: transparent;
    &::-webkit-input-placeholder {
      /* WebKit browsers */
      color: @headerColor;
    }
    &::-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: @headerColor;
    }
    &::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: @headerColor;
    }
    &::-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: @headerColor;
    }
  }
  .search {
    display: inline-block;
    width: 50px;
    height: 25px;
    line-height: 25px;
    font-size: 20px;
    color: @headerColor;
  }
}
.content {
  position: absolute;
  top: @headerHeight;
  left: 0;
  right: 0;
  bottom: @footerHeight;
  overflow: auto;
  .list-title {
    padding: 8px;
    border-bottom: 3px solid #285767;
    font-size: 20px;
    letter-spacing: 3px;
  }
  .list-item {
    position: relative;
    padding-top: 10px;
    display: flex;
    padding-left: 41px;
    padding-right: 27px;
    .rank-wrap {
      position: absolute;
      top: 20px;
      left: 10px;
      width: 30px;
      img {
        width: 100%;
      }
    }
    .item-avatar {
      margin-right: 10px;
      width: 60px;
      height: 60px;
      border: 1px solid #285767;
      border-radius: 10px;
      img {
        width: 100%;
      }
    }
    .item-content {
      flex: 1;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #265766;
      text-align: left;
      .item-info {
        font-size: 13px;
        font-weight: bold;
        p {
          &:first-child {
            margin-bottom: 12px;
          }
          &:last-child {
            margin-top: 4px;
          }
        }
      }
      .item-handler {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      a {
        font-size: 12px;
        display: inline-block;
        padding: 2px 4px;
        border: 1px solid #265766;
        border-radius: 8px;
      }
    }
  }
}
</style>
