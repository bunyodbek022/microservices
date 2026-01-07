import { Module } from '@nestjs/common';
import { TeachersController } from './app.controller';
import { TeachersService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
  }),
    PrismaModule],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class AppModule {}
