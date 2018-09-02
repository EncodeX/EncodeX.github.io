<template>
  <div id="app" class="app">
    <div class="app__background">
      <!-- 微博是个好图床 -->
      <img src="http://ww1.sinaimg.cn/large/7902774bly1fuvbc99gnkj20zk0outex.jpg">
    </div>
    <navigation class="app__nav"></navigation>
    <transition name="fade" mode="out-in" appear>
      <keep-alive>
        <router-view class="app__content"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Navigation from './components/Navigation.vue';

@Component({
  components: {
    Navigation,
  },
})
export default class App extends Vue {
}
</script>

<style lang="sass" scoped>
.app
  overflow: hidden
  height: 100vh
  display: flex
  &__content
    flex: 1
    color: #f4f4eb
    max-width: 960px
    margin: auto
    height: 100vh
  &__nav
    background-color: rgba(0, 0, 0, .2)
    z-index: 0
  &__background
    position: absolute
    top: 0
    left: 0
    width: 100vw
    height: 100vh
    overflow: hidden
    display: flex
    align-items: center
    justify-content: center
    z-index: -1
    &::after
      content: ''
      position: absolute
      top: 0
      left: 0
      width: 100vw
      height: 100vh
      background-color: rgba(0, 0, 0, .85)
      z-index: -2
    img
      min-width: 100%
      min-height: 100%
      object-fit: cover
      z-index: -3
.fade-enter-active,
.fade-leave-active
  transition: all .1s ease
.fade-enter,
.fade-leave-to
  opacity: 0
</style>

<style lang="sass">
body
  background-color: #0d0c00
  padding: 0
  margin: 0
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif
</style>
