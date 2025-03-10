var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { plainToClass } from "class-transformer";
import { Service, Container } from "typedi";
import { OutputDboptionDTO } from "./dboption.dto.js";
import { client } from "@tsdiapi/prisma";
import { toDTO } from "@tsdiapi/server";
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
DboptionConfigService = __decorate([
    Service()
], DboptionConfigService);
export { DboptionConfigService };
let DboptionService = class DboptionService {
    async getValue(name) {
        try {
            const config = await client.dbOption.findUnique({
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
            const dto = Container.get(DboptionConfigService).getDTO();
            const config = await client.dbOption.findUnique({
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
            return toDTO(dto, {
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
            const config = await client.dbOption.findUnique({
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
            return toDTO(OutputDboptionDTO, config);
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
            const dto = Container.get(DboptionConfigService).getDTO();
            const config = {};
            const appKeys = await client.dbOption.findMany({
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
            return plainToClass(dto, config, {
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
            const dtoClass = Container.get(DboptionConfigService).getDTO();
            const config = {};
            config[data.name] = data.value;
            const dto = dtoClass ? toDTO(dtoClass, config) : null;
            const value = dtoClass ? dto[data.name] : data.value;
            const prev = await client.dbOption.findUnique({
                where: {
                    name: data.name
                }
            });
            if (prev) {
                await client.dbOption.update({
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
                await client.dbOption.create({
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
    Service()
], DboptionService);
export default DboptionService;
//# sourceMappingURL=dboption.service.js.map