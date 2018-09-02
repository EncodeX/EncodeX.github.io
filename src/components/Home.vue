<template lang="html">
  <div>
    <div class="welcome">
      <div class="welcome__message">> WELCOME</div>
      <div class="welcome__message">> ENCODE.X HERE_</div>
      <div class="welcome__message__secondary">
        <div>> Front-End Developer</div>
        <div>> Mobile App Developer</div>
        <div>> Gamer_</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
}
</script>

<style lang="sass" scoped>
.welcome
  display: flex
  flex-direction: column
  justify-content: center
  height: 100%
  padding: 0 100px
  font-style: italic
  &__message
    font-size: 50pt
    &__secondary
      font-size: 18pt
</style>
