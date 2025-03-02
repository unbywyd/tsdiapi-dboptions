import { Expose, Type } from "class-transformer";
import { IsDate, IsOptional, IsString } from "class-validator";

export interface OutputDboption {
    [key: string]: any;
}

export class InputDboptionDTO {
    @IsOptional()
    @IsString()
    @Type(() => String)
    @Expose()
    name?: string;

    @IsOptional()
    @Expose()
    value?: any;
}

export class OutputDboptionDTO {
    @IsOptional()
    @IsString()
    @Type(() => String)
    @Expose()
    id?: string;

    @IsOptional()
    @IsString()
    @Type(() => String)
    @Expose()
    name?: string;

    @IsOptional()
    @IsString()
    @Type(() => String)
    @Expose()
    value?: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    @Expose()
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    @Expose()
    updatedAt?: Date;
}
