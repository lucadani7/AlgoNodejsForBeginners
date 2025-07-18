export class SearchingAlgorithms {
    static arrayIsSorted(arr: Array<number>): boolean {
        for (let i = 0; i < arr.length - 1; ++i) {
            if (arr[i] > arr[i + 1]) {
                return false;
            }
        }
        return true;
    }

    static linearSearch(arr: Array<number>, valueToSearch: number): void {
        for (let i = 0; i < arr.length; ++i) {
            if (arr[i] === valueToSearch) {
                console.log(`Element ${valueToSearch} is present at index ${i}.`);
                return;
            }
        }
        console.log(`Element ${valueToSearch} does not exist in array!`);
    }

    static binarySearch(arr: Array<number>, valueToSearch: number): void {
        if (!this.arrayIsSorted(arr)) {
            console.log("The array is unsorted, so the value you want to search won't be searched binary!");
            return;
        }
        let start: number = 0;
        let end: number = arr.length - 1;
        while (start <= end) {
            let middle: number = Math.floor((start + end) / 2);
            if (arr[middle] === valueToSearch) {
                console.log(`Element ${valueToSearch} found!`);
                return;
            } else if (arr[middle] < valueToSearch) {
                start = middle + 1;
            } else {
                end = middle - 1;
            }
        }
        console.log(`Element ${valueToSearch} does not exist in array!`);
    }
}