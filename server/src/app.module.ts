import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma.module';
import { LogisticalModule } from './logistical.module';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api_key.guard';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    LogisticalModule,
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
    ]),
  ],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: ApiKeyGuard,
  }],
})
export class AppModule {}