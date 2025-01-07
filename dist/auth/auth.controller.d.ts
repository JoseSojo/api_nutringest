import AuthService from './auth.service';
import { LanguajeService } from 'src/languaje/languaje.service';
export declare class AuthController {
    private service;
    private languaje;
    private lang;
    constructor(service: AuthService, languaje: LanguajeService);
    private login;
    private register;
}
