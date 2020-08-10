import { Injectable } from '@angular/core';
import { Cliente } from './clientes/cliente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }


  salvar(cliente : Cliente): Observable<Cliente>{
    return this.http.post<Cliente>('http://localhost:8080/sistema-vendas/api/clientes', cliente);
  }

  getClientes() : Observable<Cliente[]>{
    return this.http.get<Cliente[]>('http://localhost:8080/sistema-vendas/api/clientes')
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
