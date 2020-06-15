interface INodeObject {
    id: number;
    index: number;
    name: string;
    vx: number;
    vy: number;
    x: number;
    y: number
}

interface Node {
    id: number;
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


export { INodeObject, Node, Link, Option };