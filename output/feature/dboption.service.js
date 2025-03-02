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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DboptionConfigService = void 0;
const class_transformer_1 = require("class-transformer");
const typedi_1 = __importStar(require("typedi"));
const dboption_dto_1 = require("./dboption.dto");
const prisma_1 = require("@tsdiapi/prisma");
const server_1 = require("@tsdiapi/server");
let DboptionConfigService = class DboptionConfigService {
    config = {};
    dto = null;
    setDTO(dto) {
        this.dto = dto;
    }
    getDTO() {
        return this.dto;
    }
    requestGuard = () => true;
    setRequestGuard(guard) {
        this.requestGuard = guard;
    }
    async validateAccess(req) {
        try {
            const result = await this.requestGuard(req);
            return result;
        }
        catch (e) {
            console.error(e);
            return false;
        }
    }
};
exports.DboptionConfigService = DboptionConfigService;
exports.DboptionConfigService = DboptionConfigService = __decorate([
    (0, typedi_1.Service)()
], DboptionConfigService);
let DboptionService = class DboptionService {
    async getValue(name) {
        try {
            const config = await prisma_1.client.dbOption.findUnique({
                where: {
                    name: name
                }
            });
            if (!config) {
                return null;
            }
            return config.value;
        }
        catch (e) {
            console.error(e);
            return null;
        }
    }
    async getConfig(name) {
        try {
            const dto = typedi_1.default.get(DboptionConfigService).getDTO();
            const config = await prisma_1.client.dbOption.findUnique({
                where: {
                    name: name
                }
            });
            if (!config) {
                return {
                    [name]: null
                };
            }
            if (!dto) {
                return {
                    [name]: config.value
                };
            }
            return (0, server_1.toDTO)(dto, {
                [name]: config.value
            });
        }
        catch (e) {
            console.error(e);
            return {
                [name]: null
            };
        }
    }
    async getSourceConfig(name) {
        try {
            const config = await prisma_1.client.dbOption.findUnique({
                where: {
                    name: name
                }
            });
            if (!config) {
                return {
                    name: name,
                    value: null
                };
            }
            return (0, server_1.toDTO)(dboption_dto_1.OutputDboptionDTO, config);
        }
        catch (e) {
            console.error(e);
            return {
                name: name,
                value: null
            };
        }
    }
    async getConfigs() {
        try {
            const dto = typedi_1.default.get(DboptionConfigService).getDTO();
            const config = {};
            const appKeys = await prisma_1.client.dbOption.findMany({
                orderBy: {
                    name: 'asc'
                }
            });
            for (const key of appKeys) {
                config[key.name] = key.value;
            }
            if (!dto) {
                return config;
            }
            return (0, class_transformer_1.plainToClass)(dto, config, {
                exposeDefaultValues: true,
                excludeExtraneousValues: true,
            });
        }
        catch (e) {
            console.error(e);
            return {};
        }
    }
    async createConfig(data) {
        try {
            const dtoClass = typedi_1.default.get(DboptionConfigService).getDTO();
            const config = {};
            config[data.name] = data.value;
            const dto = dtoClass ? (0, server_1.toDTO)(dtoClass, config) : null;
            const value = dtoClass ? dto[data.name] : data.value;
            const prev = await prisma_1.client.dbOption.findUnique({
                where: {
                    name: data.name
                }
            });
            if (prev) {
                await prisma_1.client.dbOption.update({
                    where: {
                        name: data.name
                    },
                    data: {
                        value: value
                    }
                });
                return this.getConfigs();
            }
            else {
                await prisma_1.client.dbOption.create({
                    data: {
                        name: data.name,
                        value: value
                    }
                });
                return this.getConfigs();
            }
        }
        catch (e) {
            console.error(e);
            return {};
        }
    }
};
DboptionService = __decorate([
    (0, typedi_1.Service)()
], DboptionService);
exports.default = DboptionService;
//# sourceMappingURL=dboption.service.js.map