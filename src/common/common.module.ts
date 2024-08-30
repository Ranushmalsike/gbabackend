import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service'; // Adjust the import path as needed

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class CommonModule {}
