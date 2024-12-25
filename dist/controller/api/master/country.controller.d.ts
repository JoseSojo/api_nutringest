import AppActions from "src/AppActions";
import AppEvent from "src/AppEvent";
import { LanguajeService } from "src/languaje/languaje.service";
import HistoryService from "src/service/history.service";
import ConfigCountryService from "src/service/master/country.service";
export default class CountryController {
    private service;
    private permit;
    private appEvents;
    private history;
    private languaje;
    private lang;
    constructor(service: ConfigCountryService, permit: AppActions, appEvents: AppEvent, history: HistoryService, languaje: LanguajeService);
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
