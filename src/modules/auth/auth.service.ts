import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  signIn() {
    return { message: 'I am sing in' };
  }

  signUp() {
    return { message: 'I am sing up' };
  }
}
