import { Injectable } from '@nestjs/common';
import { Candidate } from './entities/candidate.entity';
import { AbstractDatabaseService } from './abstract/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DatabaseService extends AbstractDatabaseService<Candidate> {
  constructor(
    @InjectRepository(Candidate)
    protected readonly repository: Repository<Candidate>,
  ) {
    super(repository);
  }
}
