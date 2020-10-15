import { Injectable } from '@nestjs/common';
import { PrismaService } from 'shared/modules/prisma';

@Injectable()
export class AssetsService {
  constructor(private prisma: PrismaService) {}
}
