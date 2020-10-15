import { Injectable } from '@nestjs/common';
import { PrismaService } from 'shared/modules/prisma';

@Injectable()
export class TemplatesService {
  constructor(private prisma: PrismaService) {}
}
