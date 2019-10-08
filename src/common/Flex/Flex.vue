<template>
  <Border
    class="v-flex"
    :tag="tag"
    :border="border"
    :class="justify && `_${justify}`"
    v-on="$listeners"
  >
    <slot />
  </Border>
</template>
<script>
import Border from '../Border.vue';
import { arrayPropsMixin as BorderPropsMixin } from '../mixins/border.mixin';
/**
 * 组件使用了mixin, 在当前配置中出现 使用但未定义 变量 实际都在mixin中定义了
 */
export default {
  name: 'Flex',
  components: {
    Border,
  },
  mixins: [BorderPropsMixin],
  props: {
    justify: {
      validator: (value) =>
        ['center', 'space-between', 'space-around', 'flex-start', 'flex-end'].indexOf(value) !== -1,
    },
  },
};
</script>

<style lang="less">
.v-flex {
  display: flex;
  &._center {
    justify-content: center;
  }
  &._space-between {
    justify-content: space-between;
  }
  &._space-around {
    justify-content: space-around;
  }
  &._flex-start {
    justify-content: flex-start;
  }
  &._flex-end {
    justify-content: flex-end;
  }
}
</style>
