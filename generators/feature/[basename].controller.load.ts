import { Container } from "typedi";
import { AppContext, addSchema } from "@tsdiapi/server";
import { Type } from "@sinclair/typebox";
import { Input{{className}}DTO, Output{{className}}DTO, {{pascalCase pluginName}} } from "./{{kebabCase name}}.dto.js";
import {{className}}Service from "./{{kebabCase name}}.service.js";
import { Static } from "@sinclair/typebox";

export const FastifyError = addSchema(Type.Object({
    message: Type.String(),
}, { $id: '{{className}}FastifyErrorSchema' }));

export default function controllers({ useRoute }: AppContext) {
    const {{camelCase name}}Service = Container.get({{className}}Service);

    // Схема для параметра name используется в нескольких маршрутах
    const {{className}}NameParamSchema = addSchema(Type.Object({
        name: Type.String()
    }, { $id: '{{className}}NameParamSchema' }));

    useRoute()
        .post("/{{kebabCase name}}")
        .code(403, FastifyError)
        .auth('bearer')
        .code(200, {{pascalCase pluginName}})
        .description("Create {{className}}")
        .summary("Create {{className}}")
        .tags(["{{className}}"])
        .body(Input{{className}}DTO)
        .guard(async (req) => {
            const token = req.headers.authorization;
            if (!token) {
                return {
                    status: 403,
                    data: {
                        message: "Unauthorized access. Token is required."
                    }
                };
            }
            return true;
        })
        .handler(async (req, res) => {
            const config = req.body as Static<typeof Input{{className}}DTO>;
            const options = await {{camelCase name}}Service.createConfig(config);
            return {
                status: 200,
                data: options
            };
        })
        .build();

    useRoute()
        .get("/{{kebabCase name}}")
        .code(200, {{pascalCase pluginName}})
        .description("Get {{className}}")
        .summary("Get {{className}}")
        .tags(["{{className}}"])
        .handler(async () => {
            const options = await {{camelCase name}}Service.getConfigs();
            return {
                status: 200,
                data: options
            };
        })
        .build();

    useRoute()
        .get("/{{kebabCase name}}/source/:name")
        .code(200, Output{{className}}DTO)
        .description("Get source {{className}} by name")
        .summary("Get source {{className}} by name")
        .tags(["{{className}}"])
        .params({{className}}NameParamSchema)
        .handler(async (req) => {
            const name = req.params.name;
            const options = await {{camelCase name}}Service.getSourceConfig(name);
            return {
                status: 200,
                data: options
            };
        })
        .build();

    useRoute()
        .get("/{{kebabCase name}}/:name")
        .code(200, {{pascalCase pluginName}})
        .description("Get {{className}} by name")
        .summary("Get {{className}} by name")
        .tags(["{{className}}"])
        .params({{className}}NameParamSchema)
        .handler(async (req) => {
            const name = req.params.name;
            const options = await {{camelCase name}}Service.getConfig(name);
            return {
                status: 200,
                data: options
            };
        })
        .build();
}