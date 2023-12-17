import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { AddressesModule } from './addresses/addresses.module';

@Module({
  imports: [UsersModule, DatabaseModule, EmployeesModule, AddressesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
