import { Request } from 'express';
export interface RequestWithUser extends Request {
    user: {
        id: number;
        email: string;
        type: 'client' | 'livreur' | 'prestataire' | 'commercant' | 'admin';
    };
}
