import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {
  listProductos: Producto[] = [];
  constructor(private _productoServer: ProductoService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerProductos()
  }

  obtenerProductos() {
    this._productoServer.getProductos().subscribe(data => {
      console.log(data)
      this.listProductos = data;
    }, error => {
      console.log(error)
    })
  }

  eliminarProducto(id: any) {
    this._productoServer.eliminarProducto(id).subscribe(data => {
      this.toastr.error(data.msg, 'Producto Elimindo');
      this.obtenerProductos();
      console.log(data)

    }, error => {
      console.log(error)
    }

    )
  }

 

}
