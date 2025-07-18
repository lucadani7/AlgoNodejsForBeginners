export class FibonacciAlgorithms {
    static fibo(value: bigint): bigint {
        const memo: Array<bigint | undefined> = new Array<bigint>(Number(value + 1n)).fill(undefined);
        return this.fiboMemo(value, memo);
    }

    static fiboMemo(value: bigint, memo: Array<bigint>): bigint {
        if (value === 0n || value === 1n) {
            return value;
        }
        if (memo[value] !== undefined) {
            return memo[value];
        }
        return this.fiboMemo(value - 2n, memo) + this.fiboMemo(value - 1n, memo);
    }

    static isFiboElem(value: bigint): boolean {
        if (value < 0n) {
            return false;
        }
        if (value === 0n || value === 1n) {
            return true;
        }
        const value1: bigint = 5 * value * value + 4;
        const sqrt1: bigint = this.sqrtBigInt(value1);
        const value2: bigint = 5 * value * value - 4;
        const sqrt2: bigint = this.sqrtBigInt(value2);
        return sqrt1 * sqrt1 === value1 || sqrt2 * sqrt2 === value2;
    }

    static sqrtBigInt(val: bigint): bigint {
        if (val < 0n) {
            throw new Error("Value must be 0n or greater!");
        }
        if (val < 2n) {
            return val;
        }
        let x: bigint = val;
        let y: bigint = (x + 1n) >> 1n;
        while (y < x) {
            x = y;
            y = (x + val / x) >> 1n;
        }
        return x;
    }
}