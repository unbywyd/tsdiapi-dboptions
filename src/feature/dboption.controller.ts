import {
    JsonController,
    Post,
    Body,
    Get,
    Param
} from "routing-controllers";
import Container, { Service } from "typedi";
import { OpenAPI } from "routing-controllers-openapi";
import DboptionService, { DboptionConfigService, Dboptions } from "./dboption.service";
import { SuccessResponse, Summary, RequestGuard } from "@tsdiapi/server";
import { InputDboptionDTO, OutputDboptionDTO } from "./dboption.dto";
import { Request, Response, NextFunction } from "express";

class RecordDTO { }
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
    @SuccessResponse(RecordDTO)
    public async createDboption(
        @Body() config: InputDboptionDTO
    ) {
        return this.dboptionService.createConfig(config);
    }

    @Get("/")
    @SuccessResponse(RecordDTO)
    @Summary("Get Dboption")
    public async getDboption() {
        return this.dboptionService.getConfigs();
    }

    /*@JWTGuard({
        validateSession: (session) => {
            return session.role === "ADMIN" ? true : "Only admin can create dboption";
        },
        guardDescription: "Only admin can create dboption"
    })*/

    @Get("/source/:name")
    @SuccessResponse(OutputDboptionDTO)
    @Summary("Get source Dboption by name")
    public async getSourceDboptionByName(
        @Param("name") name: string
    ) {
        return this.dboptionService.getSourceConfig(name);
    }

    @Get("/:name")
    @SuccessResponse(RecordDTO)
    @Summary("Get Dboption by name")
    public async getDboptionByName(
        @Param("name") name: string
    ) {
        return this.dboptionService.getConfig(name);
    }
}
