export interface ResponseNodes {
    users: User[],
    groups: Group[],
}

export interface ResponseNodeDetail {
    user: User,
    follows: User[],
    subscribes_to: Group[]
}

export interface User {
    uid: number,
    screen_name: string,
    name: string,
    sex: number,
    home_town: string,
    element_id_property: string,
}

export interface Group {
    uid: number,
    name: string,
    screen_name: string,
    element_id_property: string
}