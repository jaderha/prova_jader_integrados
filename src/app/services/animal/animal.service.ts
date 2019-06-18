import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(private http : HttpClient) { }

  findAll(){
    return this.http.get(environment.urlAPI+"Animals/");
  }
}
