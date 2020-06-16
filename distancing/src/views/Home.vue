<template>
	<div>
		<div class="home">
			<NetworkGraph :nodes="state.nodes" :links="state.links" :options="options" :nodeClick="onNodeClick" :linkClick="onLinkClick"/>
		</div>

		<div style="border: 2px solid white; color: white;">
			Select a node to create a new connection.
			<hr />
			<h5>id: {{ maxId }}</h5>
			<h5>Link to {{ state.currentNode }}</h5>
			<label for="name">
				Node Name:
				<input type="text" v-model="newNode.name" />
			</label>
			{{ newNode.name }}
			<button @click="addNodeWithLink">Add new node</button>
		</div>
	</div>
</template>

<script lang="ts">
	import NetworkGraph from '@/components/NetworkGraph.vue';
	import { INodeObject, ILinkObject, Node, Link, Option } from '@/models/networkgraph';
	import { defineComponent, ref, reactive, computed } from '@vue/composition-api';

	interface State {
		currentNode: number;
		nodes: Node[];
		links: Link[];
	}

	export default defineComponent({

		name: 'Home',
		setup() {
			const currentNode: number = 0;
			const nodes: Node[] = [
				{ id: 1, name: 'my node 1' },
				{ id: 2, name: 'my node 2' },
				{ id: 3, name: 'my node 4', _color: 'orange' },
			];
			const links: Link[] = [
				{ sid: 1, tid: 2, _color: 'blue' },
				{ sid: 2, tid: 2, _color: 'f0f' },
				{ sid: 3, tid: 1, _color: 'rebeccapurple' },
			];

			let state = reactive<State>({
				nodes,
				links,
				currentNode
			});
			const maxId: any = computed(() => Math.max(...nodes.map((i) => i.id)) + 1);
			const newNode = reactive({id: null, name: '' , _color: null});
			const options = reactive({
					force: 3000,
					nodeSize: 20,
					nodeLabels: true,
					linkWidth: 5,
				})
			const onNodeClick = (event: any, NodeObject: INodeObject): void => {
				state.currentNode = NodeObject.index;
				console.log(NodeObject);
			};
			const onLinkClick = (event: any, LinkObject: ILinkObject): void => {
				console.log(LinkObject)
			};
			const addNodeWithLink = (): any => {
				let newNodeToAdd: Node = { id: maxId.value, name: newNode.name };
				links.push({ sid: maxId, tid: currentNode + 1, _color: 'white' });
				nodes.push(newNodeToAdd);
				console.log(nodes);
			};
			return {
				state,
				maxId,
				onNodeClick,
				onLinkClick,
				addNodeWithLink,
				newNode,
				options,
				NetworkGraph
			};
		},
	components: {
		NetworkGraph
	}
	});
</script>

<style lang="scss"></style>
