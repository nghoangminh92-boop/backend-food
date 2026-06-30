import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: {
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: {
            _id: any;
            email: any;
            fullName: any;
            avatar: any;
            role: any;
        };
    }>;
    register(body: {
        fullName: string;
        email: string;
        password: string;
        phone: string;
    }): Promise<{
        _id: any;
        email: any;
        fullName: any;
    }>;
    getAccount(req: any): Promise<{
        user: any;
    }>;
    logout(): {
        message: string;
    };
}
//# sourceMappingURL=auth.controller.d.ts.map