<template>
  <div class="v-fetch-container">
    <div ref="wrapEl" @scroll="handleScroll" class="v-fetch-container__sub">
      <!-- 下拉加载 -->
      <div
        :class="['__loading__wrap', '_top', needAnimation && 'animation']"
        :style="{ transform: `translate3d(0,${distance}px,0)` }"
      >
        <div class="__loading-text">
          <div v-if="pullRefreshStatus === 'FETCHING'">
            <Loading />
          </div>
          <template v-else-if="pullRefreshStatus === 'IS_MAX'"
            >松开刷新</template
          >
          <template v-else
            >下拉刷新</template
          >
        </div>
      </div>
      <!-- 内容 -->
      <div
        :class="['v-fetch-track', needAnimation && 'animation']"
        :style="{ transform: `translate3d(0,${distance}px,0)` }"
      >
        <slot />
        <div class="__loading-text _bottom" v-if="scrollFetchStatus !== 'DONE'">
          <span v-if="scrollFetchStatus === 'FETCHING'">
            <Loading />
          </span>
          <template v-else-if="scrollFetchStatus === 'ALL_LOADED'"
            >没有更多了</template
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import createSlide from './slide';
import Loading from './loading';

const maxDistance = 35;
// const duration = 300;
const INFINITY_REFRESH_MIN_DIST = 45; // 滚动加载 距离底部  触发距离

/* 手指触摸的状态 */
const START = 'START';
const MOVING = 'MOVING';

/* 触发类型 */
const IS_INFINITE = 'I_IF'; // 滚动加载
const IS_REFRESH = 'P_R'; // 下拉加载

/* 下拉状态显示 */
const PULLING = 'PULLING'; // 正在下拉
const IS_MAX = 'IS_MAX'; // 已到达最小触发点
/* 上滑无限加载 */
const ALL_LOADED = 'ALL_LOADED';
/* 通用状态 */
const FETCHING = 'FETCHING'; // 正在请求
const DONE = 'DONE';
// 完成
export default {
  name: 'Fetch',
  components: {
    Loading,
  },
  props: {
    disableRefresh: {
      type: Boolean,
      default: false,
    },
    disableScroll: {
      type: Boolean,
      default: false,
    },
    stopPropagation: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      distance: 0, // track 元素滑动距离
      needAnimation: false, // track 元素滑动是否需要动画效果
      pullRefreshStatus: DONE, // 下拉加载 的 状态
      scrollFetchStatus: DONE, // 滚动加载 的 状态
    };
  },
  created() {
    this.touchStatus = DONE; // 手指触摸状态
    this.fetchState = null; // 加载状态 ?  下拉刷新 | 无限滚动
    this.promiseReject = null;
    /* ------  */
    this.slideObj = null;
    this.isStateFrozen = false;
  },
  mounted() {
    if (!this.disableRefresh) {
      this.attachEvent();
    }
  },
  beforeDestroy() {
    this.detachEvent && this.detachEvent();
  },
  methods: {
    initList() {
      this.isFetching = false;
      this.scrollFetchStatus = ALL_LOADED;
    },
    attachEvent() {
      this.detachEvent && this.detachEvent();
      this.detachEvent = createSlide({
        el: this.$refs.wrapEl,
        onStart: this.handleStart.bind(this),
        onMove: this.handleMove.bind(this),
        onEnd: this.handleEnd.bind(this),
        axis: 'Y',
      });
    },

    clearState() {
      if (this.promiseReject) {
        this.promiseReject();
      }
      this.touchStatus = DONE; // 手指触摸状态
      this.fetchState = null; // 加载状态 ?  下拉刷新 | 无限滚动
      this.slideObj = null;
      this.isStateFrozen = false;
      // 重置时， 底部提示消失， 会触发 wrapEl 的滚动事件
      // 引发多余的请求

      this.$refs.wrapEl.scrollTop = 0;

      this.distance = 0;
      this.needAnimation = true;
      this.pullRefreshStatus = DONE;
      this.scrollFetchStatus = DONE;
    },

    /**
     * @function - 下拉加载, touchstart事件处理
     * */
    handleStart() {
      // 如果此时加载完成, 元素正在归位, 禁止滑动
      if (this.isStateFrozen || this.disableRefresh) {
        return;
      }
      this.touchStatus = this.$refs.wrapEl.scrollTop === 0 ? START : DONE;
    },

    /**
     * @function - 下拉加载, touchmove事件处理
     * */
    handleMove(obj, e) {
      const touch = obj.touches[0];
      if (touch.axis === 'X') {
        return;
      }
      // 1. 只有在最顶部时,才允许
      if ((this.touchStatus !== START && this.touchStatus !== MOVING) || this.isStateFrozen) {
        return;
      }
      // 2. 如果在最顶部, 但是 不是往下拉, 流程无效
      if (this.touchStatus === START && touch.direction < 0) {
        this.touchStatus = DONE;
        return;
      }
      this.touchStatus = MOVING;
      // 4. 阻止默认事件，在ios上整个网页会被拉下来
      e.preventDefault();

      const isFetching = this.pullRefreshStatus === FETCHING;

      // 5. 设置下拉 距离
      let diff = (touch.direction * touch.diffY < 0 ? 0 : touch.diffY) / 4; // 越大，粘滞感越强
      if (isFetching) {
        diff += maxDistance;
      }

      this.distance = diff;
      this.needAnimation = false;
      this.pullRefreshStatus = isFetching ? FETCHING : diff < maxDistance ? PULLING : IS_MAX;
    },

    /**
     * @function - 下拉加载, touchend事件处理
     * */
    handleEnd() {
      if (this.touchStatus !== MOVING || this.isStateFrozen) {
        return;
      }
      this.touchStatus = DONE;

      const step = this.pullRefreshStatus;
      const isMax = step === IS_MAX;
      const isFetching = step === FETCHING;

      this.distance = isMax || isFetching ? maxDistance : 0;
      this.pullRefreshStatus = isMax || isFetching ? FETCHING : DONE;
      this.needAnimation = true;

      // 当拉到最大位置, 且此时没有在请求数据时才执行
      if (!isMax) {
        return;
      }

      this.fetch(IS_REFRESH);
    },

    /**
     * @function - 滚动加载, 监听滚动
     * */
    handleScroll(e) {
      // 防止嵌套Fetch 问题
      if (this.stopPropagation) {
        e.stopPropagation();
      }
      const el = e.target;
      const { scrollTop } = el;

      if (scrollTop <= 0) {
        return;
      }

      // 被父组件禁用 或 在顶部 不触发
      if (this.disableScroll) {
        return;
      }

      // 没滚到位置， 不触发
      if (el.scrollHeight - (scrollTop + el.clientHeight) > INFINITY_REFRESH_MIN_DIST) {
        return;
      }

      const state = this.scrollFetchStatus;

      // 数据全部加载完了 或  正在加载的时候  不再多次触发
      if (state === ALL_LOADED || state === FETCHING) {
        return;
      }
      this.scrollFetchStatus = FETCHING;
      this.fetch(IS_INFINITE);
    },

    /**
     * @function - 通知外部进行请求
     * */
    fetch(type) {
      // 如果正在请求, 之后的触发都无效, 知道请求完成
      // 但如果两次的请求类型不同, 则继续
      if (this.isFetching && this.fetchState === type) {
        return;
      }
      this.fetchState = type;
      this.isFetching = true;

      // reject上次的Promise
      if (this.promiseReject) {
        this.promiseReject();
      }

      new Promise((resolve, reject) => {
        this.promiseReject = () => {
          this.promiseReject = null;
          reject();
        };
        const fn = this.$listeners.fetch;
        fn ? this.$emit('fetch', resolve, type) : resolve();
      })
        .then((hasAllLoaded) => {
          // 重置状态
          this.isFetching = false;
          this.distance = 0;
          this.pullRefreshStatus = DONE;
          this.needAnimation = true;
          this.scrollFetchStatus = hasAllLoaded ? ALL_LOADED : DONE;
        })
        .catch((err) => {
          console.log(`err:${err}`);
        });
    },
  },
};
</script>

<style lang="less">
.v-fetch-container {
  height: 100%;
  overflow: hidden;
  position: relative;
  &:after {
    display: block;
    content: '\0020';
    position: absolute;
    top: -1px; /*no*/
    left: 0;
    right: 0; /*no*/
    z-index: 11111;
    height: 1px; /*no*/
    // box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.2); /*no*/
  }
}

.v-fetch-container__sub {
  height: 100%;
  position: relative;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.__loading.animation,
.v-fetch-track.animation,
.__loading__wrap.animation {
  transition: all ease 0.3s;
}

.__loading__wrap._top {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 100%;
  overflow: hidden;
}
.__loading-text {
  text-align: center;
  color: #aaa;
  line-height: 25px;
  font-size: 13px;
}

.v-fetch-loading-icon {
  margin-left: 6px;
}

.__loading-text._bottom {
  padding: 8px 0 16px;
}
</style>
