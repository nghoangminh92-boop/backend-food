import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
export declare class AuthService {
    private jwtService;
    private userModel;
    constructor(jwtService: JwtService, userModel: Model<any>);
    login(username: string, password: string): Promise<{
        access_token: string;
        user: {
            _id: any;
            email: any;
            fullName: any;
            avatar: any;
            role: any;
        };
    }>;
    register(fullName: string, email: string, password: string, phone: string): Promise<{
        _id: any;
        email: any;
        fullName: any;
    }>;
    getAccount(userId: string): Promise<{
        user: any;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map