"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delayMiddleware = void 0;
async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, +ms));
}
const delayMiddleware = async (req, res, next) => {
    const delay = req?.headers?.delay;
    if (delay) {
        await sleep(delay);
    }
    next();
};
exports.delayMiddleware = delayMiddleware;
//# sourceMappingURL=delay.middleware.js.map