<template>
	<div>
		<div class="home">
			<NetworkGraph :nodes="nodes" :links="links" :options="options" :nodeClick="onNodeClick" />
		</div>

		<div style="border: 2px solid white; color: white;">
			Select a node to create a new connection.
			<hr />
			<h5>id: {{ this.maxId }}</h5>
			<h5>Link to {{this.currentNode }} </h5>
			<label for="name">
				Node Name:
				<input type="text" v-model="newNode.name" />
			</label>
			<button @click="addNodeWithLink">Add new node</button>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import NetworkGraph from '@/components/NetworkGraph.vue';
	import { INodeObject, Node, Link, Option } from '@/models/networkgraph';

	export default Vue.extend({
		name: 'Home',
		data() {
			const currentNode: number = 0;
			const nodes: Array<Node> = [{ id: 1, name: 'my node 1' }, { id: 2, name: 'my node 2' }, { id: 3, _color: 'orange' }];
			const links: Array<Link> = [
				{ sid: 1, tid: 2, _color: 'blue' },
				{ sid: 2, tid: 2, _color: 'f0f' },
				{ sid: 3, tid: 1, _color: 'rebeccapurple' }
			];
			return {
				nodes,
				links,
				currentNode,
				options: {
					force: 3000,
					nodeSize: 20,
					nodeLabels: true,
					linkWidth: 5,
				},
				newNode: {
					id: null,
					name: '',
					_color: null,
				}
			};
		},
		methods: {
			onNodeClick(event: any, NodeObject: INodeObject) {
				this.currentNode = NodeObject.index;
				console.log(NodeObject);
			},
			addNodeWithLink(): void {
				let newNode: Node = { id: this.maxId, name: this.newNode.name };
				this.links.push({ sid: this.maxId, tid: this.currentNode + 1, _color: 'white' });
				this.nodes.push(newNode);
				console.log(this.nodes);
			},
		},
		computed: {
			maxId(): number {
				return Math.max(...this.nodes.map((i) => i.id)) + 1;
			},
		},
		components: {
			NetworkGraph,
		},
	});
</script>

<style lang="scss"></style>
