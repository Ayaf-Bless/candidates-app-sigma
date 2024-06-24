import { Repository } from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { Candidate } from '../entities/candidate.entity';
import { BadRequestException } from '@nestjs/common';

export abstract class AbstractDatabaseService<T extends Candidate> {
  protected constructor(protected readonly repository: Repository<T>) {}

  async create(entity: DeepPartial<T>): Promise<T> {
    const newEntity = this.repository.create(entity);
    return this.repository.save(newEntity);
  }

  async update(email: string, entity: any): Promise<T> {
    const candidate = await this.findOne(email);
    if (!candidate) {
      throw new BadRequestException(
        'There is no a candidate linked with that email',
      );
    }
    return this.repository.save({ ...entity });
  }

  async findOne(email: any): Promise<T> {
    return this.repository.findOne({ where: { email } });
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async save(entity: DeepPartial<T>) {
    return this.repository.save(entity);
  }
}
