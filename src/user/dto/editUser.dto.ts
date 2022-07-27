import { IsEmail, IsOptional, IsString } from '@nestjs/class-validator';

export class EditUserDto {
    @IsEmail()
    @IsString()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;
}
