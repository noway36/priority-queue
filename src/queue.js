const MaxHeap = require('./max-heap.js');

class PriorityQueue {
    constructor(maxSize) {
        this.maxSize = maxSize || 30;
        this.heap = new MaxHeap();
    }

    push(data, priority) {
        if (this.heap.currentSize >= this.maxSize) throw new Error();
        this.heap.push(data, priority);
    }

    shift() {
		this.heap.pop();
	}

    size() {
		return this.heap.size();
	}

    isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
