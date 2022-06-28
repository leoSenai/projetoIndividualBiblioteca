import { Module } from '@nestjs/common';
import { MultaModule } from 'src/multa/multa.module';
import { TasksService } from './tasks.service';

@Module({
    imports: [MultaModule],
    providers:[TasksService],
})
export class TasksModule {}
