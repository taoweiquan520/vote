export const arrayPropsMixin = {
  props: ['left', 'right', 'width', 'margin', 'border', 'flex', 'leftStyle', 'rightStyle'],
};

export default {
  props: {
    left: {
      type: [String, Number, Boolean],
      default: '',
    },
    right: {
      type: [String, Number, Boolean],
      default: '',
    },
    width: {
      // TODO: validator 验证
      type: [Number, String],
      default: 'auto',
    },
    // TODO: validator 验证
    margin: [Number, String],
    border: {
      validator(value) {
        return ['top', 'bottom', 'both'].indexOf(value) !== -1;
      },
    },
    flex: {
      validator(value) {
        return ['left', 'right', 'both'].indexOf(value) !== -1;
      },
      default: 'right',
    },
    leftStyle: Object,
    rightStyle: Object,
  },
};
