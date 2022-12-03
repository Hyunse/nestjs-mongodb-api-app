import { IsNotEmpty, IsOptional, IsString, IsUrl, Length } from "class-validator";

export class CreateBookmarkDTO {
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  title: string;

  @IsNotEmpty()
  @IsUrl()
  link: string;

  @IsOptional()
  description: string;
}