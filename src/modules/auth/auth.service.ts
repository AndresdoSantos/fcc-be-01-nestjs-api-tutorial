import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signIn() {
    return { message: 'I am sing in' };
  }

  signUp() {
    return { message: 'I am sing up' };
  }
}
