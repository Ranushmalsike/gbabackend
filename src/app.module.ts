import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './common/prisma.service';
import { StatusModule } from './status/status.module';

@Module({
  imports: [UsersModule, StatusModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
