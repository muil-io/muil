import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { PrismaService } from 'shared/modules/prisma';

@Injectable()
export class KpisService {
  constructor(private prisma: PrismaService) {}

  percentageChange(oldNumber: number, newNumber: number) {
    if (newNumber === 0 && oldNumber === 0) return null;
    return oldNumber
      ? (((oldNumber - newNumber) / oldNumber) * 100 * (oldNumber > newNumber ? -1 : 1)).toFixed(2)
      : 100;
  }

  async getUsers(
    page: number = 0,
    perPage: number = 100,
    orderBy: string = 'email',
    orderByDirection: string = 'asc',
  ) {
    const data = await this.prisma.users.findMany({
      select: {
        id: true,
        createdAt: true,
        email: true,
        name: true,
        projectId: true,
        role: true,
      },
      orderBy: [
        {
          [orderBy]: orderByDirection,
        },
      ],
      skip: page * perPage,
      take: perPage,
    });

    const total = await this.prisma.users.count();

    return { data, total };
  }

  async getProjects(
    page: number = 0,
    perPage: number = 100,
    orderBy: string = 'id',
    orderByDirection: string = 'asc',
  ) {
    const projectsRenderTemplate = (
      await this.prisma.logs.findMany({
        select: { projectId: true },
        distinct: ['projectId'],
        orderBy: [
          {
            [orderBy]: orderByDirection,
          },
        ],
        skip: page * perPage,
        take: perPage,
      })
    )
      .filter(({ projectId }) => projectId !== 'default')
      .map(({ projectId }) => projectId);

    const data = (await this.prisma.projects.findMany({ where: { NOT: [{ id: 'default' }] } })).map(
      (p) => ({
        ...p,
        renderTemplate: projectsRenderTemplate.includes(p.id),
      }),
    );

    const total = await this.prisma.projects.count({ where: { NOT: [{ id: 'default' }] } });

    return { data, total };
  }

  async getKpis(from: { value: number; unit: dayjs.OpUnitType } = { value: 7, unit: 'day' }) {
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

    const totalProjectsCount = await this.prisma.projects.count({
      where: { NOT: { id: 'default' } },
    });
    const newProjectsCount = await this.prisma.projects.count({
      where: {
        AND: [
          { NOT: { id: 'default' } },
          {
            createdAt: {
              gte: new Date(dayjs().subtract(from.value, from.unit).format()),
            },
          },
        ],
      },
    });
    const prevNewProjectsCount = await this.prisma.projects.count({
      where: {
        AND: [
          { NOT: { id: 'default' } },
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
