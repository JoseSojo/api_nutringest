import AppActions from "src/AppActions";
import AppEvent from "src/AppEvent";
import { LanguajeService } from "src/languaje/languaje.service";
import ExchangeListFoodModel from "src/model/quote/exchange.food.model";
import HistoryService from "src/service/history.service";
import ExchangeListService from "src/service/quote/exchange.service";
export default class ExchangeListController {
    private exchangeListFoodModel;
    private service;
    private appEvents;
    private history;
    private permit;
    private languaje;
    private lang;
    constructor(exchangeListFoodModel: ExchangeListFoodModel, service: ExchangeListService, appEvents: AppEvent, history: HistoryService, permit: AppActions, languaje: LanguajeService);
    private dropFood;
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
