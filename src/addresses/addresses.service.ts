import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AddressesService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createAddressDto: CreateAddressDto) {
    const user = await this.databaseService.employee.findUnique({
      where: {
        id: createAddressDto.employeeId
      }
    })

    if (!user) throw new NotFoundException('Employee not found')

    const address = await this.databaseService.address.findUnique({
      where: {
        id: createAddressDto.employeeId
      }
    })

    if (address) throw new ConflictException('This employee has another address')

    return this.databaseService.address.create({
      data: createAddressDto
    });
  }

  async findAll() {
    return this.databaseService.address.findMany();
  }

  async findOne(id: number) {
    const address = await this.databaseService.address.findUnique({
      where: {
        id
      }
    });

    if (!address) throw new NotFoundException('Address not found')

    return address
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    const address = await this.databaseService.address.findUnique({
      where: {
        id
      }
    })

    if (!address) throw new NotFoundException('Address not found')

    return this.databaseService.address.update({
      where: {
        id,
      },
      data: updateAddressDto,
    });
  }

  async remove(id: number) {
    const address = await this.databaseService.address.findUnique({
      where: {
        id
      }
    })

    if (!address) throw new NotFoundException('Address not found')

    return this.databaseService.address.delete({
      where: {
        id
      }
    })
  }
}
