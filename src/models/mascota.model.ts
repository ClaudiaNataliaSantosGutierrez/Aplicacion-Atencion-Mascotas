import {Entity, model, property} from '@loopback/repository';

@model()
export class Mascota extends Entity {
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
  color_ojos: string;

  @property({
    type: 'string',
    required: true,
  })
  color_pelo: string;

  @property({
    type: 'string',
    required: true,
  })
  estatura: string;

  @property({
    type: 'string',
    required: true,
  })
  raza: string;


  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;
