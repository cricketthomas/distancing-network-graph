<template>
	<div>
		<!-- <button class="button is-primary is-medium"
                @click="cardModal()">
                Launch card modal (Component)
            </button>

	<SideBar/> -->
		   <b-switch
				v-on:input="changeTheme"
				v-model="lightMode"
                passive-type='is-dark'
                type='is-warning'>
            </b-switch>
		<div>
			<NetworkGraph :nodes="state.nodes" :links="state.links" :options="options" :nodeClick="onNodeClick" :linkClick="onLinkClick" />
		</div>

		<div class="columns">
			<div class="column is-6">
			<b-collapse class="card edit-network-card" animation="slide" aria-id="contentIdForA11y3">
				<div slot="trigger" slot-scope="props" class="card-header" role="button" aria-controls="contentIdForA11y3">
					<p class="card-header-title">
						Component
					</p>
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
								<input class="input" type="text" v-model="newNode.name" />
							</label>
							<button class="button" @click="addNodeWithLink">Add new node</button>
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
	import NetworkGraph from '@/components/NetworkGraph.vue';
	import SideBar from '@/components/SideBar.vue';
	import { defineComponent, ref, reactive, computed } from '@vue/composition-api';
	import useNetwork from '@/composables/useNetwork';
	import useTheme from '@/composables/theme';
	import Vue from 'vue';
	// import { DialogProgrammatic as Dialog } from 'buefy'

	export default defineComponent({
		name: 'Home',
		setup(props, context: any) {
			const cardModal = () => {
				console.log(context);
				context.root.$buefy.dialog.alert('hellow');
			};
    	
			const { state, currentMaxId, onNodeClick, onLinkClick, addNodeWithLink, newNode, options, save } = useNetwork();
			const { lightMode, changeTheme } = useTheme();
			return { cardModal, state, currentMaxId, onNodeClick, onLinkClick, addNodeWithLink, newNode, options, save, lightMode, changeTheme  };
		},
		components: {
			NetworkGraph,
			SideBar,
		},
	});
</script>

<style lang="scss"></style>
