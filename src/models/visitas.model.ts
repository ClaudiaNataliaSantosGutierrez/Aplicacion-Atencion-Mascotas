import {Entity, model, property} from '@loopback/repository';

@model()
export class Visitas extends Entity {
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
  temperatura: string;

  @property({
    type: 'string',
    required: true,
  })
  peso: string;

  @property({
    type: 'string',
    required: true,
  })
  frec_respiratoria: string;

  @property({
    type: 'string',
    required: true,
  })
  frec_cardiaca: string;

  @property({
    type: 'string',
    required: true,
  })
  estado_animo: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  recomendaciones: string;

  @property({
    type: 'string',
    required: true,
  })
  medicamentos: string;


  constructor(data?: Partial<Visitas>) {
    super(data);
  }
}

export interface VisitasRelations {
  // describe navigational properties here
}

export type VisitasWithRelations = Visitas & VisitasRelations;
