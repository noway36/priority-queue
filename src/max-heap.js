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
        if (!this.root) return;
        const data = this.root.data;
        this.currentSize--;
        this.restoreRootFromLastInsertedNode(this.detachRoot());
        if (this.root) {
            this.shiftNodeDown(this.root);
        }
        return data;
    }

    detachRoot() {
        let detached = this.root;
        if (this.parentNodes.indexOf(detached) + 1) {
            this.parentNodes.splice(this.parentNodes.indexOf(detached), 1);
        }
        this.root = null;
        return detached;
    }

    restoreRootFromLastInsertedNode(detached) {
        const lastInsertedNode = this.parentNodes.pop();

        if (lastInsertedNode && detached) {
            if (
                lastInsertedNode.parent &&
                lastInsertedNode.parent !== detached &&
                lastInsertedNode.parent.right === lastInsertedNode
            ) {
                this.parentNodes.unshift(lastInsertedNode.parent);
            }
            if (lastInsertedNode.parent) {
                lastInsertedNode.parent.removeChild(lastInsertedNode);
            }
            lastInsertedNode.left = detached.left;
            lastInsertedNode.right = detached.right;
            if (lastInsertedNode.left) {
                lastInsertedNode.left.parent = lastInsertedNode;
            }
            if (lastInsertedNode.right) {
                lastInsertedNode.right.parent = lastInsertedNode;
            }
            if (!detached.left || !detached.right) {
                this.parentNodes.unshift(lastInsertedNode);
            }
            this.root = lastInsertedNode;
        }
    }

    size() {
        return this.currentSize;
    }

    isEmpty() {
        return !this.currentSize;
    }

    clear() {
        this.root = null;
        this.parentNodes.length = 0;
        this.currentSize = 0;
    }

    insertNode(node) {
        if (!this.root) {
            this.root = node;
            this.parentNodes.push(node);
            return;
        }
        this.parentNodes[0].appendChild(node);
        this.parentNodes.push(node);
        if (this.parentNodes[0].right) {
            this.parentNodes.shift();
        }
    }

    shiftNodeUp(node) {
        if (node.parent && node.parent.priority < node.priority) {
			if (node.parent === this.root) {
				this.root = node;
			}
            const currentNode = this.parentNodes.indexOf(node);
            const parentNode = this.parentNodes.indexOf(node.parent);
                if (currentNode !== -1 && parentNode !== -1) {
                    this.parentNodes[currentNode] = node.parent;
                    this.parentNodes[parentNode] = node;
                } else {
                    this.parentNodes[currentNode] = node.parent;
                }
            node.swapWithParent();
            this.shiftNodeUp(node);
        }
    }

    shiftNodeDown(node) {
        if (
            (node.left || node.right) &&
            (node.priority < node.left.priority || (node.right && node.priority < node.right.priority))
        ) {
            let shiftNode;
            if (!node.right && node.left.priority > node.priority) {
                shiftNode = node.left;
				this.parentNodes.pop();
				this.parentNodes.push(node);
                this.parentNodes.shift();
                this.parentNodes.unshift(shiftNode);
            } else {
                if (node.left.priority > node.right.priority) {
                    shiftNode = node.left;
                } else {
                    shiftNode = node.right;
                }
                if (!shiftNode.right) {
                    let shiftNodeIndex = this.parentNodes.indexOf(shiftNode);
                    this.parentNodes.splice(shiftNodeIndex, 1);
                    this.parentNodes.splice(shiftNodeIndex, 0, node);
                }
            }
            if (this.root === node) {
                this.root = shiftNode;
            }
            shiftNode.swapWithParent();
            this.shiftNodeDown(node);
        }
    }
}
module.exports = MaxHeap;
