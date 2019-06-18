import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vacina } from 'src/app/model/Vacina';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VacinaService {

  constructor(private http : HttpClient) { }
  
  save(vacina : Vacina) {
    return this.http.post(environment.urlAPI+"Vacinas/", vacina);
  }

  update(vacina: Vacina) {
    return this.http.put(environment.urlAPI+"Vacinas/"+vacina.idVacina, vacina);
  }
  
  findAll(){
    return this.http.get(environment.urlAPI+"Vacinas/");
  }
  
  delete(id: number) {
    return this.http.delete(environment.urlAPI+"Vacinas/"+id);
  }

}
