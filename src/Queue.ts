import {NodeClass} from "./NodeClass";
import {QueueException} from "./QueueException";

export class Queue<T> {
    private front: NodeClass<T> | null = null;
    private rear: NodeClass<T> | null = null;
    private count: number = 0;
    private readonly capacity: number;

    constructor(capacity: number = Infinity) {
        this.capacity = capacity;
    }

    enqueue(item: T): void {
        if (this.queueIsFull()) {
            throw new QueueException("The queue is full!");
        }
        const node: NodeClass<T> = new NodeClass(item, this.front);
        if (this.rear === null) {
            this.front = this.rear = node;
        } else {
            this.rear.link = node;
            this.rear = node;
        }
        ++this.count;
    }

    dequeue(): T {
        if (this.queueIsEmpty()) {
            throw new QueueException("The queue is empty!");
        }
        const value: T = this.front!.item;
        this.front = this.front!.link;
        if (this.front === null) {
            this.rear = null;
        }
        --this.count;
        return value;
    }

    peek(): T {
        if (this.queueIsEmpty()) {
            throw new QueueException("The queue is empty!");
        }
        return this.front!.item;
    }

    poll(): T {
        const elem: T = this.peek();
        this.dequeue();
        return elem;
    }

    queueIsEmpty(): boolean {
        return this.front === null;
    }

    queueIsFull(): boolean {
        return this.count >= this.capacity;
    }

    size(): number {
        return this.count;
    }

    clone(): Queue<T> {
        const queueClone: Queue<T> = new Queue<T>(this.capacity);
        for (let node = this.front; node !== null; queueClone.enqueue(node.item), node = node.link);
        return queueClone;
    }

    equals(otherQueue: Queue<T>): boolean {
        if (this.size() !== otherQueue.size()) {
            return false;
        }
        const cloneA: Queue<T> = this.clone();
        const cloneB: Queue<T> = otherQueue.clone();
        while (!cloneA.queueIsEmpty() && !cloneB.queueIsEmpty()) {
            if (cloneA.poll() !== cloneB.poll()) {
                return false;
            }
        }
        return true;
    }

    clear(): void {
        this.front = null;
        this.rear = null;
        this.count = 0;
    }

    toArray(): T[] {
        const result: T[] = [];
        for (let node = this.front; node !== null; result.push(node.item), node = node.link);
        return result;
    }

    toArrayReversed(): T[] {
        return this.toArray().reverse();
    }

    fromArray<U>(arr: U[], preserveOrder: boolean = true, capacity: number = Infinity): Queue<U> {
        const queue: Queue<U> = new Queue<U>(capacity);
        const src: U[] = preserveOrder ? arr : [...arr].reverse();
        for (const elem of src) {
            queue.enqueue(elem);
        }
        return queue;
    }

    existsCertainValue(valueToSearch: T, compareFn?: (a: T, b: T) => boolean): boolean {
        const comparer = compareFn ?? ((a, b) => a === b);
        return this.toArray().some(elem => comparer(elem, valueToSearch));
    }

    getFrequencyRecord(): Record<string, number> {
        const freq: Record<string, number> = {};
        for (let node = this.front; node !== null; node = node.link) {
            const key = String(node.item);
            freq[key] = (freq[key] ?? 0) + 1;
        }
        return freq;
    }

    toString(): string {
        return this.toArray().map(x => x.toString()).join("");
    }
}
