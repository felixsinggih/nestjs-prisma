import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
//* Jika memakai schema type prisma 
// import { Prisma } from '@prisma/client'; '@prisma/client/runtime/library';
import { DatabaseService } from 'src/database/database.service';
import { CreateEmployeeDto } from './dto/create-employees.dto';
import { UpdateEmployeeDto } from './dto/update-employees.dto';
import { hash } from "bcrypt"

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) { }

  //* Ini contoh jika menggunakan schema type prisma
  //* Tetapi tidak ada validationnya 
  // async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
  async create(createEmployeeDto: CreateEmployeeDto) {
    const user = await this.databaseService.employee.findUnique({
      where: {
        email: createEmployeeDto.email
      }
    })

    if (user) throw new ConflictException('Email has taken!');

    return this.databaseService.employee.create({
      data: {
        name: createEmployeeDto.name,
        email: createEmployeeDto.email,
        role: createEmployeeDto.role,
        password: await hash(createEmployeeDto.password, 12)
      }
    });
  }

  //! Jika role tidak ada bagaimana
  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role)
      return this.databaseService.employee.findMany({
        where: {
          role,
        },
        select: {
          name: true,
          email: true,
          role: true
        }
      });

    return this.databaseService.employee.findMany();
  }

  async findOne(id: number) {
    const user = await this.databaseService.employee.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        email: true,
        role: true
      }
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
      data: {
        name: updateEmployeeDto.name,
        email: updateEmployeeDto.email,
        role: updateEmployeeDto.role,
        password: await hash(updateEmployeeDto.password, 12)
      },
      select: {
        name: true,
        email: true,
        role: true
      }
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
