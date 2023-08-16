export interface groupView {
    id_org: string,
    id_group: string,
    org_name: string,
    group_name: string,
    group_age: string,
    group_count: string,
    first_name: string,
    last_name: string,
    username: string,
    category: string
}

export interface orguser {
    id: string,
    id_obl: string,
    id_region: string,
    fullname: string,
    org_name: string,
    bin: string,
    phonenumber: string,
    adress: string,
    email: string,
    count_place: number,
    type_org: string,
    type_city: string,
    type_ecolog: string,
    checkedgps: string,
    latitude: number,
    longitude: number
}

export interface requestElementView {
    id: string,
    id_obl: string,
    id_region: string,
    bin: string,
    org_name: string,
    fullname: string,
    phonenumber: string,
    adress: string,
    email: string,
    latitude: number,
    longitude: number
}

export interface childstatus {
    iin: string,
    name: string,
    id_group: string,
    group_name: string,
    time: string,
    first_name: string,
    username: string
}

export interface childListView {
    iin: string,
    icon_url: string,
    name: string,
    id_group: string,
    id_org: string,
    group_name: string,
    image_url: string
}

export interface requestListView {
    id: string,
    datestatus: string,
    id_obl: string,
    name_obl: string,
    id_region: string,
    name_region: string,
    bin: string,
    org_name: string,
    fullname: string,
    phonenumber: string,
    status: string
}

export interface childView {
    iin: string,
    name: string,
    id_group: string,
    id_org: string,
    org_name: string,
    group_name: string,
    registered: string,
    birthday: string,
    gender: string,
    category: string,
    image_url: string,
    visit_photo: string
}

export interface metodistView {
    id_org: string,
    org_name: string,
    username: string,
    password: string,
    first_name: string,
    email: string
}

export interface SubOrg {
    id: string;
    obl_name: string;
    name_org_parent: string;
    org_name: string;
    reg_name: string;
}