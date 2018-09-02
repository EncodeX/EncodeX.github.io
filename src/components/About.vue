<template lang="html">
  <div class="about">
    你还什么都不知道
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
}
</script>

<style lang="sass" scoped>
.about
  display: flex
  height: 100%
  align-items: center
  justify-content: center
  font-style: italic
</style>
