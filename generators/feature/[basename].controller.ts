import {
    JsonController,
    Post,
    Body,
    Get,
    Param
} from "routing-controllers";
import { Service } from "typedi";
import { OpenAPI } from "routing-controllers-openapi";
import type { Request  } from "express";

import {{className}}Service from "./{{kebabCase name}}.service.js";
//import { JWTGuard } from "@tsdiapi/jwt-auth";
import {  {{pascalCase pluginName}} } from "@base/{{pluginName}}.config.js";
import { Input{{className}}DTO, Output{{className}}DTO } from "./{{kebabCase name}}.dto.js";
import { RequestGuard, SuccessResponse, Summary } from "@tsdiapi/server";

@Service()
@OpenAPI({
    tags: ["{{className}}"],
})
@JsonController("{{kebabCase name}}")
export class {{className}}Controller {
    constructor(private {{camelCase name}}Service: {{className}}Service) {}

    @Get("/")
    @SuccessResponse( {{pascalCase pluginName}})
    @Summary("Get {{className}}")
    public async get{{className}}() {
        return this.{{camelCase name}}Service.getConfigs();
    }

    /*@JWTGuard({
        validateSession: (session) => {
            return session.role === "ADMIN" ? true : "Only admin can create {{kebabCase name}}";
        },
        guardDescription: "Only admin can create {{kebabCase name}}"
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
    @SuccessResponse( {{pascalCase pluginName}})
    public async create{{className}}(
        @Body() config: Input{{className}}DTO
    ) {
        return this.{{camelCase name}}Service.createConfig(config);
    }

    @Get("/source/:name")
    @SuccessResponse(Output{{className}}DTO)
    @Summary("Get source {{className}} by name")
    public async getSource{{className}}ByName(
        @Param("name") name: string
    ) {
        return this.{{camelCase name}}Service.getSourceConfig(name);
    }

    @Get("/:name")
    @SuccessResponse( {{pascalCase pluginName}})
    @Summary("Get {{className}} by name")
    public async get{{className}}ByName(
        @Param("name") name: string
    ) {
        return this.{{camelCase name}}Service.getConfig(name);
    }
}
