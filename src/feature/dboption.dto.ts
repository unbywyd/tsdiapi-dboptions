import { Type, Static } from "@sinclair/typebox";

export interface OutputDboption {
    [key: string]: any;
}

export const InputDboptionDTO = Type.Object({
    name: Type.Optional(Type.String()),
    value: Type.Optional(Type.Any()),
});

export type InputDboptionDTOType = Static<typeof InputDboptionDTO>;


export const OutputDboptionDTO = Type.Object({
    id: Type.Optional(Type.String()),
    name: Type.Optional(Type.String()),
    value: Type.Optional(Type.Any()),
    createdAt: Type.Optional(Type.Any({ default: new Date().toISOString() })), 
    updatedAt: Type.Optional(Type.Any({ default: new Date().toISOString() })),
});

export const OptionsResponseDTO = Type.Record(Type.String(), Type.Any());
export type OptionsResponseDTOType = Static<typeof OptionsResponseDTO>;

export type OutputDboptionDTOType = Static<typeof OutputDboptionDTO>;
