export class NumeralSystem {
    static isValid(value: string, base: number): boolean {
        const pattern = new RegExp(`^[0-9A-Fa-f]+$`);
        if (!pattern.test(value)) {
            return false;
        }
        for (const char of value.toUpperCase()) {
            const digit = parseInt(char, 16);
            if (isNaN(digit) || digit >= base) {
                return false;
            }
        }
        return true;
    }

    static convert(value: string, fromBase: number, toBase: number): string {
        if (!this.isValid(value, fromBase)) {
            throw new Error(`Invalid value '${value}' for base ${fromBase}`);
        }
        const decimal = BigInt(parseInt(value, fromBase));
        return decimal.toString(toBase).toUpperCase();
    }

    static toBinary(value: string, fromBase: number): string {
        return this.convert(value, fromBase, 2);
    }

    static toOctal(value: string, fromBase: number): string {
        return this.convert(value, fromBase, 8);
    }

    static toDecimal(value: string, fromBase: number): string {
        return this.convert(value, fromBase, 10);
    }

    static toHex(value: string, fromBase: number): string {
        return this.convert(value, fromBase, 16);
    }

    static add(a: string, b: string, base: number): string {
        const sum = BigInt(parseInt(a, base)) + BigInt(parseInt(b, base));
        return sum.toString(base).toUpperCase();
    }

    static subtract(a: string, b: string, base: number): string {
        const diff = BigInt(parseInt(a, base)) - BigInt(parseInt(b, base));
        return diff.toString(base).toUpperCase();
    }
}
