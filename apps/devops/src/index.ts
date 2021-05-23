import * as awsx from '@pulumi/awsx';
import * as pulumi from '@pulumi/pulumi';

// Create a load balancer to listen for requests and route them to the container.
const listener = new awsx.elasticloadbalancingv2.NetworkListener('nginx', { port: 80 });

// Define the service, building and publishing our "./app/Dockerfile", and using the load balancer.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const service = new awsx.ecs.FargateService('muil', {
  taskDefinitionArgs: {
    containers: {
      muil: {
        image: awsx.ecs.Image.fromPath('muil', '../../../.'),
        memory: 2048,
        portMappings: [listener],
      },
    },
  },
});

export const frontendURL = pulumi.interpolate`http://${listener.endpoint.hostname}/`;
