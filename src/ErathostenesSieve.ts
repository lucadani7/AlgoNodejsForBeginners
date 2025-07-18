export class ErathostenesSieve {
    static deleteElemFromSieve(ourList: Array<number>, value: number): void {
        ourList[value >> 3] &= ~(1 << (value & 7));
    }

    static checkElemFromSieve(ourList: Array<number>, value: number): boolean {
        return (ourList[value >> 3] & (1 << (value & 7))) !== 0
    }

    static primesGenerator(value: number): Array<number> {
        let primesArray: Array<number> = new Array<number>();
        primesArray.push(2);
        const dim: number = Math.floor(value / 16) + 1;
        let ourList: Array<number> = new Array<number>(dim);
        ourList.fill(0xFF, 0, dim);
        for (let i = 1; ((i * i) << 1) + (i << 1) <= value; ++i) {
            // if 2 * i + 1 is prime
            if (this.checkElemFromSieve(ourList, i)) {
                for (let j = ((i * i) << 1) + (i << 1); (j << 1) + 1 <= value; j += (i << 1) + 1) {
                    this.deleteElemFromSieve(ourList, j); // delete multiples of 2 * i + 1
                }
            }
        }
        for (let i = 1; (i << 1) + 1 <= value; ++i) {
            if (this.checkElemFromSieve(ourList, i)) {
                primesArray.push((i << 1) + 1);
            }
        }
        return primesArray;
    }

    static erathostenesIntervalGenerator(start: number, end: number): Array<number> {
        const startValue: number = Math.min(start, end);
        const endValue: number = Math.max(start, end);
        return this.primesGenerator(endValue).filter(elem => elem >= startValue && elem <= endValue);
    }
}