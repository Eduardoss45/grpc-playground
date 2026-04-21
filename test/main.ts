import { performance } from 'perf_hooks';
import { TOTAL_REQUESTS, CONCURRENCY } from './config';
import { runBatch } from './executor';
import { calculateStats } from './metrics';

(async () => {
  console.log('Iniciando teste...');

  const start = performance.now();

  const batches = TOTAL_REQUESTS / CONCURRENCY;

  for (let i = 0; i < batches; i++) {
    await runBatch(CONCURRENCY);
  }

  const end = performance.now();

  const durationSec = (end - start) / 1000;
  const rps = TOTAL_REQUESTS / durationSec;

  const stats = calculateStats();

  console.log('--- RESULTADOS ---');
  console.log('Total requests:', TOTAL_REQUESTS);
  console.log('Tempo total (s):', durationSec.toFixed(2));
  console.log('RPS:', rps.toFixed(2));
  console.log('Latência média (ms):', stats.avg.toFixed(2));
  console.log('P95 (ms):', stats.p95.toFixed(2));
  console.log('P99 (ms):', stats.p99.toFixed(2));

  process.exit(0);
})();
