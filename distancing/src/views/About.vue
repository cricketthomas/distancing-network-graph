<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="removeNode()">pop node from parent</button>
    <router-link to="/">home</router-link>
    <d3network :nodes_array="stateTest.nodes_array"/>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import { defineComponent,reactive } from '@vue/composition-api';
import d3network from '@/components/d3network.vue';

export default defineComponent({
    name: 'About',
    setup(props, { root }) {

      const stateTest = reactive({
        nodes_array: [
					{ id: 0, name: 'Finkler', sex: 'F' },
					{ id: 1, name: 'Peter', sex: 'M' },
					{ id: 2, name: 'Ashley', sex: 'F' },
        ]})
        
  const removeNode = () =>{
    stateTest.nodes_array.pop()
  };
    return {stateTest,removeNode }
    },
    components: { d3network },
});
</script>

<style lang="scss">

</style>
