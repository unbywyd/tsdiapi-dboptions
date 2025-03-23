
import { Container } from "typedi";
import DboptionService, { DboptionConfigService, Dboptions } from "./dboption.service.js";
import { AppContext } from "@tsdiapi/server";
import { Type } from "@sinclair/typebox";
import { InputDboptionDTO, OptionsResponseDTO, OutputDboptionDTO } from "./dboption.dto.js";

export const FastifyError = Type.Object({
    message: Type.String(),
});
export default function controllers({ useRoute }: AppContext) {
    const dboptionService = Container.get(DboptionService);
    useRoute()
        .post("/dboption")
        .code(401, FastifyError)
        .auth('bearer')
        .code(200, OptionsResponseDTO)
        .description("Create Dboption")
        .summary("Create Dboption")
        .tags(["Dboption"])
        .body(InputDboptionDTO)
        .guard(async (req) => {
            const dboptionConfig = Container.get(DboptionConfigService);
            const result = await dboptionConfig.validateAccess(req);
            if (!result) {
                return {
                    status: 401,
                    data: {
                        message: "Unauthorized"
                    }
                };
            }
            return true;
        })
        .handler(async (req, res) => {
            const config = req.body as Dboptions;
            const options = await dboptionService.createConfig(config);
            return {
                status: 200,
                data: options
            }
        }).build();

    useRoute()
        .get("/dboptions")
        .code(200, OptionsResponseDTO)
        .description("Get Dboption")
        .summary("Get Dboption")
        .tags(["Dboption"])
        .handler(async () => {
            const options = await dboptionService.getConfigs();
            return {
                status: 200,
                data: options
            }
        }).build();

    useRoute()
        .get("/dboption/source/:name")
        .code(200, OutputDboptionDTO)
        .description("Get source Dboption by name")
        .summary("Get source Dboption by name")
        .tags(["Dboption"])
        .params(Type.Object({
            name: Type.String()
        }))
        .handler(async (req) => {
            const name = req.params.name;
            const options = await dboptionService.getSourceConfig(name);
            return {
                status: 200,
                data: options
            }
        }).build();

    useRoute()
        .get("/dboption/:name")
        .code(200, OptionsResponseDTO)
        .description("Get Dboption by name")
        .summary("Get Dboption by name")
        .tags(["Dboption"])
        .params(Type.Object({
            name: Type.String()
        }))
        .handler(async (req) => {
            const name = req.params.name;
            const options = await dboptionService.getConfig(name);
            return {
                status: 200,
                data: options
            }
        }).build();
}