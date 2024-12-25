
export type METHOD_HTTP =   `POST` | `GET` | `PUT` | `DELETE`;

export interface Filed {
    key:            string;
    type:           string;
    name:           string;
    value?:         string;
    id:             string;
    placeholder:    string;
    label:          string;
    required:       boolean;
}


export interface CUSTOM_FILED {
    type:       `input`|`textarea` | `select` | `check`;
    beforeType: `text` | `password` | `email` | `date` | `datetime` | `number`,

    name:           string;
    value?:         string;
    id:             string;
    placeholder:    string;
    label:          string;
    required:       boolean;

    ico?:   string;

    select?: {
        active: boolean,
        in: string
    }
}

export interface FORM {
    name:       string;
    path:       string;
    method:     METHOD_HTTP;
    fields:     CUSTOM_FILED[];
}
