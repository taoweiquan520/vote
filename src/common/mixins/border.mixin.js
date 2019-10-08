export const arrayPropsMixin = {
  props: ['border', 'tag'],
};

export default {
  props: {
    border: {
      validator(value) {
        return ['top', 'bottom', 'both'].indexOf(value) !== -1;
      },
    },
    tag: {
      type: String,
      default: 'div',
    },
  },
  computed: {
    borderX() {
      return ['v-border', this.border ? `_${this.border}` : ''];
    },
  },
};
