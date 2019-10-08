export default {
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
  },
  computed: {
    active() {
      return this.$parent.current === this.value;
    },
  },
  methods: {
    handleClick(code, e) {
      this.$emit('click', e);
      const fn = this.$parent.itemClicked;
      fn && fn(this.value, e, code);
    },
  },
};
