import { ConfigModule } from '@nestjs/config';
import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from '@src/modules/users/users.service';
import { UsersController } from '@src/modules/users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
/****entity****/
import { User } from '@src/modules/users/entities/user.entity';
import { SdUserRole } from '@src/modules/users/entities/sduserrole.entity';   // เพิ่มบรรทัดนี้
import { UserFile } from '@src/modules/users/entities/file.entity';
import { SdUserRolesAccess } from '@src/modules/users/entities/rolesaccess.entity';
import { UserRolePermission } from '@src/modules/users/entities/userrolepermission.entity';
/****entity****/
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '@src/modules/auth/auth.module';
import { AuthService } from '@src/modules/auth/auth.service';

@Module({
  imports: [
     TypeOrmModule.forFeature([
      User,
      SdUserRole, 
      UserFile,
      SdUserRolesAccess,
      UserRolePermission,
    ]),
    forwardRef(() => AuthModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  exports: [UsersService, 
            TypeOrmModule.forFeature([
              User,
              SdUserRole, 
              UserFile,
              SdUserRolesAccess,
              UserRolePermission,
            ]) 
        ], // ถ้าต้องการใช้ใน module อื่น
})
export class UsersModule {}
