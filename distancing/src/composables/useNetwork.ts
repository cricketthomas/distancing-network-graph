import { INodeObject, ILinkObject, Node, Link, Option } from '@/models/networkgraph';
import { reactive, computed } from '@vue/composition-api';
import axios from 'axios';
export default function() {
	interface State {
		currentNode: number;
		currentLink: number;
		nodes: Node[];
		links: Link[];
	}

	const currentNode: number = 0;
	const currentLink: number = 0;
	const nodes: Node[] = [
		{
			id: 1,
			name: 'my node 1',
		},
		{
			id: 2,
			name: 'my node 2',
		},
		{
			id: 3,
			name: 'my node 3',
			_color: 'orange',
		},
	];
	const links: Link[] = [
		{
			sid: 1,
			tid: 2,
			_color: 'blue',
		},
		{
			sid: 2,
			tid: 2,
			_color: 'f0f',
		},
		{
			sid: 3,
			tid: 1,
			_color: 'rebeccapurple',
		},
	];

	let state = reactive<State>({
		nodes,
		links,
		currentNode,
		currentLink,
	});
	const currentMaxId: any = computed(() => { 
		// let nodeArray: INodeObject[] = [...state.nodes]
		// return Math.max(...nodeArray.map(n => n.index));
		return state.nodes.length;
	});
	const newNode = reactive({
		id: null,
		name: '',
		_color: null,
	});
	const options = reactive({
		force: 3000,
		nodeSize: 20,
		nodeLabels: true,
		linkWidth: 5,
	});
	const onNodeClick = (event: any, NodeObject: INodeObject): void => {
		state.currentNode = NodeObject.index;
		console.log(NodeObject);
	};
	const onLinkClick = (event: any, LinkObject: ILinkObject): void => {
		state.currentLink = LinkObject.index;
		console.log(LinkObject);
	};
	const addNodeWithLink = (): any => {
		let newNodeToAdd: Node = {
			id: currentMaxId.value + 1,
			name: newNode.name,
		};
		let newLink: Link = {
			sid: currentMaxId.value + 1, //source/current ID
			tid: state.currentNode + 1, //target
			_color: 'red',
		};
		state.nodes.push(newNodeToAdd);
		state.links.push(newLink);

		console.log(newNodeToAdd);
	};

	const save = async () => {
		let datum: any = {
			nodes: state.nodes,
			links: state.links,
		};
		const res = await axios
			.post(`${process.env.VUE_APP_BASEURL}/Network`, datum)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	const get = async (networkId: string) => {
		
	}

	return {
		state,
		currentMaxId,
		onNodeClick,
		onLinkClick,
		addNodeWithLink,
		newNode,
		options,
		save
	};
}
