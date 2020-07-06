import { reactive  } from '@vue/composition-api';
import { INodeObject, ILinkObject, Node, Link, Option, State } from '@/models/networkgraph';

export default function () {

    const currentNode: number = 0;
    const currentLink: number = 0;
    const nodes: Node[] = [];
    const links: Link[] = [];

    let state = reactive<State>({
        nodes,
        links,
        currentNode,
        currentLink,
    });

    return {
        state
    };
}
