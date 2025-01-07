import AppActions from "src/AppActions";
import { LanguajeService } from "src/languaje/languaje.service";
import PermitService from "src/service/permit.service";
export default class PermitController {
    private service;
    private permit;
    private languaje;
    private lang;
    constructor(service: PermitService, permit: AppActions, languaje: LanguajeService);
    private paginate;
    private unique;
    private create;
    private update;
    private delete;
    private getActionsList;
    private getActionsUnique;
    private getPermit;
}
