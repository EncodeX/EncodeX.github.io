<template lang="html">
  <div class="nav">
    <div class="nav-menu">
      <div
        class="menu-item__wrap"
        :class="{selected: selectedItem === item}"
        v-for="(item, index) in navigation"
        :key="index"
        @click="onMenuItemClicked(item)">
        <div class="menu-item__base">
          <span>-</span>
        </div>
        <div class="menu-item__content">
          <span class="menu-item__title">
            {{item.label}}
            <span>{{item.labelEng}}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import VueExtended from '../interfaces/VueExtended';

@Component
export default class Navigation extends Vue implements VueExtended {
  // data
  navigation : object[] = [{
    label: '主页',
    labelEng: 'HOME',
    path: '/home',
  }, {
    label: '关于我',
    labelEng: 'ABOUT ME',
    path: '/about',
  }];
  selectedItem: any = null;

  mounted () {
    this.selectedItem = this.navigation[0];
  }

  // waches
  @Watch('selectedItem')
  onSelectedItemChanged (val: any, oldVal: any): any {
    this.$router.push(val.path);
  }

  // methods
  onMenuItemClicked (item: any): any {
    if (this.selectedItem === item) return;
    this.selectedItem = item;
  }
}
</script>

<style lang="sass" scoped>
.nav
  height: 100vh
  overflow: hidden
  width: 240px
  padding: 80px 16px 16px
.menu-item
  &__wrap
    cursor: pointer
    margin: 12px 28px 12px 12px
    transition: .1s ease-out
    position: relative
    &:hover .menu-item__content
      &>span
        background-color: #e8e550
        padding-left: 30px
      &::before
        border-bottom: 2rem solid #e8e550
      &::after
        border-top: 2rem solid #e8e550
    &.selected .menu-item__content >span
      padding-left: 20px
    &.selected
      cursor: default
      .menu-item__base
        opacity: 1
        top: 3px
        left: 3px
        right: -3px
  &__content
    display: flex
    align-items: center
    &::before
      content: ''
      border-bottom: 2rem solid #e0dc0f
      border-left: 12px solid transparent
      transition: .1s ease-out
    &::after
      content: ''
      border-top: 2rem solid #e0dc0f
      border-right: 12px solid transparent
      transition: .1s ease-out
  &__title
    background: #e0dc0f
    padding: 0 8px 0 20px
    font-style: italic
    flex: 1
    font-size: 15pt
    line-height: 2rem
    transition: .1s ease-out
    font-weight: 700
    overflow: hidden
    &>span
      font-size: 8pt
      line-height: initial
  &__base
    display: flex
    align-items: center
    position: absolute
    top: 0
    left: 0
    right: 0
    z-index: -1
    opacity: 0
    transition: .1s ease-out
    &>span
      background: #f4f4eb
      padding: 0 8px 0 20px
      font-style: italic
      flex: 1
      font-size: 18pt
      line-height: 2rem
    &::before
      content: ''
      border-bottom: 2rem solid #f4f4eb
      border-left: 12px solid transparent
    &::after
      content: ''
      border-top: 2rem solid #f4f4eb
      border-right: 12px solid transparent
</style>
