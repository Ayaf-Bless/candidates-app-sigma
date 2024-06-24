import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { AbstractDatabaseService } from './abstract/crud.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from './entities/candidate.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [Candidate],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Candidate]),
  ],
  providers: [
    DatabaseService,
    {
      provide: AbstractDatabaseService,
      useClass: DatabaseService,
    },
  ],
  exports: [DatabaseService],
})
export class DatabaseModule {}
