import { Expose } from "class-transformer";
import { IsBoolean } from "class-validator";


export class {{pascalCasePluginName}}Options {
    @IsBoolean()
    @Expose()
    isDev: boolean = false;
}