"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DboptionController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = __importStar(require("typedi"));
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const dboption_service_1 = __importStar(require("./dboption.service"));
const server_1 = require("@tsdiapi/server");
const dboption_dto_1 = require("./dboption.dto");
let DboptionController = class DboptionController {
    dboptionService;
    constructor(dboptionService) {
        this.dboptionService = dboptionService;
    }
    async createDboption(config) {
        return this.dboptionService.createConfig(config);
    }
    async getDboption() {
        return this.dboptionService.getConfigs();
    }
    /*@JWTGuard({
        validateSession: (session) => {
            return session.role === "ADMIN" ? true : "Only admin can create dboption";
        },
        guardDescription: "Only admin can create dboption"
    })*/
    async getSourceDboptionByName(name) {
        return this.dboptionService.getSourceConfig(name);
    }
    async getDboptionByName(name) {
        return this.dboptionService.getConfig(name);
    }
};
exports.DboptionController = DboptionController;
__decorate([
    (0, routing_controllers_1.Post)("/"),
    (0, server_1.RequestGuard)(async (req) => {
        const dboptionConfig = typedi_1.default.get(dboption_service_1.DboptionConfigService);
        const result = await dboptionConfig.validateAccess(req);
        if (!result) {
            return {
                status: 401,
                message: "Unauthorized"
            };
        }
        return true;
    }),
    (0, server_1.Summary)("Create Dboption"),
    (0, routing_controllers_openapi_1.OpenAPI)({
        security: [{ bearerAuth: [] }],
        description: "This endpoint is only accessible by admin"
    }),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dboption_dto_1.InputDboptionDTO]),
    __metadata("design:returntype", Promise)
], DboptionController.prototype, "createDboption", null);
__decorate([
    (0, routing_controllers_1.Get)("/"),
    (0, server_1.Summary)("Get Dboption"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DboptionController.prototype, "getDboption", null);
__decorate([
    (0, routing_controllers_1.Get)("/source/:name"),
    (0, server_1.SuccessResponse)(dboption_dto_1.OutputDboptionDTO),
    (0, server_1.Summary)("Get source Dboption by name"),
    __param(0, (0, routing_controllers_1.Param)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DboptionController.prototype, "getSourceDboptionByName", null);
__decorate([
    (0, routing_controllers_1.Get)("/:name"),
    (0, server_1.Summary)("Get Dboption by name"),
    __param(0, (0, routing_controllers_1.Param)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DboptionController.prototype, "getDboptionByName", null);
exports.DboptionController = DboptionController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_openapi_1.OpenAPI)({
        tags: ["Dboption"],
    }),
    (0, routing_controllers_1.JsonController)("dboption"),
    __metadata("design:paramtypes", [dboption_service_1.default])
], DboptionController);
//# sourceMappingURL=dboption.controller.js.map