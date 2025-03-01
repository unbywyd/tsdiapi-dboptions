import { Expose } from "class-transformer";
import { IsBoolean } from "class-validator";

export class {{pascalCase pluginName}} {
    @IsBoolean()
    @Expose()
    isDev: boolean = false;
}