import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from './core/core.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { FileModule } from './file/file.module';
import { UsersModule } from './users/users.module';
import { RatingModule } from './rating/rating.module';
import 'dotenv/config';

@Module({
  imports: [
    CoreModule,
    MongooseModule.forRoot(process.env.MONGO_DB_URL || 'mongodb://localhost/test'),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    PostModule,
    CommentModule,
    FileModule,
    UsersModule,
    RatingModule,
  ],
})
export class AppModule {}