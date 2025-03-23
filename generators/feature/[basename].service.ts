import { Service } from "typedi";
import { Type, Static } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { client } from "@tsdiapi/prisma";
import { Input{{className}}DTO, Output{{className}}DTO, {{pascalCase pluginName}} } from "./{{kebabCase name}}.dto.js";

@Service()
export default class {{className}}Service {
    async getValue<K extends keyof Static<typeof {{pascalCase pluginName}}>>(name: K): Promise<Static<typeof {{pascalCase pluginName}}>[K] | null> {
        try {
            const config = await client.{{camelcase entityName}}.findUnique({
                where: {
                    name: name as string
                }
            });
            if (!config) {
                return null;
            }
            return config.value as Static<typeof {{pascalCase pluginName}}>[K];
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async getConfig(name: string): Promise<Static<typeof {{pascalCase pluginName}}>> {
        try {
            const config = await client.{{camelcase entityName}}.findUnique({
                where: {
                    name: name
                }
            });
            if (!config) {
                return {
                    [name]: null as any
                } as Static<typeof {{pascalCase pluginName}}>;
            }
            return Value.Cast({{pascalCase pluginName}}, {
                [name]: config.value
            });
        } catch (e) {
            console.error(e);
            return {
                [name]: null as any
            } as Static<typeof {{pascalCase pluginName}}>;
        }
    }

    async getSourceConfig(name: string): Promise<Static<typeof Output{{className}}DTO>> {
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
                } as Static<typeof Output{{className}}DTO>;
            }
            return Value.Cast(Output{{className}}DTO, config);
        } catch (e) {
            console.error(e);
            return {
                name: name,
                value: null as any
            } as Static<typeof Output{{className}}DTO>;
        }
    }

    async getConfigs(): Promise<Static<typeof {{pascalCase pluginName}}>> {
        try {
            const config: Record<string, any> = {};
            const appKeys = await client.{{camelcase entityName}}.findMany({
                orderBy: {
                    name: 'asc'
                }
            });
            for (const key of appKeys) {
                config[key.name] = key.value;
            }
            return Value.Cast({{pascalCase pluginName}}, config);
        } catch (e) {
            console.error(e);
            return {} as Static<typeof {{pascalCase pluginName}}>;
        }
    }

    async createConfig(data: Static<typeof Input{{className}}DTO>): Promise<Static<typeof {{pascalCase pluginName}}>> {
        try {
            const config: Partial<Record<string, any>> = {};
            config[data.name] = data.value;
            const dto = Value.Cast({{pascalCase pluginName}}, config);
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
            return {} as Static<typeof {{pascalCase pluginName}}>;
        }
    }
}