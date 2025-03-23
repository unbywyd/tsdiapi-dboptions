import { Type } from "@sinclair/typebox";
export const InputDboptionDTO = Type.Object({
    name: Type.Optional(Type.String()),
    value: Type.Optional(Type.Any()),
});
export const OutputDboptionDTO = Type.Object({
    id: Type.Optional(Type.String()),
    name: Type.Optional(Type.String()),
    value: Type.Optional(Type.Any()),
    createdAt: Type.Optional(Type.Any({ default: new Date().toISOString() })),
    updatedAt: Type.Optional(Type.Any({ default: new Date().toISOString() })),
});
export const OptionsResponseDTO = Type.Record(Type.String(), Type.Any());
//# sourceMappingURL=dboption.dto.js.map