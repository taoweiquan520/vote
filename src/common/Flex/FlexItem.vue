<template>
  <div class="v-flex-item" :style="{ flex: flexX, marginLeft: margin }" :is="tag" v-on="$listeners">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'FlexItem',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    margin: {
      type: String,
    },
    flex: {
      validator: (v) => ['0', '1', 'auto', 'none'].indexOf(v) !== -1,
    },
    shrink: {
      validator: (v) => ['0', '1'].indexOf(v) !== -1,
    },
    grow: {
      validator: (v) => ['0', '1', '2'].indexOf(v) !== -1,
    },
    basis: String,
  },
  computed: {
    flexX() {
      const flex = (() => {
        switch (this.flex) {
          case '0':
            return [0, 1, '0%'];
          case '1':
            return [1, 1, '0%'];
          case 'none':
            return [0, 0, 'auto'];
          case 'auto':
            return [1, 1, 'auto'];
          default:
            return [1, 0, 'auto'];
        }
      })();
      return `${this.grow || flex[0]} ${this.shrink || flex[1]} ${this.basis || flex[2]}`;
    },
  },
};
</script>
