import AppActions from "src/AppActions";
import AppEvent from "src/AppEvent";
import { LanguajeService } from "src/languaje/languaje.service";
import UserModel from "src/model/user.model";
import HistoryService from "src/service/history.service";
import UserService from "src/service/user.service";
export default class PatientController {
    private model;
    private service;
    private permit;
    private appEvents;
    private history;
    private languaje;
    private lang;
    constructor(model: UserModel, service: UserService, permit: AppActions, appEvents: AppEvent, history: HistoryService, languaje: LanguajeService);
    private paginate;
    private unique;
    private create;
    private update;
    private delete;
    private getActionsList;
    private getActionsUnique;
    private getPermit;
    private GenerateCode;
    private objectName;
}
