import { Expose } from "class-transformer";
import { IsBoolean } from "class-validator";

export class Dboptions {
    @IsBoolean()
    @Expose()
    isDev: boolean = false;
}