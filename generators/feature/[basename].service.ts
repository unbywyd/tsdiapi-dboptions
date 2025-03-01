import { plainToClass } from "class-transformer";
import { Service } from "typedi";
import { Input{{className}}DTO, Output{{className}}DTO } from "./{{kebabCase name}}.dto";
import { {{pascalCase pluginName}} } from "@base/{{pluginName}}.config";
import { client } from "@tsdiapi/prisma";
import { toDTO } from "@tsdiapi/server";

@Service()
export default class {{className}}Service {
    async getValue<K extends keyof  {{pascalCase pluginName}}>(name: K): Promise< {{pascalCase pluginName}}[K] | null> {
        try {
            const config = await client.{{camelcase entityName}}.findUnique({
                where: {
                    name: name
                }
            });
            if (!config) {
                return null;
            }
            return config.value as  {{pascalCase pluginName}}[K];
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async getConfig(name: string): Promise< {{pascalCase pluginName}}> {
        try {
            const config = await client.{{camelcase entityName}}.findUnique({
                where: {
                    name: name
                }
            });
            if (!config) {
                return {
                    [name]: null as any
                } as  {{pascalCase pluginName}};
            }
            return toDTO( {{pascalCase pluginName}}, {
                [name]: config.value
            });
        } catch (e) {
            console.error(e);
            return {
                [name]: null as any
            } as  {{pascalCase pluginName}};
        }
    }

    async getSourceConfig(name: string): Promise<Output{{className}}DTO> {
        try {
            const config = await client.{{camelcase entityName}}.findUnique({
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

    async getConfigs(): Promise< {{pascalCase pluginName}}> {
        try {
            const config: Record<string, any> = {};
            const appKeys = await client.{{camelcase entityName}}.findMany({
                orderBy: {
                    name: 'asc'
                }
            });
            appKeys.forEach((key) => {
                config[key.name] = key.value;
            });
            return plainToClass( {{pascalCase pluginName}}, config, {
                exposeDefaultValues: true,
                excludeExtraneousValues: true,
            });
        } catch (e) {
            console.error(e);
            return {} as  {{pascalCase pluginName}};
        }
    }

    async createConfig(data: Input{{className}}DTO): Promise< {{pascalCase pluginName}}> {
        try {
            const config: Partial<Record<string, any>> = {};
            config[data.name] = data.value;
            const dto = toDTO<any>( {{pascalCase pluginName}}, config);
            const value = dto[data.name];
            const prev = await client.{{camelcase entityName}}.findUnique({
                where: {
                    name: data.name
                }
            });
            if (prev) {
                await client.{{camelcase entityName}}.update({
                    where: {
                        name: data.name
                    },
                    data: {
                        value: value
                    }
                });
                return this.getConfigs();
            } else {
                await client.{{camelcase entityName}}.create({
                    data: {
                        name: data.name,
                        value: value
                    }
                });
                return this.getConfigs();
            }
        } catch (e) {
            console.error(e);
            return {} as  {{pascalCase pluginName}};
        }
    }
}
