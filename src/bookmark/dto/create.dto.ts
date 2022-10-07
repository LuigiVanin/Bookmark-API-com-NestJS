import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CreateBookmark {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    description?: string;

    @IsString()
    @IsNotEmpty()
    link: string;
}
