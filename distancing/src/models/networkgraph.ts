interface INodeObject {
    id: number;
    index?: number;
    name?: string;
    vx?: number;
    vy?: number;
    x?: number;
    y?: number
    sex?: string;
}



interface ILinkObject {
    id: string;
    index: number;
    source: LinkSource;
    target: TargetSource;
}

interface LinkSource {
    id: number;
    index: number;
    name: string;
    vx: number;
    vy: number;
    x: number;
    y: number;
}

interface TargetSource {
    id: number;
    index: number;
    name: string;
    fx: number;
    fy: number;
    x: number;
    y: number;
}
interface ISimpleLink {
    source: number;
    target: number;
}

interface Node {
    id: number;
    index?: number;
    name?: string;
    _color?: string;
    sex?: string;
}
interface Link {
    source: number;
    target: number;
}

interface State {
    currentNode: number;
    currentLink: number;
    shortId?: string;
    nodes: Node[];
    links: Link[];
    isNewNetwork: boolean
}


export { INodeObject, ILinkObject, Node, Link, State, ISimpleLink };