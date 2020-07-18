interface INodeObject {
    id: number;
    index: number;
    name?: string;
    vx?: number;
    vy?: number;
    x?: number;
    y?: number
    _color?: string;
}



interface ILinkObject {
    id: string;
    index: number;
    sid: number;
    tid: number;
    _color: string;
    source: LinkSource;
    target: TargetSource;
}

interface LinkSource {
    id: string;
    index: number;
    name: string;
    vx: number;
    vy: number;
    x: number;
    y: number;
}

interface TargetSource {
    id: string;
    index: number;
    name: string;
    fx: number;
    fy: number;
    x: number;
    y: number;
}

interface Node {
    id: number;
    index?: number;
    name?: string;
    _color?: string;
}
interface Link {
    sid: number;
    tid: number;
    _color?: string;
}
interface Option {
    force: number;
    nodeSize: number;
    nodeLabels: boolean;
    linkWidth: number;
}
interface State {
    currentNode: number;
    currentLink: number;
    nodes: Node[];
    links: Link[];
    isNewNetwork: boolean
}


export { INodeObject, ILinkObject, Node, Link, Option, State };