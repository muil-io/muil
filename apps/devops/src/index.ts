import * as awsx from '@pulumi/awsx';
import * as pulumi from '@pulumi/pulumi';

const listener = new awsx.elasticloadbalancingv2.NetworkListener('muil', { port: 443 });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const service = new awsx.ecs.FargateService('muil', {
  taskDefinitionArgs: {
    containers: {
      muil: {
        image: awsx.ecs.Image.fromPath('muil', '/Users/shahaf/Source/muil/muil'),
        memory: 2048,
        portMappings: [listener],
        environment: [
          {
            name: 'ENV',
            value: 'CLOUD',
          },
        ],
      },
    },
  },
});

export const frontendURL = pulumi.interpolate`http://${listener.endpoint.hostname}/`;
