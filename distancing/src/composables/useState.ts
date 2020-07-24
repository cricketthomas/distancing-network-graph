import { reactive, ref  } from '@vue/composition-api';
import { INodeObject, ILinkObject, Node, Link, Option, State } from '@/models/networkgraph';

export default function () {

    const currentNode: number = 0;
    const currentLink: number = 0;
    //const nodes: Node[] = [];
    //const links: Link[] = [];


    const nodes: Node[] = [
        { id: 0, name: 'Finkler', sex: 'F' },
        { id: 1, name: 'Peter', sex: 'M' },
        { id: 2, name: 'Ashley', sex: 'F' },
        { id: 3, name: 'Cricket', sex: 'M' },
    ];
      const links: Link[] = [
            { source: 0, target: 2 },
            { source: 1, target: 0 },
        ]


    let isNewNetwork = false;
    
    let state = reactive<State>({
        nodes,
        links,
        currentNode,
        currentLink,
        isNewNetwork
    });

    return { state };
}
