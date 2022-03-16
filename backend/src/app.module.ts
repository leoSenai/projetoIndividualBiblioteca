import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { LivroModule } from './livro/livro.module';
import { MultaModule } from './multa/multa.module';
import { ConfigModule } from '@nestjs/config';
import { CriancaModule } from './crianca/crianca.module';
import { EmprestimoModule } from './emprestimo/emprestimo.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
      type:     'mysql',
      host:     process.env.MYSQL_HOST,
      port:     +process.env.MYSQL_PORT,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DB,
      autoLoadEntities: true,
    }),
    UsuarioModule,
    LivroModule,
    MultaModule,
    CriancaModule,
    EmprestimoModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
