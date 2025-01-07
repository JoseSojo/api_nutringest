import AppActions from "src/AppActions";
import AppEvent from "src/AppEvent";
import { LanguajeService } from "src/languaje/languaje.service";
import MenuModel from "src/model/quote/menu.model";
import HistoryService from "src/service/history.service";
import MenuService from "src/service/quote/menu.service";
export default class MenuController {
    private service;
    private menuDetailModel;
    private appEvents;
    private history;
    private permit;
    private languaje;
    private lang;
    constructor(service: MenuService, menuDetailModel: MenuModel, appEvents: AppEvent, history: HistoryService, permit: AppActions, languaje: LanguajeService);
    private dropFood;
    private create;
    private update;
    private paginate;
    private unique;
    private delete;
    private getActionsList;
    private getActionsUnique;
    private getPermit;
    private objectName;
}
