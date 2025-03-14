export interface LanguajeInterface {

    ACTIONS: ACTIONS_INTERFACE;

    TITLES: TITLES_INTERFACE;

    EVENTS: EVENTS_INTERFACE;

    HISTORY: HISTORY_INTERFACE;

    REPORTS: REPORT_INTERFACE;
}

//
interface ACTIONS_INTERFACE {
    NOT_FOUND:  string;
    NOT_PERMIT: string;
    NOT_VALID:  string;
    
    SUCCESS: {
        CREATE:     string;
        UPDATE:     string;
        LIST:       string;
        SHOW:       string;
        DELETE:     string;
        RECOVERY:   string;
        LOGIN:      string;
        REGISTER:   string;
        ACTIVE:     string
    };

    DANGER: {
        CREATE:     string;
        UPDATE:     string;
        LIST:       string;
        SHOW:       string;
        DELETE:     string;
        RECOVERY:   string;
        LOGIN:      string;
        REGISTER:   string;
        ACTIVE:     string;

        VALIDATIONS: {
            USERNAME_IN_USE:        string; 
            EMAIL_IN_USE:           string; 
            PASSWORD_FREE:          string;
            
        }
    }
}

//
interface TITLES_INTERFACE {

    INPUT: {
        CATEGORY:   string;
        ID:         string;
        NAME:       string;
        LASTNAME:   string;
        EMAIL:      string;
        PASSWORD:   string;
        DESCRIPTION:string;
        USERNAME:string;
        PERMIT:     string;
        CI:     string;

    };

    SLIDE: {
        PROJECTS:   string;
        PERMIT:     string;
        CONFIG: {
            INDEX:      string;
            CATEGORY:   string;
            PROGRAM:    string;
            LINE:       string;
        };
        USERS:      string;
        DASHBOARD:  string;
        REPORT:     string;
        ANALYSIS:   string;
    },

    NAV: {
        PROFILE:    string;
        LOGOUT:     string;
    },

    CREATE:     string;
    LIST:       string;
    REPORT:     string;
    UNIQUE:     string;
    UPDATE:     string;
    DELETE:     string;
    RECOERY:    string;
    DOWNLOAD:   string;
}

interface EVENTS_INTERFACE {}

interface HISTORY_INTERFACE {}

interface REPORT_INTERFACE {
    PROJECT: OPTIONS_REPORT;
    CATEGORY: OPTIONS_REPORT;
    PROGRAM: OPTIONS_REPORT;
    LINE: OPTIONS_REPORT;
    USER: OPTIONS_REPORT;
}

interface OPTIONS_REPORT {
    many:       string;
    unique:     string;
    project:    string
}

// CREAR Y LISTA
interface CREATE_LIST {
    CREATE:     string;
    LIST:       string;
}

// LISTA
interface LIST {
    LIST:       string;
}

// CREAR
interface CREATE {
    CREATE:     string;
}
