import { Type, Static } from "@sinclair/typebox";
import { addSchema } from "@tsdiapi/server";

export const Input{{className}}DTO = addSchema(Type.Object({
    name: Type.Optional(Type.String()),
    value: Type.Optional(Type.Any()),
}, { $id: 'Input{{className}}DTOSchema' }));

export type Input{{className}}DTOType = Static<typeof Input{{className}}DTO>;

export const Output{{className}}DTO = addSchema(Type.Object({
    id: Type.Optional(Type.String()),
    name: Type.Optional(Type.String()),
    value: Type.Optional(Type.Any()),
    createdAt: Type.Optional(Type.String({ default: new Date().toISOString() })),
    updatedAt: Type.Optional(Type.String({ default: new Date().toISOString() })),
}, { $id: 'Output{{className}}DTOSchema' }));

export type Output{{className}}DTOType = Static<typeof Output{{className}}DTO>;

export const {{pascalCase pluginName}} = addSchema(Type.Object({}, {
    additionalProperties: true,
    $id: '{{pascalCase pluginName}}Schema'
}));
export type {{pascalCase pluginName}}Type = Static<typeof {{pascalCase pluginName}}>;