import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './common/prisma.service';
import { StatusModule } from './status/status.module';
import { BusinessTypesController } from './business_types/business_types.controller';
import { BusinessTypesService } from './business_types/business_types.service';
import { BusinessTypesModule } from './business_types/business_types.module';
import { NormalOrDryTbController } from './normal-or-dry_tb/normal-or-dry_tb.controller';
import { NormalOrDryTbService } from './normal-or-dry_tb/normal-or-dry_tb.service';
import { NormalOrDryTbModule } from './normal-or-dry_tb/normal-or-dry_tb.module';

@Module({
  imports: [UsersModule, StatusModule, BusinessTypesModule, NormalOrDryTbModule],
  controllers: [AppController, BusinessTypesController, NormalOrDryTbController],
  providers: [AppService, PrismaService, BusinessTypesService, NormalOrDryTbService],
})
export class AppModule {}
