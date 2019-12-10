import {Deserializable} from './deserializable.model';

export class NoMedicamento implements Deserializable {

  public Id: number;
  public CategoriaId: number;
  public Nombre: string;
  public Marca: string;
  public CantidadEnStock: number;
  public Precio: number;
  public Descripcion: string;

  constructor() {

  }

  public deserialize(input: any) {
    Object.assign(this, input);

    return this;
  }
}
