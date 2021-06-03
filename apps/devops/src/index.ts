import * as aws from '@pulumi/aws';
import * as awsx from '@pulumi/awsx';
import * as pulumi from '@pulumi/pulumi';
import { v4 as uuid } from 'uuid';

const templatesDirectory = '/app/templates';
const dbDirectory = '/app/db';
export const adminUserName = 'admin@muil.io';
export const adminPassword = uuid().replace(/-/g, '');

// Create network listener on port 443
const listener = new awsx.elasticloadbalancingv2.NetworkListener('muil', { port: 443 });

// Create a EFS volume for persistence
const dbFilesystem = new aws.efs.FileSystem('muil-db-fs', {
  tags: { Name: 'muil-templates-fs' },
});
const templatesFilesystem = new aws.efs.FileSystem('muil-templates-fs', {
  tags: { Name: 'muil-templates-fs' },
});

// Create the EFS Configuration for connecting to Fargate
const dbVolumeConfiguration: aws.types.input.ecs.TaskDefinitionVolumeEfsVolumeConfiguration = {
  fileSystemId: dbFilesystem.id,
};
const templatesVolumeConfiguration: aws.types.input.ecs.TaskDefinitionVolumeEfsVolumeConfiguration =
  {
    fileSystemId: templatesFilesystem.id,
  };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const service = new awsx.ecs.FargateService('muil', {
  taskDefinitionArgs: {
    containers: {
      muil: {
        image: awsx.ecs.Image.fromDockerBuild('muil', {
          context: '/Users/shahaf/Source/muil/muil',
          dockerfile: '/Users/shahaf/Source/muil/muil/Dockerfile.cloud',
          args: {
            ENV: 'CLOUD',
          },
        }),
        memory: 2048,
        portMappings: [listener],
        environment: [
          {
            name: 'PORT',
            value: '443',
          },
          {
            name: 'SECRET',
            value: uuid().replace(/-/g, ''),
          },
          {
            name: 'PRIVATE_KEY',
            value: './secrets/private.key',
          },
          {
            name: 'PUBLIC_CERTIFICATE',
            value: './secrets/certificate.crt',
          },
          {
            name: 'ADMIN_USERNAME',
            value: adminUserName,
          },
          {
            name: 'ADMIN_PASSWORD',
            value: adminPassword,
          },
        ],
        mountPoints: [
          {
            sourceVolume: 'muil-db-volume',
            containerPath: dbDirectory,
          },
          {
            sourceVolume: 'muil-templates-volume',
            containerPath: templatesDirectory,
          },
        ],
      },
    },
    volumes: [
      {
        name: 'muil-db-volume',
        efsVolumeConfiguration: dbVolumeConfiguration,
      },
      {
        name: 'muil-templates-volume',
        efsVolumeConfiguration: templatesVolumeConfiguration,
      },
    ],
  },
});

export const frontendURL = pulumi.interpolate`http://${listener.endpoint.hostname}/`;
