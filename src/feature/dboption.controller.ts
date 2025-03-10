import {
    JsonController,
    Post,
    Body,
    Get,
    Param
} from "routing-controllers";
import { Service, Container } from "typedi";
import { OpenAPI } from "routing-controllers-openapi";
import DboptionService, { DboptionConfigService, Dboptions } from "./dboption.service.js";
import { SuccessResponse, Summary, RequestGuard } from "@tsdiapi/server";
import { InputDboptionDTO, OutputDboptionDTO } from "./dboption.dto.js";
import type { Request } from "express";
import { Expose } from "class-transformer";
import { IsObject } from "class-validator";

export class OptionsResponseDTO {
    @Expose()
    @IsObject()
    options: Record<string, never> = {};
}

export class OptionResponseDTO {
    @Expose()
    @IsObject()
    option: Record<string, never> = {};
}

@Service()
@OpenAPI({
    tags: ["Dboption"],
})
@JsonController("dboption")
export class DboptionController {
    constructor(private dboptionService: DboptionService) { }
    @Post("/")
    @RequestGuard(async (req: Request) => {
        const dboptionConfig = Container.get(DboptionConfigService);
        const result = await dboptionConfig.validateAccess(req);
        if (!result) {
            return {
                status: 401,
                message: "Unauthorized"
            };
        }
        return true;
    })
    @Summary("Create Dboption")
    @OpenAPI({
        security: [{ bearerAuth: [] }],
        description: "This endpoint is only accessible by admin"
    })
    @SuccessResponse(OptionsResponseDTO)
    public async createDboption(
        @Body() config: InputDboptionDTO
    ) {
        const options = await this.dboptionService.createConfig(config);
        return { options };
    }

    @Get("/")
    @Summary("Get Dboption")
    @SuccessResponse(OptionsResponseDTO)
    public async getDboption() {
        const options = await this.dboptionService.getConfigs();
        return { options };
    }

    @Get("/source/:name")
    @SuccessResponse(OutputDboptionDTO)
    @Summary("Get source Dboption by name")
    public async getSourceDboptionByName(
        @Param("name") name: string
    ) {
        return this.dboptionService.getSourceConfig(name);
    }

    @Get("/:name")
    @Summary("Get Dboption by name")
    @SuccessResponse(OptionResponseDTO)
    public async getDboptionByName(
        @Param("name") name: string
    ) {
        const option = this.dboptionService.getConfig(name);
        return { option };
    }
}
