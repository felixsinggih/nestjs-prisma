import { Injectable, NotFoundException } from '@nestjs/common';
//* Jika memakai schema type prisma 
// import { Prisma } from '@prisma/client'; '@prisma/client/runtime/library';
import { DatabaseService } from 'src/database/database.service';
import { CreateEmployeeDto } from './dto/create-employees.dto';
import { UpdateEmployeeDto } from './dto/update-employees.dto';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) { }

  //* Ini contoh jika menggunakan schema type prisma
  //* Tetapi tidak ada validationnya 
  // async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
  async create(createEmployeeDto: CreateEmployeeDto) {
    return this.databaseService.employee.create({
      data: createEmployeeDto,
    });
  }

  //! Jika role tidak ada bagaimana
  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role)
      return this.databaseService.employee.findMany({
        where: {
          role,
        },
      });

    return this.databaseService.employee.findMany();
  }

  async findOne(id: number) {
    const user = await this.databaseService.employee.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException('User not found!');

    return user
  }

  //* Ini contoh jika menggunakan schema type prisma
  //* Tetapi tidak ada validationnya 
  // async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const user = await this.databaseService.employee.findUnique({
      where: {
        id
      }
    })

    if (!user) throw new NotFoundException('User not found!');

    return this.databaseService.employee.update({
      where: {
        id,
      },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    const user = await this.databaseService.employee.findUnique({
      where: {
        id
      }
    })

    if (!user) throw new NotFoundException('User not found!');

    return this.databaseService.employee.delete({
      where: {
        id,
      },
    });
  }
}
