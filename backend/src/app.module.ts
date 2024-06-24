import { Module } from '@nestjs/common';
import { CandidatesModule } from './candidates/candidates.module';

@Module({
  imports: [CandidatesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
