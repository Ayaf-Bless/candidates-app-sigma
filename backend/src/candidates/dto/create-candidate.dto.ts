import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCandidateDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  callInterval?: string;

  @IsOptional()
  @IsString()
  linkedinProfile?: string;

  @IsOptional()
  @IsString()
  githubProfile?: string;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
