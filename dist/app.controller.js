"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const create_fixtures_1 = require("./fixtures/create.fixtures");
let AppController = class AppController {
    constructor(fixturesCreate) {
        this.fixturesCreate = fixturesCreate;
    }
    async startPermit() {
        this.fixturesCreate.permitFix();
    }
    async startUser() {
        this.fixturesCreate.userFix();
    }
    async startRegional() {
        this.fixturesCreate.regionalFix();
    }
    async startPayment() {
        this.fixturesCreate.paymentFix();
    }
    async startUnity() {
        this.fixturesCreate.unityFix();
    }
    async startSubscription() {
        this.fixturesCreate.subscriptionFix();
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(`start/permit`),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "startPermit", null);
__decorate([
    (0, common_1.Get)(`start/user`),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "startUser", null);
__decorate([
    (0, common_1.Get)(`start/regional`),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "startRegional", null);
__decorate([
    (0, common_1.Get)(`start/payment`),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "startPayment", null);
__decorate([
    (0, common_1.Get)(`start/unity`),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "startUnity", null);
__decorate([
    (0, common_1.Get)(`start/subscription`),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "startSubscription", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('app'),
    __metadata("design:paramtypes", [create_fixtures_1.default])
], AppController);
//# sourceMappingURL=app.controller.js.map