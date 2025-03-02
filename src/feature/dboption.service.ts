import { plainToClass } from "class-transformer";
import Container, { Service } from "typedi";
import { InputDboptionDTO, OutputDboptionDTO } from "./dboption.dto";
import { client } from "@tsdiapi/prisma";
import { toDTO } from "@tsdiapi/server";
import type { Request } from "express";

export type ClassInstance<T> = new (...args: any[]) => T;

@Service()
export class DboptionConfigService {
    config: Record<string, any> = {};
    dto: ClassInstance<any> | null = null;
    setDTO(dto: ClassInstance<any>) {
        this.dto = dto;
    }
    getDTO() {
        return this.dto;
    }
    requestGuard: (req: Request) => boolean = () => true;
    setRequestGuard(guard: (req: Request) => boolean) {
        this.requestGuard = guard;
    }
    async validateAccess(req: Request): Promise<boolean> {
        return this.requestGuard(req);
    }
}

export interface Dboptions {
    [key: string]: any;
}

@Service()
export default class DboptionService {
    async getValue<K extends keyof Dboptions>(name: K): Promise<Dboptions[K] | null> {
        try {
            const config = await client.dbOption.findUnique({
                where: {
                    name: name
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
            const dto = Container.get(DboptionConfigService).getDTO();
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
            if (!dto) {
                return {
                    [name]: config.value
                } as Dboptions;
            }
            return toDTO(dto, {
                [name]: config.value
            });
        } catch (e) {
            console.error(e);
            return {
                [name]: null as any
            } as Dboptions;
        }
    }

    async getSourceConfig(name: string): Promise<OutputDboptionDTO> {
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
                } as OutputDboptionDTO;
            }
            return toDTO(OutputDboptionDTO, config);
        } catch (e) {
            console.error(e);
            return {
                name: name,
                value: null as any
            } as OutputDboptionDTO;
        }
    }

    async getConfigs(): Promise<Dboptions> {
        try {
            const dto = Container.get(DboptionConfigService).getDTO();
            const config: Record<string, any> = {};
            const appKeys = await client.dbOption.findMany({
                orderBy: {
                    name: 'asc'
                }
            });
            for (const key of appKeys) {
                config[key.name] = key.value;
            }
            if (!dto) {
                return config as Dboptions;
            }
            return plainToClass(dto, config, {
                exposeDefaultValues: true,
                excludeExtraneousValues: true,
            });
        } catch (e) {
            console.error(e);
            return {} as Dboptions;
        }
    }

    async createConfig(data: InputDboptionDTO): Promise<Dboptions> {
        try {
            const dtoClass = Container.get(DboptionConfigService).getDTO();
            const config: Partial<Record<string, any>> = {};
            config[data.name] = data.value;
            const dto = dtoClass ? toDTO<any>(dtoClass, config) : null;
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
