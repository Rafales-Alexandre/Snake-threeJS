export default class ListNode {
    next = null
    prev = null
    constructor(data) {
        this.data = data
    }

    LinkTo(node) {
        this.next = node
        node.prev = this
    }
}