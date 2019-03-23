const Node = require('./node');

class MaxHeap {
    constructor() {
        this.currentSize = 0;
        this.root = null;
        this.parentNodes = [];
    }

    push(data, priority) {
        const node = new Node(data, priority);
        this.insertNode(node);
        this.shiftNodeUp(node);
        this.currentSize++;
    }

    pop() {
        this.currentSize--;
    }

    detachRoot() {

	}

    restoreRootFromLastInsertedNode(detached) {

	}

    size() {
        return this.currentSize;
    }

    isEmpty() {
		return !this.currentSize
	}

    clear() {
        this.root = null;
        this.parentNodes = [];
        this.currentSize = 0;
    }

    insertNode(node) {
        if (!this.root) {
            this.root = node;
        }
    }

    shiftNodeUp(node) {}

    shiftNodeDown(node) {}
}
module.exports = MaxHeap;
