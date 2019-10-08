/**
 * 为了方便使用，该系列组件 表单部分组件 统一使用 `value` 跟 `defaultValue` 作为props传值名称，以减少记忆负担
 * 组件内部的值，可以使用 internalValue 命名
 */
export const propsMixin = {
  props: {
    defaultValue: [String, Number],
    value: [String, Number],
    list: Array,
  },
};

export default {
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    defaultValue: [String, Number],
    value: [String, Number],
    list: Array,
  },
  data() {
    return {
      current: this.value || this.defaultValue,
    };
  },
  watch: {
    current(v) {
      this.$emit('change', v, getObjectByValue(v, this.normalizedList));
    },
    value(v) {
      this.current = v;
    },
  },
  computed: {
    normalizedList() {
      return normalizeList(this.list);
    },
  },
  methods: {
    /**
     * 点击了一个 选项
     * @param {String|Number} v
     */
    itemClicked(v, e, code) {
      // 在选中值之前触发一次 itemClick 事件
      // 可以在该事件内做逻辑判断，当调用cancelChange时
      // 将阻止此次值的改变
      let result = true;
      const cancelChange = () => {
        result = false;
      };
      this.$emit('beforeChange', v, cancelChange, code);
      if (result === false) {
        this.$emit('itemClicked', e, v);
        return;
      }
      this.current = v;
    },
  },
};

export const normalizeList = function normalizeList(list) {
  if (!list) {
    return [];
  }
  // 缓存，优化性能
  if (list._normalized) {
    return list;
  }
  list = list
    .map((item) => {
      const type = typeof item;
      if (type === 'string' || type === 'number' || type === 'symbol') {
        return {
          text: item,
          value: item,
        };
      }
      if (item && type === 'object') {
        if (!item.text) {
          return false;
        }
        return Object.assign(
          {
            value: item.text,
          },
          item,
        );
      }
      return false;
    })
    .filter(Boolean);

  list._normalized = true;

  return list;
};

export const getObjectByValue = function getObjectByValue(value, list) {
  if (!value) {
    return null;
  }
  let result = null;
  if (list) {
    result = list.filter((item) => item.value === value)[0];
  } else {
    result = {
      text: value,
      value,
    };
  }
  return result;
};
