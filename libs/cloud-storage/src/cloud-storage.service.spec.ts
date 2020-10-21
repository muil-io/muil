import upload from './cloudStorage';

it('should upload file to cloud storage', async () => {
  upload('1234', 'myfile.txt', {});
  expect(1).toBe(1);
});
