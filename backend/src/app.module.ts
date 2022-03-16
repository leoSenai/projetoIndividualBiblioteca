import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:     'mysql',
      host:     'localhost',
      port:     3306,
      username: 'senai',
      password: 'senai123',
      database: 'biblioteca',
      entities: [],
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
