import { Controller, UseGuards, Req, Get, Post, Body, Param } from '@nestjs/common';
import { AuthGuard } from 'shared/guards';
import { UpdateUserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  async get(@Req() { user: { projectId } }) {
    return this.usersService.getAll(projectId);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async me(@Req() { user }) {
    return this.usersService.get(user.id);
  }

  @Post('/:id')
  @UseGuards(AuthGuard)
  async update(@Req() { user: { projectId } }, @Param() { id }, @Body() { name }: UpdateUserDto) {
    return this.usersService.update(projectId, id, name);
  }
}
