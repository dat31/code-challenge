type SumToN = (n: number) => number;

export const sum_to_n_a: SumToN = (n) => {
    if (n <= 1) return n;
    if (Number.isNaN(n)) throw new Error('Invalid input');
    return (n * (n + 1)) / 2;
}

export const sum_to_n_b: SumToN = (n) => {
    if (n <= 1) return n;
    if (Number.isNaN(n)) throw new Error('Invalid input');
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

export const sum_to_n_c: SumToN = (n) => {
    if (n <= 1) return n;
    if (Number.isNaN(n)) throw new Error('Invalid input');
    return Array.from({ length: n }, (_, i) => i + 1).reduce((acc, curr) => acc + curr, 0);
}