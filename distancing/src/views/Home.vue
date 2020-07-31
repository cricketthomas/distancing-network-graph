<template>
	<div>
		<label for="theme">
			{{ lightMode == true ? 'dark' : 'light' }}
			<input type="checkbox" v-on:input="changeTheme" v-model="lightMode" title="theme" />
		</label>
		<router-link to="/about">about</router-link>
		<button @click="testFunc">random num</button>
		<d3network :links="{links: state.links}" :nodes="{nodes: state.nodes}" @nodeClick="onNodeClick" />
		<!-- @linkClick="onLinkClick()"-->
		<!-- <hr>
		{{x.nodes.value}}
		<hr>
		{{state.nodes}} -->
		<!--:nodeClick="onNodeClick" -->
		<button @click="addLink">add link</button>
		<input type="checkbox" name="view data" v-model="viewData" />
		<div v-if="viewData">
			<pre>
				{{ nodes }}
			</pre
			>
			<h3>links</h3>
			<pre>
				{{ links }}
			</pre
			>
		</div>
		<hr />
		<h2>Link Updater</h2>
		<input type="radio" value="to" v-model="_new.linkType" />
		<label for="one">Link To</label>
		<br />
		<input type="radio" value="from" v-model="_new.linkType" />
		<label for="two">Link From</label>
		{{ _new }}
		<hr />
		<h5>new node id: {{ currentMaxId }}</h5>
		<h5>Link to {{ currentNode }}</h5>
		<label for="name">
			Node Name:
			<input class="input is-small" type="text" v-model.trim="_new.nodeName" />
		</label>
		<button @click="addNewNode">Add new node</button>

		<button class="" @click="save">Save</button>
		<button class="">Share</button>
	</div>
</template>

<script lang="ts">
	//	import Vue from 'vue';

	import { defineComponent, ref, reactive, computed, onMounted, watchEffect, watch, toRefs, toRef } from 'vue';
	import router from '@/router';
	import useNetworkGraph from '@/composables/useNetworkGraph';
	import useTheme from '@/composables/useTheme';
	import { ISavedNetwork } from '@/models/apiRespone.ts';
	// import { DialogProgrammatic as Dialog } from 'buefy'
	import d3network from '@/components/d3network.vue';

	export default defineComponent({
		name: 'Home',
		setup(props, context) {
			let currentNetwork: ISavedNetwork;
			let viewData = ref(false);
			onMounted(() => {
				let networkParam: string = router.currentRoute.value.params.networkId;
				if (networkParam === 'new'.toLowerCase()) {
					//isNewNetwork = true;
				} else {
					let networkId = get(networkParam);
				}
			});
			// const cardModal = () => {
			// 	console.log(context);
			// 	context.root.$buefy.dialog.alert('hello');
			// };
	
			const { state, currentMaxId, onNodeClick, addNewNode, addLink, _new, get, save } = useNetworkGraph();
			const { lightMode, changeTheme } = useTheme();
//nodes, links, shortId, currentNode, currentLink, isNewNetwork
			return { state, currentMaxId, onNodeClick, addNewNode, _new, save, get, lightMode, changeTheme, addLink, viewData };
		},
		components: { d3network },
	});
</script>

<style lang="scss"></style>
