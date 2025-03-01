import { plainToClass } from "class-transformer";
import { Service } from "typedi";
import { Input{{className}}DTO, Output{{className}}DTO } from "./{{kebabcase}}.dto";
import { {{className}}Options } from "@base/{{kebabcase}}.dboptions.config";
import { client } from "@tsdiapi/prisma";
import { toDTO } from "@tsdiapi/server";

@Service()
export default class {{className}}Service {
    async getValue<K extends keyof {{className}}Options>(name: K): Promise<{{className}}Options[K] | null> {
        try {
            const config = await client.{{camelcase}}.findUnique({
                where: {
                    name: name
                }
            });
            if (!config) {
                return null;
            }
            return config.value as {{className}}Options[K];
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async getConfig(name: string): Promise<{{className}}Options> {
        try {
            const config = await client.{{camelcase}}.findUnique({
                where: {
                    name: name
                }
            });
            if (!config) {
                return {
                    [name]: null as any
                } as {{className}}Options;
            }
            return toDTO({{className}}Options, {
                [name]: config.value
            });
        } catch (e) {
            console.error(e);
            return {
                [name]: null as any
            } as {{className}}Options;
        }
    }

    async getSourceConfig(name: string): Promise<Output{{className}}DTO> {
        try {
            const config = await client.{{camelcase}}.findUnique({
                where: {
                    name: name
                }
            });
            if (!config) {
                return {
                    name: name,
                    value: null as any
                } as Output{{className}}DTO;
            }
            return toDTO(Output{{className}}DTO, config);
        } catch (e) {
            console.error(e);
            return {
                name: name,
                value: null as any
            } as Output{{className}}DTO;
        }
    }

    async getConfigs(): Promise<{{className}}Options> {
        try {
            const config: Record<string, any> = {};
            const appKeys = await client.{{camelcase}}.findMany({
                orderBy: {
                    name: 'asc'
                }
            });
            appKeys.forEach((key) => {
                config[key.name] = key.value;
            });
            return plainToClass({{className}}Options, config, {
                exposeDefaultValues: true,
                excludeExtraneousValues: true,
            });
        } catch (e) {
            console.error(e);
            return {} as {{className}}Options;
        }
    }

    async createConfig(data: Input{{className}}DTO): Promise<{{className}}Options> {
        try {
            const config: Partial<Record<string, any>> = {};
            config[data.name] = data.value;
            const dto = toDTO<any>({{className}}Options, config);
            const value = dto[data.name];
            const prev = await client.{{camelcase}}.findUnique({
                where: {
                    name: data.name
                }
            });
            if (prev) {
                await client.{{camelcase}}.update({
                    where: {
                        name: data.name
                    },
                    data: {
                        value: value
                    }
                });
                return this.getConfigs();
            } else {
                await client.{{camelcase}}.create({
                    data: {
                        name: data.name,
                        value: value
                    }
                });
                return this.getConfigs();
            }
        } catch (e) {
            console.error(e);
            return {} as {{className}}Options;
        }
    }
}
