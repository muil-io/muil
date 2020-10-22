import { Controller, UseGuards, Get, Post, Delete, Req, Body } from '@nestjs/common';
import { AuthGuard } from 'shared/guards';
import { MailerService } from 'shared/modules/mailer';
import { SmtpService } from './smtp.service';
import { SmtpDto } from './smtp.dto';

@Controller('smtp')
export class SmtpController {
  constructor(private readonly smtpService: SmtpService, private mailerService: MailerService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getProjectSmtp(@Req() { user: { projectId } }) {
    return this.smtpService.get(projectId);
  }

  @Post()
  @UseGuards(AuthGuard)
  async setProjectSmtp(@Req() { user: { projectId } }, @Body() smtpDto: SmtpDto) {
    return this.smtpService.setSmtp(projectId, smtpDto);
  }

  @Delete()
  @UseGuards(AuthGuard)
  async deleteProjectSmtp(@Req() { user: { projectId } }) {
    return this.smtpService.deleteSmtp(projectId);
  }

  @Post('/check')
  @UseGuards(AuthGuard)
  async testSmtp(@Body() smtpDto: SmtpDto) {
    return this.mailerService.test(smtpDto);
  }
}
