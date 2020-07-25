import { INodeObject, ILinkObject, Node, Link, ISimpleLink } from '@/models/networkgraph';
import { reactive, computed } from '@vue/composition-api';
import useState from '@/composables/useState';
import axios from 'axios';
import router from '@/router';
export default function () {

	const { state } = useState();

	const newNode = reactive({
		id: null,
		name: '',
		_color: null,
	});

	const onNodeClick = (NodeObject: INodeObject): void => {
		//s//tate.currentNode = NodeObject.index;
		console.log('node', NodeObject);
	};
	const onLinkClick = (LinkObject: ILinkObject): void => {
		//state.currentLink = LinkObject.index;
		console.log('linlk', LinkObject);
	};
	const addNodeWithLink = (): any => {
		
		let newNodeToAdd: INodeObject = {
			id: currentMaxId.value + 1,
			name: `node-${currentMaxId.value + 1}`,
		};
		state.nodes.push(newNodeToAdd);
		// let newNodeToAdd: Node = {
		// 	id: currentMaxId.value + 1,
		// 	name: newNode.name,
		// };
		// // let newLink: Link = {
		// // 	sid: currentMaxId.value + 1, //source/current ID
		// // 	tid: state.currentNode + 1, //target
		// // 	_color: 'red',
		// // };
		// state.nodes.push(newNodeToAdd);
		// //state.links.push(newLink);

		// console.log(newNodeToAdd);
	};


	const addLink = () => {
		const link: ISimpleLink = {
			source: currentMaxIdx.value - 1,
			target: currentMaxIdx.value,
		};
		state.links.push(link);
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
			let update = {
				networkName: "",
				schema: datum
			}
			await axios.put(`${process.env.VUE_APP_API_BASEURL}/Network/${state.shortId}`, update)
				.then((res) => console.log("updated", res))
				.catch(err => console.log(err))
		}
	};

	const get = async (networkId: string) => {
		return await axios.get(`${process.env.VUE_APP_API_BASEURL}/Network?shortId=${networkId}`)
			.then((res) => {
				let formattedLinks: Link[] =[];
				state.shortId = router.history.current.params.networkId;
				let schema = JSON.parse(res.data.schema)
				schema.links.forEach(element => {
					var x: ISimpleLink = { source: element.source.id, target: element.target.id };
					formattedLinks.push(x)
				});
				state.links = formattedLinks;
				state.nodes = schema.nodes;
				return res.data
			})
			.catch((err) => console.log(err));
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
			name: `node-${currentMaxId.value + 1}`,
		};
		state.nodes.push(newNodeToAdd);
	};

	return {
		state,
		addLink,
		currentMaxId,
		onNodeClick,
		onLinkClick,
		addNodeWithLink,
		newNode,
		get,
		save
	};
}
