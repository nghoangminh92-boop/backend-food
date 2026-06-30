"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const transform_interceptor_1 = require("./core/interceptors/transform.interceptor");
// @ts-ignore
const cookieParser = require('cookie-parser');
const jwt_auth_guard_1 = require("./auth/jwt-auth.guard");
const delay_middleware_1 = require("./core/delay.middleware");
require("dotenv/config");
async function bootstrap() {
    const PORT = process.env.PORT || 8000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.use(cookieParser());
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: false }));
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    app.setGlobalPrefix('/api/v1', { exclude: ['/'] });
    const reflector = app.get(core_1.Reflector);
    app.useGlobalGuards(new jwt_auth_guard_1.JwtAuthGuard(reflector));
    app.use(delay_middleware_1.delayMiddleware);
    await app.listen(PORT);
}
require('dotenv').config();
bootstrap();
//# sourceMappingURL=main.js.map