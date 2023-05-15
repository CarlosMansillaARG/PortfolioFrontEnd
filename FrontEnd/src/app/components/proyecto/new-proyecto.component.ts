import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ImageService } from 'src/app/service/image.service';
import { SProyectoService } from 'src/app/service/s-proyecto.service';

@Component({
  selector: 'app-new-proyecto',
  templateUrl: './new-proyecto.component.html',
  styleUrls: ['./new-proyecto.component.css']
})
export class NewProyectoComponent implements OnInit{
  nombreP: string = '';
  descripcionP: string = '';
  imgP: string = '';

  constructor(private sProyecto: SProyectoService, private router: Router, private activatedRouter: ActivatedRoute, public imageService: ImageService){}

  ngOnInit(): void {

  }

  onCreate(): void{
    const proy = new Proyecto(this.nombreP, this.descripcionP, this.imgP);
    this.sProyecto.save(proy).subscribe(data => {
      alert("Proyecto añadido");
      this.router.navigate(['']);
  }, err =>{
    alert("Falló");
    this.router.navigate(['']);
  })
  }

  uploadImage($event:any){
    const id = this.activatedRouter.snapshot.params['id'];
    const name = "proyecto_" + id;
    this.imageService.uploadImage($event, name)
  }
}
