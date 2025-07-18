export class NodeClass<T> {
    item: T; // information node
    link: NodeClass<T> | null; // link to next node

    constructor(item: T, link: NodeClass<T> | null) {
        this.item = item;
        this.link = link;
    }
}