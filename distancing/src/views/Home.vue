<template>
	<div>
		<b-switch v-on:input="changeTheme" v-model="lightMode" passive-type="is-dark" type="is-warning"> </b-switch>
		<div>
			<NetworkGraph :nodes="state.nodes" :links="state.links" :options="options" :nodeClick="onNodeClick" :linkClick="onLinkClick" />
		</div>

		<div class="columns">
			<div class="column is-6">
				<b-collapse class="card edit-network-card" animation="slide" aria-id="contentIdForA11y3">
					<div slot="trigger" slot-scope="props" class="card-header" role="button" aria-controls="contentIdForA11y3">
						<p class="card-header-title"><span v-if="isNewNetwork">Create a network</span><span v-else>Edit network</span></p>
						<a class="card-header-icon">
							<b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
						</a>
					</div>
					<div class="card-content">
						<div class="content">
							<div class="control">
								Select a node to create a new connection.
								<h5>new node id: {{ currentMaxId }}</h5>
								<h5>Link to {{ state.currentNode }}</h5>
								<label for="name">
									Node Name:
									<input class="input is-small" type="text" v-model="newNode.name" />
								</label>
								<button class="button is-small" @click="addNodeWithLink">Add new node</button>
							</div>
						</div>
					</div>
					<footer class="card-footer">
						<a class="card-footer-item" @click="save">Save</a>
						<a class="card-footer-item">Edit</a>
						<a class="card-footer-item">Share</a>
					</footer>
				</b-collapse>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { defineComponent, ref, reactive, computed, onMounted, watchEffect } from '@vue/composition-api';

	import NetworkGraph from '@/components/NetworkGraph.vue';
	import SideBar from '@/components/SideBar.vue';
	import useNetwork from '@/composables/useNetwork';
	import useTheme from '@/composables/useTheme';

	import { ISavedNetwork } from '@/models/apiRespone.ts';
	// import { DialogProgrammatic as Dialog } from 'buefy'

	export default defineComponent({
		name: 'Home',
		setup(props, { root }) {
			let isNewNetwork = ref<Boolean>(false);
			let currentNetwork: ISavedNetwork;
			watchEffect(() => {
				console.log(window.location.pathname);
			});

			onMounted(() => {
				// set the theme
				if (root.$route.params.networkId === 'new'.toLowerCase()) {
					isNewNetwork.value = true;
				} else {
					let networkId = get(root.$route.params.networkId);
					console.log(networkId);
				}

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
			// const cardModal = () => {
			// 	console.log(context);
			// 	context.root.$buefy.dialog.alert('hello');
			// };

			const { state, currentMaxId, onNodeClick, onLinkClick, addNodeWithLink, newNode, options, get, save } = useNetwork();
			const { lightMode, changeTheme } = useTheme();
			return { state, currentMaxId, onNodeClick, onLinkClick, addNodeWithLink, newNode, options, save, get, lightMode, changeTheme, isNewNetwork };
		},
		components: {
			NetworkGraph,
			SideBar,
		},
	});
</script>

<style lang="scss"></style>
