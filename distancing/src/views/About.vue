<template>
  <div class="about">
    <h1>This is an about page</h1>
    <router-link to="/">home</router-link>
    <d3network />
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import { defineComponent } from '@vue/composition-api';
import d3network from '@/components/d3network.vue';

export default defineComponent({
    name: 'About',
    setup(props, { root }) {},
    components: { d3network },
});
</script>

<style lang="scss">

</style>
