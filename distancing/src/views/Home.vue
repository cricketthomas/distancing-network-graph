<template>
	<div>
		<label for="theme">
			{{ lightMode == true ? 'dark': 'light'}}
			<input type="checkbox" v-on:input="changeTheme" v-model="lightMode" title="theme"/>
		</label>
		<router-link to="/about">about</router-link>
		<d3network :nodes="state.nodes" :links="state.links" @nodeClick="onNodeClick(...arguments)" @linkClick="onLinkClick(...arguments)" />
		<!--:nodeClick="onNodeClick" -->
		<button @click="addLink">add link</button>
		<input type="checkbox" name="view data" v-model="viewData"/>
		<div v-if="viewData">
			<pre>
		{{ state.nodes }}
		</pre
			>
			<h3>links</h3>
			<pre>
			{{ state.links }}
		</pre
			>
		</div>
		<hr />

		Select a node to create a new connection.
		<h5>new node id: {{ currentMaxId }}</h5>
		<h5>Link to {{ state.currentNode }}</h5>
		<label for="name">
			Node Name:
			<input class="input is-small" type="text" v-model="newNode.name" />
		</label>
		<button @click="addNodeWithLink">Add new node</button>

		<button class="card-footer-item" @click="save">Save</button>
		<button class="card-footer-item">Share</button>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';

	import { defineComponent, ref, reactive, computed, onMounted, watchEffect, watch } from '@vue/composition-api';

	import useNetworkGraph from '@/composables/useNetworkGraph';
	import useTheme from '@/composables/useTheme';
	import { ISavedNetwork } from '@/models/apiRespone.ts';
	// import { DialogProgrammatic as Dialog } from 'buefy'
	import d3network from '@/components/d3network.vue';

	export default defineComponent({
		name: 'Home',
		setup(props, { root }) {
			let currentNetwork: ISavedNetwork;
			let viewData = ref(false);
			onMounted(() => {
				// set the theme
				if (root.$route.params.networkId === 'new'.toLowerCase()) {
					state.isNewNetwork = true;
				} else {
					let networkId = get(root.$route.params.networkId);
				}
			});
			// const cardModal = () => {
			// 	console.log(context);
			// 	context.root.$buefy.dialog.alert('hello');
			// };

			const { state, currentMaxId, onNodeClick, onLinkClick, addNodeWithLink, addLink, newNode, options, get, save } = useNetworkGraph();
			const { lightMode, changeTheme } = useTheme();
			return { state, currentMaxId, onNodeClick, onLinkClick, addNodeWithLink, newNode, options, save, get, lightMode, changeTheme, addLink, viewData };
		},
		components: { d3network },
	});
</script>

<style lang="scss"></style>
