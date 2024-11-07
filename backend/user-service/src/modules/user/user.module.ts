import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AccountUsers } from 'src/database/entities/account_users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountUsers])
  ],
  controllers: [UserController],
  providers: [UserService],
  // exports:[TypeOrmModule]
})
export class UserModule {}
