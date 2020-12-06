// import fs from 'fs';
import upload from './cloudStorage';

it('should upload file to cloud storage', async () => {
  // const buffer: Buffer = await fs.promises.readFile('/Users/shahaf/Downloads/cat.jpg');

  // await upload('cat1.jpg', '/Users/shahaf/Downloads/cat.jpg', {
  //   aws: {
  //     accessKeyId: 'AKIARIDB77JC2ZK7O2TA',
  //     secretAccessKey: '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',
  //     bucketName: 'xm-test',
  //   },
  // });

  await upload(null, '/Users/shahaf/Downloads/cat.jpg', {
    cloudinary: {
      cloudName: 'muil',
      apiKey: '419794495558136',
      apiSecret: 'FCSvuseXBkO2iuOQjkBiHrRP8z4',
    },
  });

  expect(1).toBe(1);
});
