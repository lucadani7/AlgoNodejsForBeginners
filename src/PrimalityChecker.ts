export class PrimalityChecker {
    static randomBase(start: bigint, end: bigint): bigint {
        const mini: bigint = BigInt(Math.min(Number(start), Number(end)));
        const maxi: bigint = BigInt(Math.max(Number(start), Number(end)));
        const range: bigint = maxi - mini + 1n;
        let bits: number = range.toString(2).length;
        let result: bigint;
        do {
            result = 0n;
            for (let i = 0; i < bits; ++i) {
                if (Math.random() < 0.5) {
                    result |= (1n << BigInt(i));
                }
            }
        } while (result >= range);
        return result + mini;
    }

    static fastExp(a: bigint, b: bigint, m: bigint): bigint {
        let result: bigint = 1n;
        for (; b !== 0n; b >>= 1n) {
            result = (b & 1n) > 0 ? ((result * a) % m) : result;
            a = (a * a) % m;
        }
        return result;
    }

    static millerRabinTest(d: bigint, value: bigint): boolean {
        let a: bigint = this.randomBase(2n, value - 2n);
        let x: bigint = this.fastExp(a, d, value);
        if (x === 1n || x === value - 1n) {
            return true;
        }
        while (d !== value - 1n) {
            x = (x * x) % value;
            d *= 2n;
            if (x === 1n) {
                return false;
            }
            if (x === value - 1n) {
                return true;
            }
        }
        return false;
    }

    static valueIsPrime(value: bigint, trialsCount: number): boolean {
        if (value < 4n) {
            return value > 1n;
        }
        let d: bigint = value - 1n;
        for (; d % 2 === 0n; d >>= 1n);
        for (let i = 0; i < trialsCount; ++i) {
            if (!this.millerRabinTest(d, value)) {
                return false;
            }
        }
        return true;
    }

    static nextPrime(value: bigint, trialsCount: number): bigint {
        do {
            value += 1n;
        } while (!this.valueIsPrime(value, trialsCount));
        return value;
    }

    static previousPrime(value: bigint, trialsCount: number): bigint | null {
        do {
            if (value <= 2n) {
                return null;
            }
            value -= 1n;
        } while (!this.valueIsPrime(value, trialsCount));
        return value;
    }
}