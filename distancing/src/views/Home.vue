<template>
	<div>
		    <!-- <button class="button is-primary is-medium"
                @click="cardModal()">
                Launch card modal (Component)
            </button>

	<SideBar/> -->

		<div>
			<NetworkGraph :nodes="state.nodes" :links="state.links" :options="options" :nodeClick="onNodeClick" :linkClick="onLinkClick" />
		</div>

 <div class="block">  
	 
	 <div class="control">
	 	Select a node to create a new connection.
			<h5>new node id: {{ currentMaxId }}</h5>
			<h5>Link to {{ state.currentNode }}</h5>
      
			<label for="name">
				Node Name:
				<input class="input" type="text" v-model="newNode.name" />
			</label>
        </div>
  			<button class="button" @click="addNodeWithLink">Add new node</button>

    </div>


	
	</div>
</template>

<script lang="ts">
	import NetworkGraph from '@/components/NetworkGraph.vue';
	import SideBar from '@/components/SideBar.vue';
	import { defineComponent, ref, reactive, computed } from '@vue/composition-api';
	import useNetwork from '@/composables/useNetwork';
	import Vue from 'vue';
// import { DialogProgrammatic as Dialog } from 'buefy'

	export default defineComponent({
		name: 'Home',
		setup(props, context: any) {

			const cardModal = () => {
				console.log(context);
			   context.root.$buefy.dialog.alert("hellow")
			   
            }


			const { state, currentMaxId, onNodeClick, onLinkClick, addNodeWithLink, newNode, options, save } = useNetwork();

			return { cardModal, state, currentMaxId, onNodeClick, onLinkClick, addNodeWithLink, newNode,options, save };
			},
		components: {
			NetworkGraph,
			SideBar
		},
			computed:{
		newId1() {
			return Math.max(...this.state.nodes.map((i) => i.id));
		}}
	});
</script>

<style lang="scss"></style>
