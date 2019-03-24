class Node {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
        this.parent = null;
        this.left = null;
        this.right = null;
    }

    appendChild(node) {
        if (!this.left) {
            this.left = node;
            node.parent = this;
        } else if (!this.right) {
            this.right = node;
            node.parent = this;
        }
        return;
    }

    removeChild(node) {
        if (this.left === node) {
            this.left.parent = null;
            this.left = null;
        } else if (this.right === node) {
            this.right.parent = null;
            this.right = null;
        } else throw new Error('Error: node is not a child of this node');
    }

    remove() {
        if (this.parent === null) {
            return;
        }
        this.parent.removeChild(this);
    }

    swapWithParent() {
        let container;

        if (this.parent === null) {
            return;
        }

        if (this.parent) {
            if (this.left) {
                this.left.parent = this.parent;
            }
            if (this.right) {
                this.right.parent = this.parent;
            }
            if (this.parent.left === this) {
                if (this.parent.right) {
                    this.parent.right.parent = this;
                }
                container = this.left;
                this.left = this.parent;
                this.parent.left = container;

                container = this.right;
                this.right = this.parent.right;
                this.parent.right = container;
            } else if (this.parent.right === this) {
                if (this.parent.left) {
                    this.parent.left.parent = this;
                }
                container = this.left;
                this.left = this.parent.left;
                this.parent.left = container;

                container = this.right;
                this.right = this.parent;
                this.parent.right = container;
            }

            if (this.parent.parent) {
                if (this.parent === this.parent.parent.left) {
                    this.parent.parent.left = this;
                } else {
                    this.parent.parent.right = this;
                }
            }

            container = this.parent.parent;
            this.parent.parent = this;
            this.parent = container;
        }
    }
}

module.exports = Node;
