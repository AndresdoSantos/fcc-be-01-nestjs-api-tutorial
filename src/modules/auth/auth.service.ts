import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { PrismaService } from '../prisma/prisma.service';

import { AuthDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(dto: AuthDTO) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hashedPassword: hash,
        },
      });

      delete user.hashedPassword;

      return user;
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials taken',
          );
        }
      }

      throw error;
    }
  }

  async signIn(dto: AuthDTO) {
    const user =
      await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

    if (!user) {
      throw new ForbiddenException(
        'Credentials incorrect!',
      );
    }

    const pwMatches = await argon.verify(
      user.hashedPassword,
      dto.password,
    );

    if (!pwMatches) {
      throw new ForbiddenException(
        'Credentials incorrect!',
      );
    }

    delete user.hashedPassword;

    return user;
  }
}
