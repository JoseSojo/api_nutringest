import AppActions from 'src/AppActions';
import { LanguajeService } from 'src/languaje/languaje.service';
import HistoryService from 'src/service/history.service';
export declare class AppController {
    private service;
    private permit;
    private languaje;
    private lang;
    constructor(service: HistoryService, permit: AppActions, languaje: LanguajeService);
    private paginate;
    private unique;
    private getActionsList;
    private getActionsUnique;
    private getPermit;
}
