export default class LinkedList {
    constructor(head) {
        this.head = head
        this.end = head
    }

    addNode(node) {

        this.end.LinkTo(node)
        this.end = node

    }
}