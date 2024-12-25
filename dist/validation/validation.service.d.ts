export declare class ValidationService {
    isEmail(param: string): boolean;
    isPassword(param: string): boolean;
    isNumber(param: string): boolean;
    isName(param: string): boolean;
    isDateYYYYMMDD(param: string): boolean;
    isDateDDMMYYYY(param: string): boolean;
    isIPv4(param: string): boolean;
    maximo250(param: string): boolean;
}
