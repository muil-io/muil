import {
  Controller,
  UseGuards,
  Req,
  Get,
  Post,
  Body,
  Param,
  Delete,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthGuard, MuilAdminOnly } from 'shared/guards';
import { UpdateUserDto, UpdateUserRoleDto } from './users.dto';
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

  @Post('/:id/role')
  @UseGuards(AuthGuard)
  @MuilAdminOnly()
  async updateRole(
    @Req() { user: { projectId } },
    @Param() { id },
    @Body() { role }: UpdateUserRoleDto,
  ) {
    return this.usersService.updateRole(projectId, id, role);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async delete(@Req() { user: { projectId, id: userId } }, @Param() { id }) {
    if (userId === id) {
      throw new InternalServerErrorException('Cannot delete myself');
    }
    return this.usersService.delete(projectId, id);
  }
}
