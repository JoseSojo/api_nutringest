import AppActions from "src/AppActions";
import { LanguajeService } from "src/languaje/languaje.service";
import CalendarModel from "src/model/calendar.model";
import CalendarService from "src/service/calendar.service";
export default class CalendarController {
    private CalendarFoodModel;
    private service;
    private permit;
    private languaje;
    private lang;
    constructor(CalendarFoodModel: CalendarModel, service: CalendarService, permit: AppActions, languaje: LanguajeService);
    private today;
    private release;
    private findForMonth;
    private dropHistory;
    private paginate;
    private unique;
    private create;
    private update;
    private reprogramming;
    private delete;
    private status;
    private getActionsList;
    private getActionsUnique;
    private getPermit;
}
