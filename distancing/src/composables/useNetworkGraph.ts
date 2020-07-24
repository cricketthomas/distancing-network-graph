import { INodeObject, ILinkObject, Node, Link, Option, State } from '@/models/networkgraph';
import { reactive, computed } from '@vue/composition-api';
import useState from '@/composables/useState';
import axios from 'axios';
import router from '@/router';
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



	const save = async (shortId?: string ) => {
		let datum: any = {
			nodes: state.nodes,
			links: state.links,
		};
		console.log(JSON.stringify(datum))
		if (!state.shortId && state.isNewNetwork) {
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
		} else {
			await axios.put(`${process.env.VUE_APP_API_BASEURL}/Network/${state.shortId}`, datum)
				.then((res) => console.log("updated", res))
				.catch(err => console.log(err))
		}
	};
	interface ISimpleLink {
		source: number;
		target: number;
	}
	const get = async (networkId: string) => {
		return await axios.get(`${process.env.VUE_APP_API_BASEURL}/Network?shortId=${networkId}`)
			.then((res) => {
				let formattedLinks: Link[] =[];
				state.shortId = router.history.current.params.networkId;
				let schema = JSON.parse(res.data.schema)
				state.links = schema.links;
				state.nodes = schema.nodes;
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
