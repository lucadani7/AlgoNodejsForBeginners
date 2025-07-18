import {SortingAlgorithms} from "./SortingAlgorithms";
import {CoinUsage} from "./CoinUsage";

export class SumPayment {
    static sortArrayDesc(arr: number[]): void {
        SortingAlgorithms.mergeSort(arr, 0, arr.length - 1);
        for (let i = 0, j = arr.length - 1; i < j; ++i, --j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    static getPaymentBreakdown(sum: number, coins: number[]): CoinUsage[] {
        this.sortArrayDesc(coins);
        const breakdown: CoinUsage[] = [];
        let remaining = sum;
        for (const coin of coins) {
            if (coin <= remaining) {
                const count = Math.floor(remaining / coin);
                breakdown.push({ coin, count });
                remaining -= count * coin;
                remaining = parseFloat(remaining.toFixed(10));
            }
        }
        return remaining === 0 ? breakdown : [];
    }

    static printHowToPayACertainSum(sum: number, coins: number[]): void {
        const breakdown: CoinUsage[] = this.getPaymentBreakdown(sum, coins);
        if (breakdown.length === 0) {
            console.log(`Cannot pay ${sum} euro exactly with available coins.`);
            return;
        }
        for (const { coin, count } of breakdown) {
            console.log(`We can use ${count} coin${count > 1 ? "s" : ""} of ${coin} euro`);
        }
        const total = breakdown.reduce((acc, item) => acc + item.count, 0);
        console.log(`We used a total of ${total} coins.`);
    }

    static canPayExactly(sum: number, coins: number[]): boolean {
        return this.getPaymentBreakdown(sum, coins).length > 0;
    }
}