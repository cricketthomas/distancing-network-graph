<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'App',
});
</script>
<style lang="scss">
	@import '@/assets/styles/style.scss';
</style>