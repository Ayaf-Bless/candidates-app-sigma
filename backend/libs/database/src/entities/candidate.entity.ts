import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Candidate {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  callInterval: string;

  @Column({ nullable: true })
  linkedinProfile: string;

  @Column({ nullable: true })
  githubProfile: string;

  @Column('text')
  comment: string;
}
