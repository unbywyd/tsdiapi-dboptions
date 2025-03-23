import { Type, Static } from "@sinclair/typebox";

export const Input{{className}}DTO = Type.Object({
    name: Type.Optional(Type.String()),
    value: Type.Optional(Type.Any()),
});

export type Input{{className}}DTOType = Static<typeof Input{{className}}DTO>;

export const Output{{className}}DTO = Type.Object({
    id: Type.Optional(Type.String()),
    name: Type.Optional(Type.String()),
    value: Type.Optional(Type.Any()),
    createdAt: Type.Optional(Type.String({ default: new Date().toISOString() })),
    updatedAt: Type.Optional(Type.String({ default: new Date().toISOString() })),
});

export type Output{{className}}DTOType = Static<typeof Output{{className}}DTO>;

export const {{pascalCase pluginName}} = Type.Record(Type.String(), Type.Any());
export type {{pascalCase pluginName}}Type = Static<typeof {{pascalCase pluginName}}>;