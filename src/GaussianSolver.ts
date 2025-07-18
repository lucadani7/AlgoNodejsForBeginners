import {GaussianAnalysisResult} from "./GaussianAnalysisResult";
import * as fs from "node:fs";

export class GaussianSolver {
    static readonly EPSILON: number = 1e-10;

    static writeSolutionIntoJSONFile(matrix: number[][]): void {
        const json: string = this.exportSolutionToJSON(matrix);
        if (!json) {
            console.error("No solutions to export.");
            return;
        }
        fs.writeFileSync("solution.json", json);
        console.log("Solutions written to solution.json");
    }

    static exportSolutionToJSON(matrix: number[][]): string | null {
        const analysis = this.analyzeMatrix(matrix);
        if (analysis.type === "incompatible") {
            return null;
        }
        const output: any = {
            type: analysis.type,
            matrix: analysis.matrix
        };
        if (analysis.type === "unique") {
            output.solution = analysis.solution;
        }
        return JSON.stringify(output, null, 2);
    }

    static analyzeMatrix(matrix: number[][]): GaussianAnalysisResult {
        const n = matrix.length;
        const m: number[][] = matrix.map(row => [...row]); // clone matrix

        // gaussian elimination
        for (let i = 0; i < n; i++) {
            // pivot
            let maxRow = i;
            for (let k = i + 1; k < n; k++) {
                if (Math.abs(m[k][i]) > Math.abs(m[maxRow][i])) {
                    maxRow = k;
                }
            }
            [m[i], m[maxRow]] = [m[maxRow], m[i]];
            // if pivot is zero, continue — could be null row
            if (Math.abs(m[i][i]) < this.EPSILON) {
                continue;
            }
            // elimination
            for (let k = i + 1; k < n; k++) {
                const factor = m[k][i] / m[i][i];
                for (let j = i; j <= n; j++) {
                    m[k][j] -= factor * m[i][j];
                }
            }
        }
        // check compatibility
        for (let i = 0; i < n; i++) {
            const row = m[i];
            const coeffs = row.slice(0, n);
            const rhs = row[n];
            const allZero = coeffs.every(val => Math.abs(val) < this.EPSILON);
            if (allZero && Math.abs(rhs) > this.EPSILON) {
                return { type: "incompatible", matrix: m };
            }
            if (allZero && Math.abs(rhs) < this.EPSILON) {
                return { type: "infinite", matrix: m };
            }
        }
        // inverse substitution
        const solution: number[] = new Array(n).fill(0);
        for (let i = n - 1; i >= 0; i--) {
            let sum = m[i][n];
            for (let j = i + 1; j < n; j++) {
                sum -= m[i][j] * solution[j];
            }
            if (Math.abs(m[i][i]) < this.EPSILON) {
                return { type: "infinite", matrix: m };
            }
            solution[i] = sum / m[i][i];
        }
        return { type: "unique", solution, matrix: m };
    }
}