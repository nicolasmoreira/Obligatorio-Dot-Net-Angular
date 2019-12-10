import {Deserializable} from './deserializable.model';

export class Categoria implements Deserializable {

  public Id: number;
  public Nombre: string;

  constructor() {

  }

  public deserialize(input: any) {
    Object.assign(this, input);

    return this;
  }
}
