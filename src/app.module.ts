import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Module } from '@nestjs/common';
import { AdminModule } from '@adminjs/nestjs';

@Module({
  imports: [
    AdminModule.createAdmin({
      adminJsOptions: {
        rootPath: '/admin',
        resources: [],
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
