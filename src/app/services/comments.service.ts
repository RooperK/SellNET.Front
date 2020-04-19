import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class CommentsService {

  constructor(private http: HttpClient) {
  }


  getCommentsById(adId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/Comment/get/${adId}`);
  }

  addComment(heisenbergId: number, text: string, parentCommentId?: number): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Comment/add`, {heisenbergId, text, parentCommentId});
  }

}
