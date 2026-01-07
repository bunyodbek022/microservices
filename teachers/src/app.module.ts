import { Module } from '@nestjs/common';
import { TeachersController } from './app.controller';
import { TeachersService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class AppModule {}
