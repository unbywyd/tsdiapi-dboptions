import { Type, Static } from "@sinclair/typebox";
import { addSchema } from "@tsdiapi/server";

export interface OutputDboption {
    [key: string]: any;
}

export const InputDboptionDTO = addSchema(Type.Object({
    name: Type.Optional(Type.String()),
    value: Type.Optional(Type.Any()),
}, { $id: 'InputDboptionDTOSchema' }));

export type InputDboptionDTOType = Static<typeof InputDboptionDTO>;


export const OutputDboptionDTO = addSchema(Type.Object({
    id: Type.Optional(Type.String()),
    name: Type.Optional(Type.String()),
    value: Type.Optional(Type.Any()),
    createdAt: Type.Optional(Type.Any({ default: new Date().toISOString() })), 
    updatedAt: Type.Optional(Type.Any({ default: new Date().toISOString() })),
}, { $id: 'OutputDboptionDTOSchema' }));

export const OptionsResponseDTO = addSchema(Type.Object({}, {
    additionalProperties: true,
    $id: 'OptionsResponseDTOSchema'
}));
export type OptionsResponseDTOType = Static<typeof OptionsResponseDTO>;

export type OutputDboptionDTOType = Static<typeof OutputDboptionDTO>;
