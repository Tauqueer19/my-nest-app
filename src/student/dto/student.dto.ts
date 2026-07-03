import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({ example: 'Ali' })
  name!: string;

  @ApiProperty({ example: 20 })
  age!: number;
}

export class UpdateStudentDto extends PartialType(CreateStudentDto) {}