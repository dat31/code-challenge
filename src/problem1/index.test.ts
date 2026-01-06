import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from './index';

describe('Approach A', () => {
  test('sum_to_n_a should return the correct sum', () => {
    expect(sum_to_n_a(0)).toBe(0);
    expect(sum_to_n_a(1)).toBe(1);
    expect(sum_to_n_a(2)).toBe(3);
    expect(sum_to_n_a(3)).toBe(6);
    expect(sum_to_n_a(4)).toBe(10);
  });
});

describe('Approach B', () => {
  test('sum_to_n_b should return the correct sum', () => {
    expect(sum_to_n_b(0)).toBe(0);
    expect(sum_to_n_b(1)).toBe(1);
    expect(sum_to_n_b(2)).toBe(3);
    expect(sum_to_n_b(3)).toBe(6);
    expect(sum_to_n_b(4)).toBe(10);
  });
});

describe('Approach C', () => {
  test('sum_to_n_c should return the correct sum', () => {
    expect(sum_to_n_c(0)).toBe(0);
    expect(sum_to_n_c(1)).toBe(1);
    expect(sum_to_n_c(2)).toBe(3);
    expect(sum_to_n_c(3)).toBe(6);
    expect(sum_to_n_c(4)).toBe(10);
  });
});