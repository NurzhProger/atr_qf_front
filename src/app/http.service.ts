import { Injectable } from "@angular/core";
import { timeout } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
declare var myLocalStorage: any;
declare var sessionStorage: any;


@Injectable({
  providedIn: 'root'
})


export class HttpService {
  constructor(private http: HttpClient) { }
  // host = "http://192.168.5.26:9999/srv/";
  // host = "http://192.168.5.31:9999/srv/";
  host = "https://face06.qazna24.kz/srv/";

  authuser(login: string, pass: string) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Basic ' + btoa(unescape(encodeURIComponent(login + ":" + pass))));
    return this.http.get(this.host + "authuser", { headers: myHeaders })
  }

  getinfo() {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get(this.host + "getinfo", { headers: myHeaders })
  }

  getinfoorg() {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get(this.host + "getinfoorg", { headers: myHeaders })
  }

  registration(body: any) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    // .set('Authorization', myLocalStorage.GetItem('token'));
    return this.http.post(this.host + "registration", JSON.stringify(body), { headers: myHeaders })
  }

  getorglist(page: number, org_name: string) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get(this.host + "getorglist?page=" + page + "&bin=" + ''
      + "&org_name=" + org_name, { headers: myHeaders })
  }

  getorgselect(page: number, org_name: string, id_org: string) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get(this.host + "getorglist?page=" + page + "&id_org=" + id_org
      + "&org_name=" + org_name, { headers: myHeaders })
  }

  getorgelement(id_org: string) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get(this.host + "getorgelement?id_org=" + id_org, { headers: myHeaders })
  }

  getgroupelement(id_group: string) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get(this.host + "getgroupelement?id_group=" + id_group, { headers: myHeaders })
  }

  grouplistadmin(page: number, groupname: string) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get(this.host + "grouplistadmin?page=" + page
      + '&groupname=' + groupname, { headers: myHeaders })
  }

  getgrouplist(page: number, org_id: string, groupname: string) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get(this.host + "grouplist?page=" + page
      + '&org_id=' + org_id
      + '&groupname=' + groupname, { headers: myHeaders })
  }

  group_edit(type: string, body: any) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.post(this.host + "groupedit?param=" + type, JSON.stringify(body), { headers: myHeaders })
  }

  getchildlist(page: number, id_org: string, id_group: string, childname: string) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get(this.host + "childlist?page=" + page +
      "&id_org=" + id_org + "&id_group=" + id_group + "&childname=" + childname, { headers: myHeaders })
  }

  getchildlistadmin(page: number, childname: string) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get(this.host + "childlistadmin?page=" + page +
      "&childname=" + childname, { headers: myHeaders })
  }

  getchildselect(page: number, id_group: string, childname: string, id_org: string) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get(this.host + "childselect?page=" + page + "&id_group=" + id_group +
      "&childname=" + childname + "&id_org=" + id_org, { headers: myHeaders })
  }

  getrequestlist(page: number, bin: string) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get(this.host + "requestlist?page=" + page + "&bin=" + bin, { headers: myHeaders })
  }

  getrequestelement(id_request: string) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get(this.host + "requestelement?id_request=" + id_request, { headers: myHeaders })
  }

  successrequest(body: any, action: boolean) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.post(this.host + "successrequest?action=" + action, JSON.stringify(body), { headers: myHeaders })
  }

  notification(body: any, action: boolean) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.post(this.host + "notification?action=" + action, JSON.stringify(body), { headers: myHeaders })
  }

  org_edit(body: any) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.post(this.host + "orgedit", JSON.stringify(body), { headers: myHeaders })
  }

  getchildbyiin(iin: string) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get(this.host + "getchildbyinn?iin=" + iin, { headers: myHeaders })
  }

  child_edit(type: string, id_group: string, body: any) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.post(this.host + "childedit?param=" + type + "&id_group=" + id_group, JSON.stringify(body), { headers: myHeaders })
  }

  getmetodistlist(page: number, searchMetodist: string) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get(this.host + "metodistlist?page=" + page + "&metodist=" + searchMetodist, { headers: myHeaders })
  }

  getmetodistlistadmin(page: number, searchMetodist: string) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get(this.host + "metodistlistadmin?page=" + page + "&metodist=" + searchMetodist, { headers: myHeaders })
  }

  metodist_edit(type: string, body: any) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.post(this.host + "metodistedit?param=" + type, JSON.stringify(body), { headers: myHeaders })
  }

  send_file(body: any) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.post(this.host + "importfile", JSON.stringify(body), { headers: myHeaders })
  }

  send_file_metodist(body: any) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.post(this.host + "importmetodist", JSON.stringify(body), { headers: myHeaders })
  }

  startpage() {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get(this.host + "startpage", { headers: myHeaders })
  }

  startpageadmin() {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get(this.host + "startpageadmin", { headers: myHeaders })
  }

  gettabelbyday(datestatus: string) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get(this.host + "gettabelbyday?datestatus=" + datestatus, { headers: myHeaders })
  }

  getchildstatus(status: string, id_org: string = '', id_group: string, datestatus: string, iin: string = '') {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get(this.host + "childstatus?status=" + status +
      "&id_org=" + id_org + "&id_group=" + id_group +
      "&datestatus=" + datestatus + "&iin=" + iin, { headers: myHeaders })
  }

  getchildstatusbyiin(status: string, id_org: string, id_group: string, datestatus: string, iin: string) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get(this.host + "childstatusbyiin?status=" + status +
      "&id_org=" + id_org + "&id_group=" + id_group +
      "&datestatus=" + datestatus + "&iin=" + iin, { headers: myHeaders })
  }

  getchildallstatus(id_org: string, id_group: string, datestatus: string) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get(this.host + "allstatus?id_org=" + id_org
      + "&id_group=" + id_group
      + "&datestatus=" + datestatus, { headers: myHeaders })
  }

  getchildstatusphoto(image_url: string) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get(this.host + "statusphoto?image_url=" + image_url, { headers: myHeaders })
  }

  change_pass(password: string) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get(this.host + "changepass?password=" + password, { headers: myHeaders })
  }

  getchildtable(datenachalo: string, datekonec: string, id_org: string, id_group: string = '') {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get(this.host + "gettabelbymonth?datenachalo=" + datenachalo +
      "&datekonec=" + datekonec + "&id_org=" + id_org + "&id_group=" + id_group, { headers: myHeaders })
  }

  gettable(datenachalo: string, datekonec: string, id_org: string, id_group: string = '') {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get(this.host + "gettabelbym?datenachalo=" + datenachalo +
      "&datekonec=" + datekonec + "&id_org=" + id_org + "&id_group=" + id_group, { headers: myHeaders })
  }

  editvisit(body: any) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.post(this.host + "editvisit", JSON.stringify(body), { headers: myHeaders })
  }

  deletevisit(body: any) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.post(this.host + "deletevisit", JSON.stringify(body), { headers: myHeaders })
  }

  getchildtable2(datenachalo: string, datekonec: string, id_group: string = '') {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get(this.host + "gettabel?datenachalo=" + datenachalo +
      "&datekonec=" + datekonec + "&id_group=" + id_group, { headers: myHeaders })
  }

  getoblasttype() {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.http.get(this.host + "getoblasttype", { headers: myHeaders })
  }

  getregiontype(id_obl: string) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.http.get(this.host + "getregiontype?id_obl=" + id_obl, { headers: myHeaders })
  }

  getsuborg(page: number, id_org: string, org_name: string, haveorg: boolean, id_region: number = 0) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'))
    return this.http.get(this.host + "suborg?page=" + page + "&id_org=" + id_org
      + "&org_name=" + org_name + "&haveorg=" + haveorg + "&id_region=" + id_region, { headers: myHeaders })
  }

  getnonsuborg(page: number, id_org: string, org_name: string, id_region: number = 0) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'))
    return this.http.get(this.host + "getnonsuborg?page=" + page + "&id_org=" + id_org
      + "&org_name=" + org_name + "&id_region=" + id_region, { headers: myHeaders })
  }

  addsuborg(id_parent: string, id_child: string) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'))
    return this.http.get(this.host + "addsuborg?id_parent=" + id_parent + "&id_child=" + id_child, { headers: myHeaders })
  }

  delete_suborg(id: string) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'))
    return this.http.get(this.host + "delete_suborg?id=" + id, { headers: myHeaders })
  }

  gettablexls(datenachalo: string, datekonec: string, id_org: string, id_group: string = '') {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));

    return this.http.get(this.host + "tabelxls?datenachalo=" + datenachalo +
      "&datekonec=" + datekonec + "&id_org=" + id_org + "&id_group=" + id_group, { responseType: 'blob', headers: myHeaders })
      .subscribe(blob => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = 'Табель посещаемости.xlsx';
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
  }

  getStatusRegion(id_region: number, period: string): Observable<any> {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get<any>(this.host + "getStatusRegion?id_region="
      + id_region + "&period=" + period, { headers: myHeaders })
  }

  formfordash(id_obl: number, id_region: number, id_org: string): Observable<any> {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get<any>(this.host + "formfordash?id_obl=" + id_obl + "&id_region="
      + id_region + "&id_org=" + id_org, { headers: myHeaders })
  }

  // formfordash() {
  //   let myHeaders = new HttpHeaders()
  //     .set('Content-Type', 'application/json')
  //     .set('Authorization', sessionStorage.getItem('token'));
  //   return this.http.get(this.host + "formfordash", { headers: myHeaders })
  // }

  formfordashsumm(): Observable<any> {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get<any>(this.host + "formfordashsumm", { headers: myHeaders })
  }

  getFakeImgUrl(real?: string, id?: number) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    // return this.http.get("http://192.168.5.23:9999/api/changestatusbyadm?case=" + real + "&id=" + id, { headers: myHeaders })
    return this.http.get("https://face06.qazna24.kz/api/changestatusbyadm?case=" + real + "&id=" + id, { headers: myHeaders })
  }

  getOtherFoto(iin: string, id?: number) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    // return this.http.get("http://192.168.5.23:9999/api/changestatusbyadm?case=" + real + "&id=" + id, { headers: myHeaders })
    return this.http.get(this.host + "getotherphoto?iin=" + iin + "&id=" + id, { headers: myHeaders })
  }

  getpriceservice() {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get(this.host + "getpriceservice", { headers: myHeaders })
  }

  getpriceobl(id_obl: number) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.get(this.host + "getpriceobl?id_obl=" + id_obl, { headers: myHeaders })
  }

  setpriceobl(body: any) {
    let myHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('token'));
    return this.http.post(this.host + "setpriceobl", JSON.stringify(body), { headers: myHeaders })
  }
}

