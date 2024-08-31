import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './common/prisma.service';
import { StatusModule } from './status/status.module';
import { BusinessTypesController } from './business_types/business_types.controller';
import { BusinessTypesService } from './business_types/business_types.service';
import { BusinessTypesModule } from './business_types/business_types.module';

@Module({
  imports: [UsersModule, StatusModule, BusinessTypesModule],
  controllers: [AppController, BusinessTypesController],
  providers: [AppService, PrismaService, BusinessTypesService],
})
export class AppModule {}
