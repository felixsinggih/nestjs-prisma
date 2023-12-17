import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAddressDto {
    @IsNumber()
    @IsNotEmpty()
    employeeId: number;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    city: string
}
