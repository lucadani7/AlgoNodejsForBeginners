export type GaussianAnalysisResult =
    | {
    type: "unique";
    solution: number[];
    matrix: number[][];
}
    | {
    type: "infinite" | "incompatible";
    matrix: number[][];
};