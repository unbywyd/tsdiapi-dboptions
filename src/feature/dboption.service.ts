import { Service, Container } from "typedi";
import { InputDboptionDTOType, OutputDboptionDTO, OutputDboptionDTOType } from "./dboption.dto.js";
import { FastifyRequest } from "fastify";
import { Value } from "@sinclair/typebox/value";
import { TObject } from "@sinclair/typebox";
import { client } from "@tsdiapi/prisma";

export type ClassInstance<T> = new (...args: any[]) => T;
export type GuardType = (req: FastifyRequest) => Promise<boolean> | boolean;
@Service()
export class DboptionConfigService {
    config: Record<string, any> = {};
    tSchema: TObject = null;
    setDTO(tSchema: TObject) {
        this.tSchema = tSchema;
    }
    getTSchema() {
        return this.tSchema;
    }
    requestGuard: GuardType = () => true;
    setRequestGuard(guard: GuardType) {
        this.requestGuard = guard;
    }
    async validateAccess(req: FastifyRequest): Promise<boolean> {
        try {
            const result = await this.requestGuard(req);
            return result;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}

export interface Dboptions {
    [key: string]: never;
}

@Service()
export default class DboptionService {
    async getValue<K extends keyof Dboptions>(name: K): Promise<Dboptions[K] | null> {
        try {
            const config = await client.dbOption.findUnique({
                where: {
                    name: name as string
                }
            });
            if (!config) {
                return null;
            }
            return config.value as Dboptions[K];
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async getConfig(name: string): Promise<Dboptions> {
        try {
            const tSchema = Container.get(DboptionConfigService).getTSchema();
            const config = await client.dbOption.findUnique({
                where: {
                    name: name
                }
            });
            if (!config) {
                return {
                    [name]: null as any
                } as Dboptions;
            }
            if (!tSchema) {
                return {
                    [name]: config.value
                } as Dboptions;
            }

            return Value.Cast(tSchema, {
                [name]: config.value
            }) as Dboptions;
        } catch (e) {
            console.error(e);
            return {
                [name]: null as any
            } as Dboptions;
        }
    }

    async getSourceConfig(name: string): Promise<OutputDboptionDTOType> {
        try {
            const config = await client.dbOption.findUnique({
                where: {
                    name: name
                }
            });
            if (!config) {
                return {
                    name: name,
                    value: null as any
                } as OutputDboptionDTOType;
            }
            return Value.Cast(OutputDboptionDTO, config) as OutputDboptionDTOType;
        } catch (e) {
            console.error(e);
            return {
                name: name,
                value: null as any
            } as OutputDboptionDTOType;
        }
    }

    async getConfigs(): Promise<Dboptions> {
        try {
            const tSchema = Container.get(DboptionConfigService).getTSchema();
            const config: Record<string, any> = {};
            const appKeys = await client.dbOption.findMany({
                orderBy: {
                    name: 'asc'
                }
            });
            for (const key of appKeys) {
                config[key.name] = key.value;
            }
            if (!tSchema) {
                return config as Dboptions;
            }
            return Value.Cast(tSchema, config) as Dboptions;
        } catch (e) {
            console.error(e);
            return {} as Dboptions;
        }
    }

    async createConfig(data: InputDboptionDTOType): Promise<Dboptions> {
        try {
            const tSchema = Container.get(DboptionConfigService).getTSchema();
            const config: Partial<Record<string, any>> = {};
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
            } else {
                await client.dbOption.create({
                    data: {
                        name: data.name,
                        value: value
                    }
                });
                return this.getConfigs();
            }
        } catch (e) {
            console.error(e);
            return {} as Dboptions;
        }
    }
}
