import { Controller } from '@nestjs/common';
import { IndexingService } from './indexing.service';

@Controller()
export class IndexingController {
  constructor(private readonly indexingService: IndexingService) {}
}
