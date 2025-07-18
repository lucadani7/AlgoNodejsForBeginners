import {AtomicIntegerNode} from "./AtomicIntegerNode";
import {BezoutTuple} from "./BezoutTuple";
import {Congruence} from "./Congruence";

export class EuclidClass {

    static gcd(a: bigint, b: bigint): bigint {
        return b === 0n ? a : this.gcd(b, a % b);
    }

    static lcm(a: bigint, b: bigint): bigint {
        return (a * b) / this.gcd(a, b);
    }

    static gcdExtended(a: bigint, b: bigint): BezoutTuple {
        if (b === 0n) {
            return [a, new AtomicIntegerNode(1n), new AtomicIntegerNode(0n)];
        }
        const [dPrev, xPrev, yPrev] = this.gcdExtended(b, a % b);
        const x: AtomicIntegerNode = new AtomicIntegerNode(yPrev.get());
        const y: AtomicIntegerNode = new AtomicIntegerNode(xPrev.get() - (a / b) * yPrev.get());
        return [dPrev, x, y];
    }

    static modularInverse(a: bigint, m: bigint): bigint | null {
        const [gcd, x, _] = this.gcdExtended(a, m);
        return gcd !== 1n ? null : ((x.get() % m) + m) % m; // x.get() % m might be negative
    }

    static chineseRemainderTheorem(pairs: Congruence[]): bigint | null {
        const modulo: bigint = BigInt(pairs.reduce((acc, curr) => acc * curr.m, 1)); // modules product
        let x: bigint = 0n;
        for (const { a, m } of pairs) {
            const mi: bigint = modulo / m;
            const inv: bigint | null = this.modularInverse(mi, BigInt(m));
            if (inv === null) {
                return null;
            }
            x += a * mi * inv;
        }
        return ((x % modulo) + modulo) % modulo;
    }

    static solveLinearDiophantine(a: bigint, b: bigint, c: bigint): [bigint, bigint] | null {
        const [d, x0, y0] = this.gcdExtended(a, b);
        if (c % d !== 0n) {
            return null;
        }
        const multiplier: bigint = c / d;
        const x: bigint = x0.get() * multiplier;
        const y: bigint = y0.get() * multiplier;
        return [x, y];
    }

    static phiInterval(value: bigint, start: bigint, end: bigint): bigint[] {
        const startValue: bigint = BigInt(Math.min(Number(start), Number(end)));
        let endValue: bigint = BigInt(Math.max(Number(start), Number(end)));
        if (value === endValue) {
            --endValue;
        }
        const values: bigint[] = [];
        for (let i = startValue; i <= endValue; ++i) {
            if (this.modularInverse(i, value) !== null) {
                values.push(i);
            }
        }
        return values;
    }

    static phi(value: bigint): number {
        return this.phiInterval(value, 1n, value - 1n).length;
    }
}