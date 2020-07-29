<template>
	<div class="about">
		<h1>This is an about page</h1>
		<button @click="removeNode()">pop node from parent</button>
		<router-link to="/">home</router-link>
		<d3network :nodes="state.nodes" :links="state.links" />
    	<!-- <h1>Current Selected Node {{currentNodeSelected}}</h1> -->
		<button @click="addNode()">add node</button>
		<button @click="addLink()">add link</button>
		<hr />
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { defineComponent, reactive, computed } from 'vue';
	import d3network from '@/components/d3network.vue';

	export default defineComponent({
		name: 'About',
		setup(props, { root }) {
			interface State {
				nodes: any[];
				links: any[];
			}

			const state = reactive<State>({
				nodes: [
					{ id: 0, name: 'Finkler', sex: 'F' },
					{ id: 1, name: 'Peter', sex: 'M' },
					{ id: 2, name: 'Ashley', sex: 'F' },
					{ id: 3, name: 'Cricket', sex: 'M' },
				],
				links: [
					{ source: 0, target: 2 },
					{ source: 1, target: 0 },
				],
			});
			
			interface INodeObject {
				id: number;
				index?: number;
				name?: string;
				vx?: number;
				vy?: number;
				x?: number;
				y?: number;
				sex?: string;
			}
			const currentMaxId: any = computed(() => {
				let nodeArray: any[] = [...state.nodes];
				return Math.max(...nodeArray.map((n) => n.id));
			});
			const currentMaxIdx: any = computed(() => {
				let nodeArray: any[] = [...state.nodes];
				return Math.max(...nodeArray.map((n) => n.index));
			});
			const addNode = (): any => {
				let newNodeToAdd: INodeObject = {
					id: currentMaxId.value + 1,
					sex: 'F',
					name: `node-${currentMaxId.value + 1}`,
				};
				state.nodes.push(newNodeToAdd);
			};


			const addLink = () => {
				const link: ISimpleLink = {
					source: currentMaxIdx.value - 1,
					target: currentMaxIdx.value,
				};
				state.links.push(link);
			};

			return { addNode, addLink, state, currentMaxId, currentMaxIdx };
		},
		components: { d3network },
	});
</script>

<style lang="scss"></style>
