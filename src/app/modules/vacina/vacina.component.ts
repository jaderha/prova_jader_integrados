import { Component, OnInit, ViewChild } from '@angular/core';
import { Vacina } from 'src/app/model/Vacina';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { VacinaService } from 'src/app/services/vacina/vacina.service';
import { Animal } from 'src/app/model/Animal';
import { AnimalService } from 'src/app/services/animal/animal.service';

@Component({
  selector: 'app-vacina',
  templateUrl: './vacina.component.html',
  styleUrls: ['./vacina.component.css']
})
export class VacinaComponent implements OnInit {
  displayedColumns: string[] = ['idVacina', 'dtVacina', 'peso', 'dosagem',
    'aplicador', 'descMedicamento', 'acao'];
  vacina: Vacina
  vacinas: any;
  dataSource: any;
  edit: boolean;
  selectedValue: string;
  animals: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private vacinaService: VacinaService,
    private animalService: AnimalService) { }

  ngOnInit() {
    this.vacina = new Vacina();
    this.vacinas = new Array<Vacina>();
    this.listAll();
    this.animals = new Array<Animal>();
    this.listAllAnimals();
  }

  listAllAnimals() {
    this.animalService.findAll().subscribe(response => {
      if (response) {
        this.animals = response;
      }
    }, error => {
      console.log(error);
    })
  }

  listAll() {
    this.vacinaService.findAll().subscribe(response => {
      if (response)
        this.loadTable(response);
    }, error => {
      console.log(error);
    });
  }

  loadTable(vacina: any) {
    this.dataSource = new MatTableDataSource<Vacina>(vacina);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  salvar() {
    console.log(this.vacina)
    this.vacinaService.save(this.vacina).subscribe(response => {
      if (response) {
        alert('Salvou!!!!');
        this.listAll();
        this.vacina = new Vacina();
      }
    }, error => {
      console.log(error);
    });
  }



  excluir(idVacina: number) {
    this.vacinaService.delete(idVacina).subscribe(response => {
      if (response)
        this.listAll();
    }, error => {
      console.log(error);
    });
  }


  markEdit(vacina: any) {
    this.vacina = vacina;
    console.log(vacina);
    this.edit = true;
  }


  atualizar() {
    this.vacinaService.update(this.vacina).subscribe(response => {
      if (response) {
        alert('Atualizou!!!!');
        this.listAll();
        this.edit = false;
        this.vacina = new Vacina();
      }
    }, error => {
      console.log(error);
    });
  }

  cancelar() {
    this.vacina = new Vacina();
  }

}
