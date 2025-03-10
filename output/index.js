import "reflect-metadata";
import path from "path";
import { DboptionConfigService } from "./feature/dboption.service.js";
import { Container } from "typedi";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export class DbOptionsPlugin {
    name = "dboptions";
    context;
    config;
    globControllersPath = null;
    constructor(config) {
        this.config = { ...config };
        const dboptionConfig = Container.get(DboptionConfigService);
        if (this.config.configDTO) {
            dboptionConfig.setDTO(this.config.configDTO);
        }
        if (this.config.adminGuard) {
            dboptionConfig.setRequestGuard(this.config.adminGuard);
        }
    }
    async onInit(ctx) {
        this.context = ctx;
        const appConfig = this.context.config.appConfig || {};
        this.config.autoRegisterControllers = appConfig?.autoRegisterControllers || appConfig['DBOPTIONS_AUTO_REGISTER_CONTROLLERS'] || this.config.autoRegisterControllers;
        if (this.config.autoRegisterControllers) {
            this.globControllersPath = path.join(__dirname, '../') + path.normalize("output/feature/**/*.controller{.ts,.js}");
        }
        ctx.logger.info("✅ tsdiapi-dboptions Plugin initialized.");
    }
}
export default function createPlugin(config) {
    return new DbOptionsPlugin(config);
}
//# sourceMappingURL=index.js.map