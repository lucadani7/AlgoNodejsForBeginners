export class DivisorsClass {
    static isDivisibleWithCertainValue(value1: bigint, value2: bigint): boolean {
        return value1 % value2 === 0n;
    }

    static isEven(value: bigint): boolean {
        return this.isDivisibleWithCertainValue(value, 2n);
    }

    static getDivisorsOfCertainValue(value: bigint): Array<bigint> {
        const divisorsArray: Array<bigint> = [];
        for (let i = 1n; i * i <= value; i += 1n) {
            if (this.isDivisibleWithCertainValue(value, i)) {
                divisorsArray.push(i);
                let j: bigint = value / i;
                if (i !== j) {
                    divisorsArray.push(j);
                }
            }
        }
        return divisorsArray.sort((a, b) => (a < b ? -1 : 1));
    }

    static countDivisorsOfCertainValue(value: bigint): number {
        return this.getDivisorsOfCertainValue(value).length;
    }

    static getDivisorsSumOfCertainValue(value: bigint): bigint {
        let sum: bigint = 0n;
        for (let divisor of this.getDivisorsOfCertainValue(value)) {
            sum += divisor;
        }
        return sum;
    }

    static factorizeCertainValue(value: bigint): Map<bigint, bigint> {
        const factors: Map<bigint, bigint> = new Map<bigint, bigint>();
        let div2: bigint = 0n;
        while (this.isEven(value)) {
            ++div2;
            value /= 2n;
        }
        if (div2 > 0n) {
            factors.set(2n, div2);
        }
        for (let i = 3n; i * i <= value; i += 2n) {
            let count: bigint = 0n;
            while (this.isDivisibleWithCertainValue(value, i)) {
                ++count;
                value /= i;
            }
            if (count > 0n) {
                factors.set(i, count);
            }
        }
        if (value > 1n) {
            factors.set(value, 1n);
        }
        return factors;
    }
}