import AppActions from "src/AppActions";
import AppEvent from "src/AppEvent";
import { LanguajeService } from "src/languaje/languaje.service";
import HistoryService from "src/service/history.service";
import UserService from "src/service/user.service";
export default class NutricionistController {
    private service;
    private appEvents;
    private history;
    private permit;
    private languaje;
    private lang;
    constructor(service: UserService, appEvents: AppEvent, history: HistoryService, permit: AppActions, languaje: LanguajeService);
    private paginate;
    private unique;
    private create;
    private update;
    private delete;
    private getActionsList;
    private getActionsUnique;
    private getPermit;
    private objectName;
}