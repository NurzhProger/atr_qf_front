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

export interface authorView {
    id: string,
    lastname: string,
    firstname: string,
    fathername: string,
    authmark: string
}

export interface contractorView {
    contractor_id: string,
    contractor_name: string,
    contractor_bin: string
}

export interface publishingView {
    publishing_house_id: string,
    publishing_house_name: string
}

export interface publicationView {
    publication_type_id: string,
    publication_type_name: string
}

export interface bookSubjectView {
    book_subject_id: string,
    book_subject_name: string
}

export interface incomedoc {
    contractor: string;
    contractor_id: string;
    doc_date: string;
    doc_name: string;
    act_number: string;
    doc_number: string;
    doc_type: string;
    doc_type_id: string;
    organization_name: string;
    source_type_id: string;
    source_type_name: string;
    table_books: [{
        authors_id: Array<string>;
        authors_name: Array<string>;
        book_id: string;
        book_name: string;
        book_number: string;
        book_type_id: string;
        book_type_name: string;
        price: number;
        publication_date: string;
        publication_type_id: string;
        publication_type_name: string;
        publishing_house_id: string;
        publishing_house_name: string;
        qty: number;
        tome: string;
        total: string;
    }];
}

export interface readerarray {
    subscriber: string;
    subscriber_id: string;
    reader_id: string;
    name: string;
    lastname: string;
    firstname: string;
    fathername: string;
    is_a_reader: string;
    IIN: string;
    date_of_birth: Date;
    library_card_number: string;
    gender: string;
    gender_id: string;
    parallel: string;
    parallel_id: string;
    litera: string;
    litera_id: string;
    language_of_teaching: string;
    language_of_teaching_id: string;
    position_of_job: string;
}

export interface bookView {
    book_id: string,
    book_name: string,
    book_name_kaz: string,
    book_name_rus: string,
    parallel_name: string,
    parallel_id: string,
    publication_type_name: string,
    publication_type_id: string,
    publishing_house_id: string,
    publishing_house_name: string,
    book_description: string,
    annotation: string,
    tome: string,
    publication_date: string,
    book_subject_id: string,
    book_subject_name: string,
    org_name: string,
    org_id: string,
    table_authors: [
        {
            authors_id: string,
            authors_name: string
        }
    ]

}

export interface writeoffdoc {
    doc_date: string;
    doc_name: string;
    write_off_act_number: string;
    doc_number: string;
    reason_for_write_off_id: string;
    reason_for_write_off_name: string;
    table_books: [{
        book_id: string;
        book_name: string;
        admission_date: string;
        barcode: string;
        price: string;
        qty: string;
        amount: string;
        doc_income_number: string;
    }];
}

export interface reader {
    reader_id: string;
    name: string;
    IIN: string;
    library_card_number: string;
    issued_books: [
        {
            period: string,
            book_id: string,
            book_name: string,
            barcode: string,
            inventory_number: string,
            date_of_issue: string,
            return_date: string,
            return_condition_id: string,
            return: boolean
        }]
}