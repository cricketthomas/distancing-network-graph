<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { defineComponent, onMounted, watch } from 'vue';

export default defineComponent({
  name: 'App',
    	setup(props, context) {
        onMounted(() => {
				// set the theme
				if (!localStorage.lightMode) {
					console.log('updating to light');
					document.body.setAttribute('data-theme', '');
					localStorage.setItem('lightMode', 'true');
				}
				if (localStorage.lightMode == 'false') {
					console.log('updating to dark');
					document.body.setAttribute('data-theme', 'dark');
					localStorage.setItem('lightMode', 'false');
				}
			});
      }
});
</script>
<style lang="scss">

	@import '@/assets/styles/style.scss';
</style>