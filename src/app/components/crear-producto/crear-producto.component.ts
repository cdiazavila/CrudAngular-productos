import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  titulo='Crear Productos'
  id: string | null;
  constructor(private fb: FormBuilder,
     private router: Router,
      private toastr: ToastrService, 
      private _productoServer: ProductoService,
      private aRouter: ActivatedRoute) {
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required]
    })
  this.id=this.aRouter.snapshot.paramMap.get('id');


  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregar() {
    //console.log(this.productoForm)
    //console.log(this.productoForm.get('producto')?.value)

    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    }

    if(this.id !==null){
      // editamos Producto
      this._productoServer.editarProducto(this.id,PRODUCTO).subscribe(data=>{
        this.toastr.success('El producto fue Editado con exito', 'Producto Actualizado!');
        this.router.navigate(['/']);
      }, error => {
        console.log(error)
      })
    }else {
       this._productoServer.guardarproductos(PRODUCTO).subscribe(data => {
       this.toastr.success('El producto fue registrado con exitos', 'Producto Registrado!');
    this.router.navigate(['/']);
    console.log(data)
    }, error => {
      console.log(error)
    })
    }
   
    console.log(PRODUCTO)
   
  }
esEditar(){
if (this.id !==null){
  this.titulo='Editar Producto';
  this._productoServer.obtenerProducto(this.id).subscribe(data=>{
    this.productoForm.setValue({
      producto: data.nombre,
      categoria:data.categoria,
      ubicacion: data.ubicacion,
      precio: data.precio
    })
  },error =>{
    console.log(error)
  })
}
}

}
