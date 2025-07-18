export class AtomicIntegerNode {
    private readonly buffer: SharedArrayBuffer;
    private readonly view;

    constructor(initial: bigint = 0n) {
        this.buffer = new SharedArrayBuffer(4); // 4 bytes for Int32
        this.view = new Int32Array(this.buffer);
        Atomics.store(this.view, 0, initial);
    }

    getBuffer(): SharedArrayBuffer {
        return this.buffer;
    }

    get(): bigint {
        return BigInt(Atomics.load(this.view, 0));
    }

    set(value: bigint): void {
        Atomics.store(this.view, 0, value);
    }

    incrementAndGet(): bigint {
        return BigInt(Atomics.add(this.view, 0, 1));
    }

    getAndIncrement(): bigint {
        return BigInt(Atomics.add(this.view, 0, 1) - 1);
    }

    compareAndSet(expected: bigint, updated: bigint): boolean {
        return Atomics.compareExchange(this.view, 0, expected, updated) === expected;
    }
}