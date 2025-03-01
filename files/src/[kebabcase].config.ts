import { Expose } from "class-transformer";
import { IsBoolean } from "class-validator";


export class {{pluginName}}Options {
    @IsBoolean()
    @Expose()
    isDev: boolean = false;
}