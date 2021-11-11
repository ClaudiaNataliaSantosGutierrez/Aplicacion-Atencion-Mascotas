import {Entity, model, property} from '@loopback/repository';

@model()
export class Veterinaria extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  nit: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;


  constructor(data?: Partial<Veterinaria>) {
    super(data);
  }
}

export interface VeterinariaRelations {
  // describe navigational properties here
}

export type VeterinariaWithRelations = Veterinaria & VeterinariaRelations;
