// Common imports
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import ApiModules from './api/api.modules';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    ...ApiModules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
