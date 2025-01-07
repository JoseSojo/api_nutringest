import AppActions from "src/AppActions";
import AppEvent from "src/AppEvent";
import { LanguajeService } from "src/languaje/languaje.service";
import HistoryService from "src/service/history.service";
import ConfigSubscriptionHandlerService from "src/service/master/subsccription.detail.service";
export default class ConfigSubscriptionDetailController {
    private service;
    private appEvents;
    private history;
    private permit;
    private languaje;
    private lang;
    constructor(service: ConfigSubscriptionHandlerService, appEvents: AppEvent, history: HistoryService, permit: AppActions, languaje: LanguajeService);
    private singChangeSubscription;
    private assingUser;
    private FindMySub;
    private FindAllSub;
}
