import { INodeObject, ILinkObject, Node, Link, Option, State } from '@/models/networkgraph';
import { reactive, computed } from '@vue/composition-api';
import useState from '@/composables/useState';
import axios from 'axios';

export default function () {

	const { state } = useState();


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
		let path = window.location.pathname
		let route: string = '';
		await axios
			.post(`${process.env.VUE_APP_API_BASEURL}/Network`, datum)
			.then((res) => {
				route = res.data.shortId;
				state.isNewNetwork = false;

			})
			.catch((err) => console.log(err));
		history.pushState(path, 'new', route)
	};


	const get = async (networkId: string) => {
		return await axios.get(`${process.env.VUE_APP_API_BASEURL}/Network?shortId=${networkId}`)
			.then((res) => {
				let schema = JSON.parse(res.data.schema)
				console.log(schema)
				console.log(state)
				state.nodes = schema.Nodes;
				state.links = schema.Links;
				return res.data
			})
			.catch((err) => console.log(err));
	}
	return {
		state,
		currentMaxId,
		onNodeClick,
		onLinkClick,
		addNodeWithLink,
		newNode,
		options,
		get,
		save
	};
}
