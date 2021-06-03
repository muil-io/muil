import * as awsx from '@pulumi/awsx';
import * as pulumi from '@pulumi/pulumi';
import { v4 as uuid } from 'uuid';

const listener = new awsx.elasticloadbalancingv2.NetworkListener('muil', { port: 443 });

export const adminUserName = 'admin@muil.io';
export const adminPassword = uuid().replace(/-/g, '');

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
      },
    },
  },
});

export const frontendURL = pulumi.interpolate`http://${listener.endpoint.hostname}/`;
