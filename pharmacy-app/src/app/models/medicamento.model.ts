import {Deserializable} from './deserializable.model';

export class Medicamento implements Deserializable {

  public Id: number;
  public CategoriaId: number;
  public Nombre: string;
  public Marca: string;
  public CantidadEnStock: number;
  public Precio: number;
  public Descripcion: string;
  public Composicion: string;
  public Presentacion: string;
  public RequiereRecetaControlada: boolean;

  constructor() {

  }

  public deserialize(input: any) {
    Object.assign(this, input);

    return this;
  }
}
