import { reactive, ref } from '@vue/composition-api';
import { INodeObject, ILinkObject, Node, Link, Option, State } from '@/models/networkgraph';

export default function () {

    const currentNode: number = 0;
    const currentLink: number = 0;
   
    const shortId: any = null;
    const nodes: Node[] = [];
    const links: Link[] = [];
    //  const nodes: Node[] = [
    //      { id: 0, name: 'Finkler', sex: 'F' },
    // //     { id: 1, name: 'Peter', sex: 'M' },
    // //     { id: 2, name: 'Ashley', sex: 'F' },
    // //     { id: 3, name: 'Cricket', sex: 'M' },
    // //     { id: 4, name: 'Paige', sex: 'F' },
    // //     { id: 5, name: 'Sydnye', sex: 'F' },


    //  ];
    // const links: Link[] = [
    //     { source: 0, target: 2 },
    //     { source: 1, target: 0 },
    //     { source: 1, target: 3 },
    //     { source: 3, target: 4 },
    //     { source: 3, target: 5 },

    // ]


    let isNewNetwork = false;

    let state = reactive<State>({
        nodes,
        links,
        shortId,
        currentNode,
        currentLink,
        isNewNetwork
    });

    return { state };
}
