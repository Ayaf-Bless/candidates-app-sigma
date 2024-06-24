import { Repository } from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';

export abstract class AbstractDatabaseService<T> {
  protected constructor(protected readonly repository: Repository<T>) {}

  async create(entity: DeepPartial<T>): Promise<T> {
    const newEntity = this.repository.create(entity);
    return this.repository.save(newEntity);
  }

  async update(id: any, entity: any): Promise<T> {
    await this.repository.update(id, entity);
    return this.repository.findOne(id);
  }

  async findOne(id: any): Promise<T> {
    return this.repository.findOne(id);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }
}
