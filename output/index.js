import "reflect-metadata";
import { DboptionConfigService } from "./feature/dboption.service.js";
import { Container } from "typedi";
import controllers from "./feature/dboption.controller.js";
export class DbOptionsPlugin {
    name = "dboptions";
    context;
    config;
    constructor(config) {
        this.config = { ...config };
        const dboptionConfig = Container.get(DboptionConfigService);
        if (this.config.tSchema) {
            dboptionConfig.setDTO(this.config.tSchema);
        }
        if (this.config.adminGuard) {
            dboptionConfig.setRequestGuard(this.config.adminGuard);
        }
    }
    async onInit(ctx) {
        this.context = ctx;
        const config = ctx.projectConfig;
        this.config.autoRegisterControllers = config.get('DBOPTIONS_AUTO_REGISTER_CONTROLLERS', this.config.autoRegisterControllers);
    }
    async preReady() {
        if (this.config.autoRegisterControllers) {
            controllers(this.context);
        }
    }
}
export default function createPlugin(config) {
    return new DbOptionsPlugin(config);
}
//# sourceMappingURL=index.js.map