import AppActions from "src/AppActions";
import AppEvent from "src/AppEvent";
import { LanguajeService } from "src/languaje/languaje.service";
import HistoryService from "src/service/history.service";
import FoodAllService from "src/service/quote/food.service";
export default class FoodController {
    private service;
    private appEvents;
    private history;
    private permit;
    private languaje;
    private lang;
    constructor(service: FoodAllService, appEvents: AppEvent, history: HistoryService, permit: AppActions, languaje: LanguajeService);
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
