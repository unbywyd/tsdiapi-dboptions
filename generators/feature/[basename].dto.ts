import { Expose, Type } from "class-transformer";
import { IsDate, IsOptional, IsString } from "class-validator";

export interface Output{{className}} {
    [key: string]: any;
}

export class Input{{className}}DTO {
    @IsOptional()
    @IsString()
    @Type(() => String)
    @Expose()
    name?: string;

    @IsOptional()
    @Expose()
    value?: any;
}

export class Output{{className}}DTO {
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
