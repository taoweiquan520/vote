<template>
  <Cell
    tag="label"
    class="v-input-label"
    :class="querySelect && !isSelectCollapsed && '_select-show'"
    :width="width"
    :border="border"
    :margin="margin"
    :flex="flex"
    :leftStyle="leftStyle"
    :rightStyle="rightStyle"
  >
    <template v-slot:prefix>
      <slot name="prefix" />
    </template>
    <template v-slot:left>
      <slot name="left">{{ left }}</slot>
    </template>
    <template v-slot:right>
      <div class="v-input-wrap" @click.stop="handleClick">
        <input
          class="v-input"
          :type="type"
          :placeholder="placeholder"
          v-model="internalValue"
          @blur="handInputBlur"
          @focus="handInputFocus"
          @input="handInputInput"
          @keydown="handleInputKeydown"
          @keyup="handleInputKeyup"
          v-bind="$attrs"
        />
        <Icon type="shanchu" v-if="isClearBtnShow" @touchstart="clearValue" />
      </div>
    </template>
    <template v-slot:suffix>
      <slot name="suffix" />
      <div class="input-select-wrap" v-if="querySelect && !isSelectCollapsed" ref="selectWrap">
        <Select
          v-if="!isSearching"
          @change="handleSelectChange"
          @beforeChange="beforeChange"
          @itemClicked="handleItemClicked"
        >
          <template>
            <slot name="select-options">
              <Option
                v-for="item in normalizedOptionsList"
                :key="item.value"
                :value="item.text"
                border="bottom"
                :code="item.value"
              >
                <span
                  v-for="match in matchStrArray(item.text)"
                  :key="match.type"
                  :class="{ _match: match.match }"
                  :style="{ color: match.match ? '#1091fb' : null }"
                  >{{ match.text }}</span
                >
              </Option>
            </slot>
          </template>
        </Select>
      </div>
    </template>
  </Cell>
</template>

<script>
// import Flex from '../Flex';
import Cell from '../Cell.vue';
import Select from '../Select';
import { arrayPropsMixin as cellArrayPropsMixin } from '../mixins/cell.mixin';
import { regular } from '@/libs/index';
import { getObjectByValue } from '../mixins/radio.group.mixin';
/**
 * 组件使用了mixin, 在当前配置中出现 使用但未定义 变量 实际都在mixin中定义了
 */
export default {
  name: 'Input',
  model: {
    prop: 'value',
    event: 'change',
  },
  mixins: [cellArrayPropsMixin],
  components: {
    Cell,
    Select,
    Option: Select.Option,
  },
  props: {
    value: [String, Number],
    defaultValue: [String, Number],
    size: Number,
    zhLong: {
      type: Number,
      default: 1,
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: String,
    querySelect: Boolean,
    optionsList: Array,
  },
  data() {
    return {
      isSelectCollapsed: true,
      internalValue: this.value || this.defaultValue,
      isSearching: false,
      isClearBtnShow: false,
      normalizedOptionsList: [],
    };
  },
  computed: {
    // normalizedOptionsList() {
    //     alert(111)
    //     // return ['111', '222']
    //     return [this.optionsList[0]]
    //     // return normalizeList(this.optionsList);
    // },
  },
  watch: {
    optionsList(newVal) {
      this.normalizedOptionsList = newVal;
    },
    value(v) {
      this.internalValue = String(v);
    },
    internalValue(v) {
      // this.isClearBtnShow = !!v;
      v = this.filterValue(v);

      this.$emit('change', v);

      if (!this.querySelect || !v || this.disabledSelect) {
        this.disabledSelect = false;
        return;
      }
      this.doSearch(v);
    },
  },

  methods: {
    /**
     * 值的筛选
     */
    filterValue(v) {
      /**
       * 根据长度截取字符串
       *
       * 放在自执行函数中，不符合条件判断直接return
       * 避免多层if嵌套
       */
      (() => {
        const { size } = this;
        // 未限制长度，或长度未超过
        if (!size) {
          return;
        }
        // 对汉字长度未作特殊要求
        if (this.zhLong <= 1 && v.length < size) {
          return;
        }
        // 不管汉字长度是不是设成 234了，总之长度超出了，先截了再说
        v = v.slice(0, size);
        this.internalValue = v;
        // 开始判断有没有汉字
        const zhRegExp = regular.chineFont;
        const match = v.match(zhRegExp);
        // 未匹配到汉字
        if (!match) {
          return;
        }
        const rawSize = v.length;
        let totalSize = rawSize - match.length + match.length * this.zhLong;
        // let totalSize = rawSize + match.length * (this.zhLong - 1);
        // 长度未超过，总之未超过
        if (totalSize <= size) {
          return;
        }
        const { zhLong } = this;
        do {
          const lastChar = v.slice(-1);
          totalSize -= zhRegExp.test(lastChar) ? zhLong : 1;
          v = v.slice(0, -1);
        } while (totalSize > size);
        this.internalValue = v;
      })();

      return v;
    },
    /**
     * 清除输入
     */
    clearValue(e) {
      this.internalValue = '';
      this.isClearBtnShow = false;
      this.closeSelect();
      this.$emit('on-click-clear-icon', e);
      e.preventDefault();
    },
    /**
     * 搜索
     */
    doSearch(string) {
      new Promise((resolve, reject) => {
        this.isSearching = false;
        if (this.promiseReject) {
          this.promiseReject();
        }
        this.closeSelect();
        this.promiseReject = reject;
        this.$emit('search', string, resolve, reject);
      })
        .then((res) => {
          this.showSelect();
          this.isSearching = false;
          this.promiseReject = null;
        })
        .catch((err) => {
          this.promiseReject = null;
          this.closeSelect();
          if (process.env.NODE_ENV === 'development') {
            if (err) {
              throw err;
            }
          }
        });
    },
    showSelect() {
      this.isSelectCollapsed = false;
      document.body.addEventListener('click', this.handleGlobalClick);
    },
    closeSelect() {
      this.isSearching = false;
      this.isSelectCollapsed = true;
      document.body.removeEventListener('click', this.handleGlobalClick);
    },
    handleClick(e) {
      this.$emit('click', e);
    },
    handleGlobalClick(e) {
      if (this.$refs.selectWrap.contains(e.target)) {
        return;
      }
      this.closeSelect();
    },
    handleItemClicked() {
      this.closeSelect();
    },
    handleSelectChange(v) {
      this.closeSelect();
      this.disabledSelect = true;
      const result = getObjectByValue(v, this.normalizedOptionsList);
      this.internalValue = result && result.text;
    },
    handInputInput(e) {
      if (this.internalValue && this.internalValue !== undefined && this.internalValue !== '') {
        this.isClearBtnShow = true;
      } else {
        this.isClearBtnShow = false;
      }
      this.$emit('input', e);
    },
    handInputFocus(e) {
      if (this.internalValue && this.internalValue !== undefined && this.internalValue !== '') {
        this.isClearBtnShow = true;
      }
      this.$emit('focus', e);
    },
    handInputBlur(e) {
      this.isClearBtnShow = false;
      this.$emit('blur', e);
    },
    handleInputKeydown(e) {
      this.$emit('keydown', e);
    },
    handleInputKeyup(e) {
      this.$emit('keyup', e);
    },
    /**
     * 模糊搜索，找出匹配到的字符高亮显示
     */
    matchStrArray(text) {
      // 左匹配
      const { length } = this.internalValue;
      const index = text.indexOf(this.internalValue);
      const left = text.substr(0, index);

      const right = text.substr(index + length);
      let arr = [];
      const obj = {
        text: this.internalValue,
        match: true,
        type: 'middle',
      };
      arr = [
        {
          type: 'left',
          text: left,
        },
        obj,
        {
          type: 'right',
          text: right,
        },
      ];
      return arr;
    },
    beforeChange(...args) {
      this.$emit('beforeChange', ...args);
    },
  },
};
</script>

<style lang="less">
@import '../style/vars.less';
@import '../style/reset.less';
.display() {
  font-size: @fontSize;
  line-height: 1.2;
  padding: (@size - @fontSize * 1.2) / 2 0;
}
.v-input-label {
  // display: block;
  &._select-show {
    position: relative;
    z-index: 2;
  }
  .v-cell-left {
    .display();
  }
  .v-cell-right {
    display: flex;
    align-items: center;
  }
}

@padding: 20px;
.v-input-wrap {
  width: 100%;
  position: relative;
  .icon-shanchu {
    position: absolute;
    z-index: 3;
    color: #ddd;
    top: 50%;
    margin-top: -15px;
    right: @padding - 20px;
    font-size: 16px;
    padding: 3px;
  }
}
.v-input {
  width: 100%;
  .display();
  position: relative;
  z-index: 1;
  padding-right: @padding;
  text-overflow: ellipsis;
  color: #222222;
  &:disabled {
    background: #fff;
    color: #666;
    opacity: 1;
  }
  &::-webkit-input-placeholder {
    color: #cccccc;
  }
}
.input-select-wrap {
  position: absolute;
  left: 0;
  right: 0;
  top: @size;
  background: #fff;
  max-height: 200px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  z-index: 5;
}
</style>
