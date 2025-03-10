var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { JsonController, Post, Body, Get, Param } from "routing-controllers";
import { Service, Container } from "typedi";
import { OpenAPI } from "routing-controllers-openapi";
import DboptionService, { DboptionConfigService } from "./dboption.service.js";
import { SuccessResponse, Summary, RequestGuard } from "@tsdiapi/server";
import { InputDboptionDTO, OutputDboptionDTO } from "./dboption.dto.js";
import { Expose } from "class-transformer";
import { IsObject } from "class-validator";
export class OptionsResponseDTO {
    options = {};
}
__decorate([
    Expose(),
    IsObject(),
    __metadata("design:type", Object)
], OptionsResponseDTO.prototype, "options", void 0);
export class OptionResponseDTO {
    option = {};
}
__decorate([
    Expose(),
    IsObject(),
    __metadata("design:type", Object)
], OptionResponseDTO.prototype, "option", void 0);
let DboptionController = class DboptionController {
    dboptionService;
    constructor(dboptionService) {
        this.dboptionService = dboptionService;
    }
    async createDboption(config) {
        const options = await this.dboptionService.createConfig(config);
        return { options };
    }
    async getDboption() {
        const options = await this.dboptionService.getConfigs();
        return { options };
    }
    async getSourceDboptionByName(name) {
        return this.dboptionService.getSourceConfig(name);
    }
    async getDboptionByName(name) {
        const option = this.dboptionService.getConfig(name);
        return { option };
    }
};
__decorate([
    Post("/"),
    RequestGuard(async (req) => {
        const dboptionConfig = Container.get(DboptionConfigService);
        const result = await dboptionConfig.validateAccess(req);
        if (!result) {
            return {
                status: 401,
                message: "Unauthorized"
            };
        }
        return true;
    }),
    Summary("Create Dboption"),
    OpenAPI({
        security: [{ bearerAuth: [] }],
        description: "This endpoint is only accessible by admin"
    }),
    SuccessResponse(OptionsResponseDTO),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [InputDboptionDTO]),
    __metadata("design:returntype", Promise)
], DboptionController.prototype, "createDboption", null);
__decorate([
    Get("/"),
    Summary("Get Dboption"),
    SuccessResponse(OptionsResponseDTO),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DboptionController.prototype, "getDboption", null);
__decorate([
    Get("/source/:name"),
    SuccessResponse(OutputDboptionDTO),
    Summary("Get source Dboption by name"),
    __param(0, Param("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DboptionController.prototype, "getSourceDboptionByName", null);
__decorate([
    Get("/:name"),
    Summary("Get Dboption by name"),
    SuccessResponse(OptionResponseDTO),
    __param(0, Param("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DboptionController.prototype, "getDboptionByName", null);
DboptionController = __decorate([
    Service(),
    OpenAPI({
        tags: ["Dboption"],
    }),
    JsonController("dboption"),
    __metadata("design:paramtypes", [DboptionService])
], DboptionController);
export { DboptionController };
//# sourceMappingURL=dboption.controller.js.map