import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ServicoPrestado } from './servico-prestado/servicoPrestado';
import { ServicoPrestadoBusca } from './servico-prestado/servico-prestado-lista/ServicoPrestadoBusca';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  apiURL: string = environment.apiURLBase + '/api/servicos-prestados'

  constructor(private http:HttpClient) { }


  header(){
    const tokenString = localStorage.getItem('access_token')
    const token = JSON.parse(tokenString)
    const headers = {
      'Authorization': 'Bearer ' + token.access_token
    }

    return headers;
  }

  salvar(servicoPrestado : ServicoPrestado): Observable<ServicoPrestado>{
    const headers = this.header();
    return this.http.post<ServicoPrestado>(`${this.apiURL}`,servicoPrestado,{ headers });

  }

  buscar(nome : string, mes : number) : Observable<ServicoPrestadoBusca[]>{
    const headers = this.header();
    const httpParams = new HttpParams()
      .set("nome",nome)
      .set("mes",mes ? mes.toString() : '');

    const url = this.apiURL + "?" + httpParams.toString();

    console.log(url);

    return this.http.get<any>(url,{ headers });

  }


}
  