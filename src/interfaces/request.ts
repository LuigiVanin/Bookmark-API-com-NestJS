export interface AuthenticatedRequest extends Request {
    user: AuthUser;
}

export interface AuthUser extends IJwt {
    email: string;
    sub: number;
}

interface IJwt {
    iat: number;
    exp: number;
}
