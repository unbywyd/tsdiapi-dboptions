var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Service, Container } from "typedi";
import { OutputDboptionDTO } from "./dboption.dto.js";
import { Value } from "@sinclair/typebox/value";
import { client } from "@tsdiapi/prisma";
let DboptionConfigService = class DboptionConfigService {
    config = {};
    tSchema = null;
    setDTO(tSchema) {
        this.tSchema = tSchema;
    }
    getTSchema() {
        return this.tSchema;
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
            const tSchema = Container.get(DboptionConfigService).getTSchema();
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
            if (!tSchema) {
                return {
                    [name]: config.value
                };
            }
            return Value.Cast(tSchema, {
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
            return Value.Cast(OutputDboptionDTO, config);
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
            const tSchema = Container.get(DboptionConfigService).getTSchema();
            const config = {};
            const appKeys = await client.dbOption.findMany({
                orderBy: {
                    name: 'asc'
                }
            });
            for (const key of appKeys) {
                config[key.name] = key.value;
            }
            if (!tSchema) {
                return config;
            }
            return Value.Cast(tSchema, config);
        }
        catch (e) {
            console.error(e);
            return {};
        }
    }
    async createConfig(data) {
        try {
            const tSchema = Container.get(DboptionConfigService).getTSchema();
            const config = {};
            config[data.name] = data.value;
            if (tSchema && !(data.name in tSchema)) {
                throw new Error(`The key ${data.name} is not in the config.`);
            }
            const dto = tSchema ? Value.Cast(tSchema, config) : null;
            const value = tSchema ? dto[data.name] : data.value;
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