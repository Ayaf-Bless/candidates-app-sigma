// src/candidate/candidates.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CandidatesService } from './candidates.service';
import { DatabaseService } from '@app/database';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { BadRequestException } from '@nestjs/common';

const mockCandidateRepositoryService = {
  create: jest.fn(),
  update: jest.fn(),
  findOne: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn(),
};

describe('CandidatesService', () => {
  let service: CandidatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CandidatesService,
        {
          provide: DatabaseService,
          useValue: mockCandidateRepositoryService,
        },
      ],
    }).compile();

    service = module.get<CandidatesService>(CandidatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOrUpdate', () => {
    it('should create a new candidate if one does not exist', async () => {
      const createCandidateDto: CreateCandidateDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        callInterval: '9am-5pm',
        linkedinProfile: 'https://linkedin.com/johndoe',
        githubProfile: 'https://github.com/johndoe',
        comment: 'Sample comment',
      };

      mockCandidateRepositoryService.findOne.mockResolvedValue(null);
      mockCandidateRepositoryService.create.mockResolvedValue(
        createCandidateDto,
      );
      mockCandidateRepositoryService.save.mockResolvedValue(createCandidateDto);

      const result = await service.createOrUpdate(createCandidateDto);
      expect(result).toEqual(createCandidateDto);
      expect(mockCandidateRepositoryService.create).toHaveBeenCalledWith(
        createCandidateDto,
      );
      expect(mockCandidateRepositoryService.save).toHaveBeenCalledWith(
        createCandidateDto,
      );
    });

    it('should update an existing candidate if one exists', async () => {
      const existingCandidate = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        callInterval: '9am-5pm',
        linkedinProfile: 'https://linkedin.com/johndoe',
        githubProfile: 'https://github.com/johndoe',
        comment: 'Sample comment',
      };

      const updateCandidateDto: CreateCandidateDto = {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '0987654321',
        callInterval: '9am-5pm',
        linkedinProfile: 'https://linkedin.com/janedoe',
        githubProfile: 'https://github.com/janedoe',
        comment: 'Updated comment',
      };

      mockCandidateRepositoryService.findOne.mockResolvedValue(
        existingCandidate,
      );
      mockCandidateRepositoryService.save.mockResolvedValue({
        ...existingCandidate,
        ...updateCandidateDto,
      });

      const result = await service.createOrUpdate(updateCandidateDto);
      expect(result).toEqual({ ...existingCandidate, ...updateCandidateDto });
      expect(mockCandidateRepositoryService.save).toHaveBeenCalledWith({
        ...existingCandidate,
        ...updateCandidateDto,
      });
    });
  });

  describe('create', () => {
    it('should create a new candidate', async () => {
      const createCandidateDto: CreateCandidateDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        callInterval: '9am-5pm',
        linkedinProfile: 'https://linkedin.com/johndoe',
        githubProfile: 'https://github.com/johndoe',
        comment: 'Sample comment',
      };

      mockCandidateRepositoryService.create.mockResolvedValue(
        createCandidateDto,
      );

      const result = await service.create(createCandidateDto);
      expect(result).toEqual(createCandidateDto);
      expect(mockCandidateRepositoryService.create).toHaveBeenCalledWith(
        createCandidateDto,
      );
    });
  });

  describe('update', () => {
    it('should update an existing candidate', async () => {
      const id = '1';
      const updateCandidateDto: UpdateCandidateDto = {
        firstName: 'Jane',
        lastName: 'Doe',
        phoneNumber: '0987654321',
        callInterval: '9am-5pm',
        linkedinProfile: 'https://linkedin.com/janedoe',
        githubProfile: 'https://github.com/janedoe',
        comment: 'Updated comment',
      };

      mockCandidateRepositoryService.update.mockResolvedValue({
        id,
        ...updateCandidateDto,
      });

      const result = await service.update(id, updateCandidateDto);
      expect(result).toEqual({ id, ...updateCandidateDto });
      expect(mockCandidateRepositoryService.update).toHaveBeenCalledWith(
        id,
        updateCandidateDto,
      );
    });
  });

  describe('findOne', () => {
    it('should return a candidate if found', async () => {
      const email = 'john.doe@example.com';
      const candidate = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email,
        phoneNumber: '1234567890',
        callInterval: '9am-5pm',
        linkedinProfile: 'https://linkedin.com/johndoe',
        githubProfile: 'https://github.com/johndoe',
        comment: 'Sample comment',
      };

      mockCandidateRepositoryService.findOne.mockResolvedValue(candidate);

      const result = await service.findOne(email);
      expect(result).toEqual(candidate);
      expect(mockCandidateRepositoryService.findOne).toHaveBeenCalledWith(
        email,
      );
    });

    it('should throw BadRequestException if candidate not found', async () => {
      const email = 'john.doe@example.com';

      mockCandidateRepositoryService.findOne.mockResolvedValue(null);

      await expect(service.findOne(email)).rejects.toThrow(BadRequestException);
      expect(mockCandidateRepositoryService.findOne).toHaveBeenCalledWith(
        email,
      );
    });
  });

  describe('findAll', () => {
    it('should return all candidates', async () => {
      const candidates = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
        },
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane.doe@example.com',
        },
      ];

      mockCandidateRepositoryService.findAll.mockResolvedValue(candidates);

      const result = await service.findAll();
      expect(result).toEqual(candidates);
      expect(mockCandidateRepositoryService.findAll).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should return a message confirming removal', async () => {
      const id = '1';
      const result = service.remove(id);
      expect(result).toEqual(`This action removes a #${id} candidate`);
    });
  });
});
