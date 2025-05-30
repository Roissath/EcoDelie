export declare class MailService {
    private readonly sib;
    private readonly logger;
    constructor();
    sendWelcomeEmail(to: string, name: string): Promise<void>;
    sendPasswordResetEmail(to: string, token: string): Promise<void>;
}
