declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: any): {
        userId: any;
        email: any;
        fullName: any;
    };
}
export {};
//# sourceMappingURL=jwt.strategy.d.ts.map