import {NodeClass} from "./NodeClass";
import {StackException} from "./StackException";

export class Stack<T> {
    private top: NodeClass<T> | null = null;
    private count: number = 0;
    private readonly capacity: number;

    constructor(capacity: number = Infinity) {
        this.capacity = capacity;
    }

    push(item: T): void {
        if (this.stackIsFull()) {
            throw new StackException("The stack is full!");
        }
        this.top = new NodeClass(item, this.top);
        ++this.count;
    }

    stackIsEmpty(): boolean {
        return this.top === null;
    }

    stackIsFull(): boolean {
        return this.count >= this.capacity
    }

    pop(): void {
        if (this.stackIsEmpty()) {
            throw new StackException("The stack is empty!");
        }
        --this.count;
        this.top = this.top.link;
    }

    peek(): T {
        if (this.stackIsEmpty()) {
            throw new StackException("The stack is empty!");
        }
        return this.top!.item;
    }

    poll(): T {
        const elem: T = this.peek();
        this.pop();
        return elem;
    }

    size(): number {
        return this.count;
    }

    reverse(): void {
        let previous: NodeClass<T> | null = null;
        let current: NodeClass<T> | null = this.top;
        while (current !== null) {
            const next: NodeClass<T> | null = current.link;
            current.link = previous;
            previous = current;
            current = next;
        }
        this.top = previous;
    }

    toArray(): T[] {
        const result: T[] = [];
        for (let node = this.top; node !== null; result.push(node.item), node = node.link);
        return result;
    }

    toArrayReversed(): T[] {
        return this.toArray().reverse();
    }

    fromArray<U>(arr: U[], preserveOrder: boolean = false, capacity: number = Infinity): Stack<U> {
        const stack: Stack<U> = new Stack<U>(capacity);
        const src: U[] = preserveOrder ? [...arr].reverse() : arr;
        for (let elem of src) {
            stack.push(elem);
        }
        return stack;
    }

    clone(): Stack<T> {
        const stackClone: Stack<T> = new Stack<T>(this.capacity);
        for (let node = this.top; node !== null; stackClone.push(node.item), node = node.link);
        stackClone.reverse();
        return stackClone;
    }

    equals(otherStack: Stack<T>): boolean {
        if (this.size() !== otherStack.size()) {
            return false;
        }
        const cloneA: Stack<T> = this.clone();
        const cloneB: Stack<T> = otherStack.clone();
        while (!cloneA.stackIsEmpty() && !cloneB.stackIsEmpty()) {
            if (cloneA.poll() !== cloneB.poll()) {
                return false;
            }
        }
        return true;
    }

    existsCertainValue(valueToSearch: T, compareFn?: (a: T, b: T) => boolean): boolean {
        const comparer = compareFn ?? ((a, b) => a === b);
        return this.toArray().some(elem => comparer(elem, valueToSearch));
    }

    getFrequencyRecord(): Record<string, number> {
        const freq: Record<string, number> = {};
        for (let node = this.top; node !== null; node = node.link) {
            const key = String(node.item);
            freq[key] = (freq[key] ?? 0) + 1;
        }
        return freq;
    }

    toString(): string {
        let sb: string[] = [];
        for (let node = this.top; node !== null; node = node.link) {
            sb.push(node.item.toString());
            sb.push(" ");
        }
        return sb.join("").trim();
    }

    clear(): void {
        this.top = null;
        this.count = 0;
    }
}