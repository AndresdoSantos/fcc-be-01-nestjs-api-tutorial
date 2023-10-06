import { Module } from '@nestjs/common';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { BookmarkModule } from './modules/bookmark/bookmark.module';

@Module({
  imports: [AuthModule, UserModule, BookmarkModule],
  controllers: [],
  providers: [],
})
export class AppModule {} // Read the docs about controllers and services
