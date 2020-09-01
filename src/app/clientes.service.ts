import { Injectable } from '@angular/core';
import { Cliente } from './clientes/cliente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  apiURL : string = environment.apiURLBase + '/api/clientes';

  header(){
    const tokenString = localStorage.getItem('access_token')
    const token = JSON.parse(tokenString)
    const headers = {
      'Authorization': 'Bearer ' + token.access_token
    }

    return headers;
  }


  salvar(cliente : Cliente): Observable<Cliente>{   
    
    const headers = this.header();
    return this.http.post<Cliente>(`${this.apiURL}`, cliente, { headers } );
  }

  atualizar(cliente: Cliente) : Observable<any>{
    return this.http.put<Cliente>(`${this.apiURL}/${cliente.id}`, cliente );
  }

  getClientes() : Observable<Cliente[]>{
    const headers = this.header();
   
    return this.http.get<Cliente[]>(`${this.apiURL}`,{ headers });
    //return this.http.get<Cliente[]>(this.apiURL)
  }

  getClientesById(id: number) : Observable<Cliente>{
    return this.http.get<any>(`${this.apiURL}/${id}`)
  }


  deletar(cliente: Cliente) : Observable<any>{
    const headers = this.header();
    return this.http.delete<any>(`${this.apiURL}/${cliente.id}`,{ headers });

  }



  getClientesTest() : Cliente[]{
    let cliente = new Cliente();
    cliente.id = 1;
    cliente.nome = 'Fulano';
    cliente.dataCadastro = '18/04/2020';
    cliente.cpf = '123456789';
    return[cliente]
  }

  



}
