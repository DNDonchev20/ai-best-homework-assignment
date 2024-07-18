import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma.module';
import { LogisticalModule } from './logistical.module';

@Module({
  imports: [PrismaModule, AuthModule, LogisticalModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
