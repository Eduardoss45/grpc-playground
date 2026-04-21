export const latencies: number[] = [];

export function addLatency(value: number) {
  latencies.push(value);
}

export function calculateStats() {
  latencies.sort((a, b) => a - b);

  const total = latencies.length;
  const avg = latencies.reduce((a, b) => a + b, 0) / total;

  const p95 = latencies[Math.floor(total * 0.95)];
  const p99 = latencies[Math.floor(total * 0.99)];

  return { avg, p95, p99 };
}
