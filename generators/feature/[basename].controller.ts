import {
    JsonController,
    Post,
    Body,
    Get,
    Param
} from "routing-controllers";
import { Service } from "typedi";
import { OpenAPI } from "routing-controllers-openapi";
import {{className}}Service from "./{{kebabcase}}.service";
import { SuccessResponse, Summary } from "@tsdiapi/server";
//import { JWTGuard } from "@tsdiapi/jwt-auth";
import { {{pascalCasePluginName}}Options } from "@base/dboptions.config";
import { Input{{className}}DTO, Output{{className}}DTO } from "./{{kebabcase}}.dto";
import { Request, Response, NextFunction } from "express";
import { RequestGuard } from "@tsdiapi/server";

@Service()
@OpenAPI({
    tags: ["{{className}}"],
})
@JsonController("{{kebabcase}}")
export class {{className}}Controller {
    constructor(private {{camelcase}}Service: {{className}}Service) {}

    @Get("/")
    @SuccessResponse({{pascalCasePluginName}}Options)
    @Summary("Get {{className}}")
    public async get{{className}}() {
        return this.{{camelcase}}Service.getConfigs();
    }

    /*@JWTGuard({
        validateSession: (session) => {
            return session.role === "ADMIN" ? true : "Only admin can create {{kebabcase}}";
        },
        guardDescription: "Only admin can create {{kebabcase}}"
    })*/
    @Post("/")
    @RequestGuard(async (req: Request) => {
        const token = req.headers.authorization;
        if (!token) {
            return { message: "Unauthorized access. Token is required.", status: 401 };
        }
    
        /**
         * Checks if the provided token is valid.
         * 
         * @remarks
         * This is just an example and should be implemented properly in a real-world scenario.
         * In a real application, you should verify the token using a secure method such as JWT verification.
         * 
         * @param token - The token to be validated.
         * @returns `true` if the token is valid, otherwise `false`.
         */
        const isValid = token === "VALID_TOKEN"; 
        if (!isValid) {
            return { message: "Invalid token", status: 403 };
        }
    
        return true;
    })
    @Summary("Create {{className}}")
    @SuccessResponse({{pascalCasePluginName}}Options)
    public async create{{className}}(
        @Body() config: Input{{className}}DTO
    ) {
        return this.{{camelcase}}Service.createConfig(config);
    }

    @Get("/source/:name")
    @SuccessResponse(Output{{className}}DTO)
    @Summary("Get source {{className}} by name")
    public async getSource{{className}}ByName(
        @Param("name") name: string
    ) {
        return this.{{camelcase}}Service.getSourceConfig(name);
    }

    @Get("/:name")
    @SuccessResponse({{pascalCasePluginName}}Options)
    @Summary("Get {{className}} by name")
    public async get{{className}}ByName(
        @Param("name") name: string
    ) {
        return this.{{camelcase}}Service.getConfig(name);
    }
}
