
export interface Card {
    label:  string;
    value:  string | number;
    ico:    string;
    child?: {
        label: string;
        value: string;
    }[]
}

export interface Graphic {
    label:  string[];
    value:  number[];
}

export interface SidebarChild {
    ico:    string;
    label:  string;
    path:   string | null;
}

export interface Sidebar {
    ico:    string;
    label:  string;
    path:   string | null;
    chils?:  SidebarChild[]
}
