<template>
  <div class="page detail-page">
    <HomeBgImg />
    <Header title="才艺展示" />
    <div class="content">
      <div class="pos content-wrap">
        <form action="">
          <div class="avatar-wrap">
            <div class="avatar-content" @click.stop="uploadHeadImg">
              <div class="content-tips">
                <p>支持单张4M以内的图片上传</p>
                <p>上传/更换图片</p>
              </div>
              <img :src="avatar" />
            </div>
            <input
              type="file"
              class="avatar-img hiddenInput"
              name=""
              accept="image/gif,image/jpeg,image/png,image/jpg"
              @change="handleFile"
            />
          </div>
          <div class="form-wrap e-mb15"><label>姓名：</label><input name="" /></div>
          <div class="form-wrap e-mb15"><label>性别：</label><input name="" /></div>
          <div class="form-wrap e-mb15"><label>出生日期：</label><input name="" /></div>
          <div class="form-wrap"><label>参赛宣言：</label><textarea name=""></textarea></div>
          <div class="works-wrap">
            <p>作品上传：</p>
            <input type="file" name="works-img" />
          </div>
          <div class="btn-wrap">
            <a class="btn-submit">确认提交</a>
          </div>
        </form>
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
  name: 'upload',
  components: {
    Footer,
    Header,
    HomeBgImg,
  },
  data() {
    return {
      avatar: '',
    };
  },
  methods: {
    // 打开图片上传
    uploadHeadImg() {
      this.$el.querySelector('.hiddenInput').click();
    },
    // 上传图片
    async handleFile(e) {
      const $target = e.target || e.srcElement;
      const file = $target.files[0];
      const param = new FormData(); // 创建form对象
      param.append('file', file, file.name); // 通过append向form对象添加数据

      await this.testMaxSize(file, 4 * 1024);
    },
    testMaxSize(fileData, maxSize) {
      let isAllow = false;
      const { size } = fileData;
      isAllow = size <= maxSize;
      if (!isAllow) {
        alert('图片大小超过限制！');
      }
      return isAllow;
    },
  },
};
</script>

<style lang="less" scoped>
@import '../assets/css/variable.less';
.e-mb15 {
  margin-bottom: 15px;
}
.hiddenInput {
  display: none;
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
  .avatar-wrap {
    .content-tips {
      width: 80px;
      height: 80px;
      margin: 0 auto 9px;
      border: 1px dashed #2b5669;
      border-radius: 8px;
      overflow: hidden;
      p {
        &:first-child {
          font-size: 12px;
          color: red;
          background-color: #fff;
          height: 60px;
        }
        &:last-child {
          background-color: #fddc95;
          color: #fff;
          height: 20px;
          line-height: 20px;
        }
      }
    }
  }
  .form-wrap {
    display: flex;
    padding: 0 10px;
    font-size: 15px;
    label {
      font-weight: bold;
      text-align: right;
      width: 80px;
    }
    input {
      height: 20px;
      line-height: 20px;
      width: 158px;
    }
    textarea {
      width: 158px;
      height: 60px;
    }
  }
  .works-wrap {
    padding: 0 10px;
    p {
      font-weight: bold;
      width: 80px;
      font-size: 16px;
      text-align: right;
    }
  }
  .btn-wrap {
    .btn-submit {
      font-size: 12px;
      display: inline-block;
      padding: 2px 4px;
      border: 1px solid #265766;
      border-radius: 8px;
    }
  }
}
</style>
