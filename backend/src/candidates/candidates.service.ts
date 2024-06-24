import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { DatabaseService } from '@app/database';

@Injectable()
export class CandidatesService {
  constructor(private readonly candidateRepositoryService: DatabaseService) {}

  async createOrUpdate(createCandidateDto: CreateCandidateDto) {
    let candidate = await this.candidateRepositoryService.findOne({
      email: createCandidateDto.email,
    });
    if (candidate) {
      candidate = { ...candidate, ...createCandidateDto };
    } else {
      candidate =
        await this.candidateRepositoryService.create(createCandidateDto);
    }
    return this.candidateRepositoryService.save(candidate);
  }

  async create(createCandidateDto: CreateCandidateDto) {
    return this.candidateRepositoryService.create(createCandidateDto);
  }

  async update(id: string, updateCandidateDto: UpdateCandidateDto) {
    return this.candidateRepositoryService.update(id, updateCandidateDto);
  }

  findAll() {
    return `This action returns all candidates`;
  }

  findOne(id: string) {
    return `This action returns a #${id} candidate`;
  }

  remove(id: string) {
    return `This action removes a #${id} candidate`;
  }
}
