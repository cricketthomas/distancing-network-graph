import { INodeObject, ILinkObject, Node, Link, ISimpleLink, State } from '@/models/networkgraph';
import { reactive, computed, ref, isReactive, toRefs} from 'vue';
import useState from '@/composables/useState';
import axios from 'axios';
import router from '@/router';
export default function () {

	const { nodes,links, shortId, currentNode, currentLink, isNewNetwork } = useState();

	let state = reactive<State>({
		nodes,
		links,
		shortId,
		currentNode,
		currentLink,
		isNewNetwork
	});

	const _new = reactive({
		nodeName: null,
		linkType: 'to',
		linkFrom: { name: null, index: null},
		linkTo: { name: null, index: null },
	});


	const onNodeClick = (NodeObject: INodeObject): void => {
		if (_new.linkType == 'from') {
			_new.linkFrom = { name: NodeObject.name, index: NodeObject.id }
				//NodeObject.name != _new.linkTo ? NodeObject.name : alert("invalid link");
			return;
		}
		_new.linkTo = { name: NodeObject.name, index: NodeObject.id }
			//NodeObject.name != _new.linkFrom ? NodeObject.name : alert("invalid link");
	};
	const addLink = () => {
		const link: ISimpleLink = {
			source: _new.linkFrom.index ?? currentMaxIdx.value - 1,
			target: _new.linkTo.index ?? currentMaxIdx.value
		};
		state.links.push(link);
	};

	const addNewNode = (): any => {
		let newNodeToAdd: INodeObject = {
			id: currentMaxId.value + 1,
			name: _new.nodeName == null || _new.nodeName == "" ? `node-${currentMaxId.value + 1}` : _new.nodeName 
		};
		state.nodes.push(newNodeToAdd);
	};


	const save = async (shortId?: string) => {
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
				let formattedLinks: Link[] = [];
				state.shortId = router.currentRoute.value.params.networkId;
				let schema = JSON.parse(res.data.schema)
				schema.links.forEach((element: ILinkObject) => {
					var link: ISimpleLink = { source: element.source.id, target: element.target.id };
					formattedLinks.push(link)
				});
				state.links = formattedLinks;
				state.nodes = schema.nodes;
				return res.data
			})
			.catch((err) => console.log(err));
	}

	const currentMaxId: any = computed(() => {
		if (state.nodes.length === 0) return 0;
		let nodeArray: INodeObject[] = [...state.nodes];
		return Math.max(...nodeArray.map((n) => n.id));
	});
	const currentMaxIdx: any = computed(() => {
		let nodeArray: any[] = [...state.nodes];
		return Math.max(...nodeArray.map((n) => n.index));
	});


	return {
		state,
		addLink,
		currentMaxId,
		onNodeClick,
		addNewNode,
		_new,
		get,
		save
	};
}
