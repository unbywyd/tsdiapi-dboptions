import { Expose } from "class-transformer";
import { IsBoolean } from "class-validator";


export class {{className}}Options {
    @IsBoolean()
    @Expose()
    isDev: boolean = false;
}