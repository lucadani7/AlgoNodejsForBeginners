import {NodeClass} from "./NodeClass";

export class LinkedList<T> {
    private head: NodeClass<T> | null = null;
    private tail: NodeClass<T> | null = null;
    private count: number = 0;

    addFirst(data: T): void {
        const node: NodeClass<T> = new NodeClass<T>(data, this.head);
        this.head = node;
        if (!this.tail) {
            this.tail = node;
        }
        ++this.count;
    }

    addLast(data: T): void {
        const node: NodeClass<T> = new NodeClass<T>(data, null);
        if (!this.head) {
            this.head = this.tail = node;
        } else {
            this.tail!.link = node;
            this.tail = node;
        }
        ++this.count;
    }

    insertAt(data: T, position: number): void {
        if (position < 0 || position > this.count) {
            throw new RangeError("Index out of bounds!");
        }
        if (position === 0) {
            this.addFirst(data);
            return;
        }
        if (position === this.count) {
            this.addLast(data);
            return;
        }
        let current: NodeClass<T> = this.head!;
        for (let i = 0; i < position - 1; current = current.link!, ++i);
        current.link = new NodeClass<T>(data, current.link);
        ++this.count;
    }

    remove(data: T): boolean {
        if (!this.head) {
            return false;
        }
        if (this.head.item === data) {
            this.head = this.head.link;
            if (!this.head) {
                this.tail = null;
            }
            --this.count;
            return true;
        }
        let current: NodeClass<T> = this.head;
        while (current.link && current.link.item !== data) {
            current = current.link;
        }
        if (current.link !== null) {
            if (current.link === this.tail) {
                this.tail = current;
            }
            current.link = current.link.link;
            --this.count;
            return true;
        }
        return false;
    }

    reverse(): void {
        let previous: NodeClass<T> | null = null;
        let current: NodeClass<T> = this.head;
        this.tail = this.head;
        while (current) {
            const next: NodeClass<T> = current.link;
            current.link = previous;
            previous = current;
            current = next;
        }
        this.head = previous;
    }

    contains(data: T): boolean {
        for (let node = this.head; node !== null; node = node.link) {
            if (data === node.item) {
                return true;
            }
        }
        return false;
    }

    get(position: number): T {
        if (position < 0 || position >= this.count) {
            throw new RangeError("Index out of bounds!");
        }
        let node: NodeClass<T> = this.head!;
        for (let i = 0; i < position; node = node.link!, ++i);
        return node.item;
    }

    toArray(): T[] {
        const result: T[] = [];
        for (let node = this.head; node !== null; result.push(node.item), node = node.link);
        return result;
    }

    fromArray<U>(arr: U[]): LinkedList<U> {
        const list: LinkedList<U> = new LinkedList<U>();
        for (const item of arr) {
            list.addLast(item);
        }
        return list;
    }

    toString(): string {
        return this.toArray().join(" -> ");
    }

    clone(): LinkedList<T> {
        const copy: LinkedList<T> = new LinkedList<T>();
        for (const item of this) {
            copy.addLast(item);
        }
        return copy;
    }

    equals(other: LinkedList<T>): boolean {
        if (this.count !== other.count) {
            return false;
        }
        const a: T[] = this.toArray();
        const b: T[] = other.toArray();
        return a.every((val, i) => val === b[i]);
    }

    existsCertainValue(value: T, compareFn?: (a: T, b: T) => boolean): boolean {
        const cmp = compareFn ?? ((a, b) => a === b);
        return this.toArray().some(x => cmp(x, value));
    }

    getFrequencyRecord(): Record<string, number> {
        const freq: Record<string, number> = {};
        for (const val of this) {
            const key: string = String(val);
            freq[key] = (freq[key] ?? 0) + 1;
        }
        return freq;
    }

    clear(): void {
        this.head = this.tail = null;
        this.count = 0;
    }

    size(): number {
        return this.count;
    }
}