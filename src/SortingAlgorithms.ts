export class SortingAlgorithms {
    static bubbleSort(arr: Array<number>, n: number): void {
        for (let i = 0; i < n - 1; ++i) {
            let isSorted: boolean = true;
            for (let j = 0; j < n - i - 1; ++j) {
                if (arr[j + 1] > arr[j]) {
                    isSorted = false;
                    let aux: number = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = aux;
                }
            }
            if (!isSorted) {
                break;
            }
        }
    }

    static insertSort(arr: Array<number>, n: number): void {
        for (let i = 1; i < n; ++i) {
            let value: number = arr[i];
            let j: number = i - 1;
            while (j > -1 && arr[j] > value) {
                arr[j + 1] = arr[j];
                --j;
            }
            arr[j + 1] = value;
        }
    }

    static partition(arr: Array<number>, start: number, end: number): number {
        let pivot: number = arr[start];
        let i: number = start - 1;
        let j: number = end + 1;
        while (true) {
            do {
                ++i;
            } while (arr[i] < pivot);

            do {
                --j;
            } while (arr[j] > pivot);

            if (i >= j) {
                return j;
            }

            let aux: number = arr[i];
            arr[i] = arr[j];
            arr[j] = aux;
        }
    }

    static randomPartition(arr: Array<number>, start: number, end: number): number {
        let random : number = start + Math.floor(Math.random() * (end - start + 1));
        let aux: number = arr[random];
        arr[random] = arr[start];
        arr[start] = aux;
        return this.partition(arr, start, end);
    }

    static quickSort(arr: Array<number>, start: number, end: number): void {
        if (start >= end) {
            return;
        }
        let pi: number = this.randomPartition(arr, start, end);
        this.quickSort(arr, start, pi);
        this.quickSort(arr, pi + 1, end);
    }

    static merge(arr: Array<number>, start: number, middle: number, end: number): void {
        const auxArray: Array<number> = new Array<number>(end - start + 1);
        let i: number = start;
        let j: number = middle + 1;
        let k: number = 0;
        while (i <= middle && j <= end) {
            auxArray[k++] = (arr[i] <= arr[j]) ? arr[i++] : arr[j++];
        }
        while (i <= middle) {
            auxArray[k++] = arr[i++];
        }
        while (j <= end) {
            auxArray[k++] = arr[j++];
        }
        for (i = 0; i < k; ++i) {
            arr[start + i] = auxArray[i];
        }
    }

    static mergeSort(arr: Array<number>, start: number, end: number): void {
        if (start >= end) {
            return;
        }
        const middle: number = Math.floor((start + end) / 2);
        this.mergeSort(arr, start, middle);
        this.mergeSort(arr, middle + 1, end);
        this.merge(arr, start, middle, end);
    }

    static heapify(arr: Array<number>, pos: number, n: number): void {
        let largest: number = pos;
        let left: number = 2 * pos + 1;
        let right: number = 2 * pos + 2;
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }
        if (largest !== pos) {
            let aux: number = arr[pos];
            arr[pos] = arr[largest];
            arr[largest] = aux;
            this.heapify(arr, largest, n);
        }
    }

    static heapSort(arr: Array<number>, n: number): void {
        for (let i = Math.floor(n / 2) - 1; i > -1; --i) {
            this.heapify(arr, i, n);
        }
        for (let i = n - 1; i > 0; --i) {
            let aux: number = arr[0];
            arr[0] = arr[i];
            arr[i] = aux;
            this.heapify(arr, 0, i);
        }
    }
}