import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export const encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRounds);
  const encrypted = await bcrypt.hash(password, salt);
  return encrypted;
};

export const comparePassword = async (pass: string, encrypted: string): Promise<boolean> => {
  const isMatch = await bcrypt.compare(pass, encrypted);
  return isMatch;
};
