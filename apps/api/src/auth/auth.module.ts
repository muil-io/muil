import { Module } from '@nestjs/common';
import { ProjectsModule } from 'projects';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [ProjectsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
