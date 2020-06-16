<template>
	<div class="NetworkGraph">
		<d3-network :net-nodes="nodes" :net-links="links" :options="options" @node-click="nodeClick"  @link-click="linkClick" />
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import D3Network from 'vue-d3-network';
	import { Node, Link, Option } from '@/models/networkgraph';

	export default Vue.extend({
		name: 'NetworkGraph',
		props: {
			msg: String,
			nodes: Array as () => Array<Node>,
			links: Array as () => Array<Link>,
			options: Object as () => Option,
			nodeClick: Function,
			linkClick: Function
		},
		components: {
			D3Network,
		},
	});
</script>

<style scoped lang="scss"></style>
<style src="vue-d3-network/dist/vue-d3-network.css"></style>
