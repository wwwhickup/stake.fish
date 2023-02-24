import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  MongooseHealthIndicator,
  DiskHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: MongooseHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
  ) {}

  /**
   * @Route /health
   * @Method GET
   * @returns Object
   */
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      // Database check
      () => this.db.pingCheck('database'),
      // disk storage check
      () =>
        this.disk.checkStorage('storage', {
          path: '/app',
          thresholdPercent: 0.5,
        }),
      // heap memory size 0.5G
      () => this.memory.checkHeap('memory_heap', 512 * 1024 * 1024),
      // rss momory size 0.5G
      () => this.memory.checkRSS('memory_rss', 512 * 1024 * 1024),
    ]);
  }
}
