import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { PrismaService } from 'shared/modules/prisma';

@Injectable()
export class KpisService {
  constructor(private prisma: PrismaService) {}

  percentageChange(oldNumber: number, newNumber: number) {
    if (newNumber === 0 && oldNumber === 0) return null;
    return oldNumber ? (oldNumber - newNumber / oldNumber) * 100 : 100;
  }

  async getUsers() {
    return this.prisma.users.findMany({
      select: {
        createdAt: true,
        email: true,
        name: true,
        projectId: true,
      },
    });
  }

  async getProjects() {
    const projectsRenderTemplate = (
      await this.prisma.logs.findMany({
        select: { projectId: true },
        distinct: ['projectId'],
      })
    ).map((p) => p.projectId);

    return (await this.prisma.projects.findMany()).map((p) => ({
      ...p,
      renderTemplate: projectsRenderTemplate.includes(p.id),
    }));
  }

  async getKpis(from: { value: number; unit: dayjs.OpUnitType } = { value: 30, unit: 'month' }) {
    const pdfRenders = await this.prisma.logs.count({
      where: {
        AND: [
          { type: 'pdf' },
          { status: 'success' },
          {
            datetime: {
              gte: new Date(dayjs().subtract(from.value, from.unit).format()),
            },
          },
        ],
      },
    });
    const prevPdfRenders = await this.prisma.logs.count({
      where: {
        AND: [
          { type: 'pdf' },
          { status: 'success' },
          {
            datetime: {
              gte: new Date(
                dayjs()
                  .subtract(from.value * 2, from.unit)
                  .format(),
              ),
            },
          },
          {
            datetime: {
              lte: new Date(dayjs().subtract(from.value, from.unit).format()),
            },
          },
        ],
      },
    });

    const pngRenders = await this.prisma.logs.count({
      where: {
        AND: [
          { type: 'png' },
          { status: 'success' },
          {
            datetime: {
              gte: new Date(dayjs().subtract(from.value, from.unit).format()),
            },
          },
        ],
      },
    });
    const prevPngRenders = await this.prisma.logs.count({
      where: {
        AND: [
          { type: 'png' },
          { status: 'success' },
          {
            datetime: {
              gte: new Date(
                dayjs()
                  .subtract(from.value * 2, from.unit)
                  .format(),
              ),
            },
          },
          {
            datetime: {
              lte: new Date(dayjs().subtract(from.value, from.unit).format()),
            },
          },
        ],
      },
    });

    const htmlRenders = await this.prisma.logs.count({
      where: {
        AND: [
          { type: 'html' },
          { status: 'success' },
          {
            datetime: {
              gte: new Date(dayjs().subtract(from.value, from.unit).format()),
            },
          },
        ],
      },
    });
    const prevHtmlRenders = await this.prisma.logs.count({
      where: {
        AND: [
          { type: 'html' },
          { status: 'success' },
          {
            datetime: {
              gte: new Date(
                dayjs()
                  .subtract(from.value * 2, from.unit)
                  .format(),
              ),
            },
          },
          {
            datetime: {
              lte: new Date(dayjs().subtract(from.value, from.unit).format()),
            },
          },
        ],
      },
    });

    const emailsSent = await this.prisma.logs.count({
      where: {
        AND: [
          { type: 'email' },
          { status: 'success' },
          {
            datetime: {
              gte: new Date(dayjs().subtract(from.value, from.unit).format()),
            },
          },
        ],
      },
    });
    const prevEmailsSent = await this.prisma.logs.count({
      where: {
        AND: [
          { type: 'email' },
          { status: 'success' },
          {
            datetime: {
              gte: new Date(
                dayjs()
                  .subtract(from.value * 2, from.unit)
                  .format(),
              ),
            },
          },
          {
            datetime: {
              lte: new Date(dayjs().subtract(from.value, from.unit).format()),
            },
          },
        ],
      },
    });

    const totalProjectsCount = await this.prisma.projects.count();
    const newProjectsCount = await this.prisma.projects.count({
      where: {
        createdAt: {
          gte: new Date(dayjs().subtract(from.value, from.unit).format()),
        },
      },
    });
    const prevNewProjectsCount = await this.prisma.projects.count({
      where: {
        AND: [
          {
            createdAt: {
              gte: new Date(
                dayjs()
                  .subtract(from.value * 2, from.unit)
                  .format(),
              ),
            },
          },
          {
            createdAt: {
              lte: new Date(dayjs().subtract(from.value, from.unit).format()),
            },
          },
        ],
      },
    });

    const totalUsersCount = await this.prisma.users.count();
    const newUsersCount = await this.prisma.users.count({
      where: {
        createdAt: {
          gte: new Date(dayjs().subtract(from.value, from.unit).format()),
        },
      },
    });
    const prevNewUsersCount = await this.prisma.users.count({
      where: {
        AND: [
          {
            createdAt: {
              gte: new Date(
                dayjs()
                  .subtract(from.value * 2, from.unit)
                  .format(),
              ),
            },
          },
          {
            createdAt: {
              lte: new Date(dayjs().subtract(from.value, from.unit).format()),
            },
          },
        ],
      },
    });

    return {
      pdfRenders,
      pdfRendersTrend: this.percentageChange(prevPdfRenders, pdfRenders),
      pngRenders,
      pngRendersTrend: this.percentageChange(prevPngRenders, pngRenders),
      htmlRenders,
      htmlRendersTrend: this.percentageChange(prevHtmlRenders, htmlRenders),
      emailsSent,
      emailsSentTrend: this.percentageChange(prevEmailsSent, emailsSent),
      totalProjectsCount,
      newProjectsCount,
      newProjectsTrend: this.percentageChange(prevNewProjectsCount, newProjectsCount),
      totalUsersCount,
      newUsersCount,
      newUsersTrend: this.percentageChange(prevNewUsersCount, newUsersCount),
    };
  }
}
