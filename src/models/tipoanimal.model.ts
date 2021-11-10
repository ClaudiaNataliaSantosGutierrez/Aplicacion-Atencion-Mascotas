import {Entity, model, property} from '@loopback/repository';

@model()
export class Tipoanimal extends Entity {
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
  perro: string;

  @property({
    type: 'string',
    required: true,
  })
  gato: string;

  @property({
    type: 'string',
    required: true,
  })
  ave: string;


  constructor(data?: Partial<Tipoanimal>) {
    super(data);
  }
}

export interface TipoanimalRelations {
  // describe navigational properties here
}

export type TipoanimalWithRelations = Tipoanimal & TipoanimalRelations;
