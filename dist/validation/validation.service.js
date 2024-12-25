"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationService = void 0;
const common_1 = require("@nestjs/common");
let ValidationService = class ValidationService {
    isEmail(param) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(param);
    }
    isPassword(param) {
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return regex.test(param);
    }
    isNumber(param) {
        const regex = /^\d+$/;
        return regex.test(param);
    }
    isName(param) {
        const regex = /^[a-zA-ZÀ-ÿ\s]+$/;
        return regex.test(param);
    }
    isDateYYYYMMDD(param) {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(param);
    }
    isDateDDMMYYYY(param) {
        const regex = /^\d{2}\/\d{2}\/\d{4}$/;
        return regex.test(param);
    }
    isIPv4(param) {
        const regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return regex.test(param);
    }
    maximo250(param) {
        const regex = /^.{0,250}$/;
        return regex.test(param);
    }
};
exports.ValidationService = ValidationService;
exports.ValidationService = ValidationService = __decorate([
    (0, common_1.Injectable)()
], ValidationService);
//# sourceMappingURL=validation.service.js.map