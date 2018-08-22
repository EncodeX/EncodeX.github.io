<template>
  <div id="app" class="test">
    {{msg}}
    <hello-world :name="name" :initialEnthusiasm="5" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';

@Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {
  msg: string = 'The first step of the app';
  name: string = 'World Test';
}
</script>

<style lang="sass" scoped>
.test
  color: #f00
</style>
