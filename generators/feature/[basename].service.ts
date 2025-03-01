import { plainToClass } from "class-transformer";
import { Service } from "typedi";
import { Input{{className}}DTO, Output{{className}}DTO } from "./{{kebabcase}}.dto";
import { {{pascalCasePluginName}}Options } from "@base/dboptions.config";
import { client } from "@tsdiapi/prisma";
import { toDTO } from "@tsdiapi/server";

@Service()
export default class {{className}}Service {
    async getValue<K extends keyof {{pascalCasePluginName}}Options>(name: K): Promise<{{pascalCasePluginName}}Options[K] | null> {
        try {
            const config = await client.{{camelcase}}.findUnique({
                where: {
                    name: name
                }
            });
            if (!config) {
                return null;
            }
            return config.value as {{pascalCasePluginName}}Options[K];
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async getConfig(name: string): Promise<{{pascalCasePluginName}}Options> {
        try {
            const config = await client.{{camelcase}}.findUnique({
                where: {
                    name: name
                }
            });
            if (!config) {
                return {
                    [name]: null as any
                } as {{pascalCasePluginName}}Options;
            }
            return toDTO({{pascalCasePluginName}}Options, {
                [name]: config.value
            });
        } catch (e) {
            console.error(e);
            return {
                [name]: null as any
            } as {{pascalCasePluginName}}Options;
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

    async getConfigs(): Promise<{{pascalCasePluginName}}Options> {
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
            return plainToClass({{pascalCasePluginName}}Options, config, {
                exposeDefaultValues: true,
                excludeExtraneousValues: true,
            });
        } catch (e) {
            console.error(e);
            return {} as {{pascalCasePluginName}}Options;
        }
    }

    async createConfig(data: Input{{className}}DTO): Promise<{{pascalCasePluginName}}Options> {
        try {
            const config: Partial<Record<string, any>> = {};
            config[data.name] = data.value;
            const dto = toDTO<any>({{pascalCasePluginName}}Options, config);
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
            return {} as {{pascalCasePluginName}}Options;
        }
    }
}
