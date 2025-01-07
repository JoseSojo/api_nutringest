import AppActions from "src/AppActions";
import AppEvent from "src/AppEvent";
import { LanguajeService } from "src/languaje/languaje.service";
import ExchangeListFoodModel from "src/model/quote/exchange.food.model";
import CouponService from "src/service/coupon.service";
import HistoryService from "src/service/history.service";
export default class CouponController {
    private service;
    private permit;
    private languaje;
    private exchangeListFoodModel;
    private appEvents;
    private history;
    private lang;
    constructor(service: CouponService, permit: AppActions, languaje: LanguajeService, exchangeListFoodModel: ExchangeListFoodModel, appEvents: AppEvent, history: HistoryService);
    private paginate;
    private code;
    private unique;
    private getActionsList;
    private getActionsUnique;
    private getPermit;
}
