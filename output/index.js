"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbOptionsPlugin = void 0;
exports.default = createPlugin;
require("reflect-metadata");
const path_1 = __importDefault(require("path"));
const dboption_service_1 = require("./feature/dboption.service");
const typedi_1 = __importDefault(require("typedi"));
class DbOptionsPlugin {
    name = "dboptions";
    context;
    config;
    globControllersPath = null;
    constructor(config) {
        this.config = { ...config };
        const dboptionConfig = typedi_1.default.get(dboption_service_1.DboptionConfigService);
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
            this.globControllersPath = path_1.default.join(__dirname, '../') + path_1.default.normalize("output/feature/**/*.controller{.ts,.js}");
        }
        ctx.logger.info("✅ tsdiapi-dboptions Plugin initialized.");
    }
}
exports.DbOptionsPlugin = DbOptionsPlugin;
function createPlugin(config) {
    return new DbOptionsPlugin(config);
}
//# sourceMappingURL=index.js.map