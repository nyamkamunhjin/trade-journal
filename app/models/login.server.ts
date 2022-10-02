import { db } from '~/utils/db.server';
import bcrypt from 'bcryptjs';

export async function createUser(user: { email: string; password: string }) {
  const passwordSalt = process.env.PASSWORD_SALT || 'password';
  const passwordHash = await bcrypt.hash(user.password, passwordSalt);

  const newUser = await db.user.create({
    data: {
      email: user.email,
      password: passwordHash,
    },
  });

  return newUser;
}
