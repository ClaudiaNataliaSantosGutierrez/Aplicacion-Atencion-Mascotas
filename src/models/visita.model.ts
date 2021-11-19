import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Veterinario} from './veterinario.model';
import {Solicitud} from './solicitud.model';

@model()
export class Visita extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

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
  frecCardiaca: string;

  @property({
    type: 'string',
    required: true,
  })
  frecRespiratoria: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  observaciones: string;

  @property({
    type: 'string',
    required: true,
  })
  medicinas: string;

  @belongsTo(() => Veterinario)
  veterinarioId: string;

  @belongsTo(() => Solicitud)
  solicitudId: string;

  constructor(data?: Partial<Visita>) {
    super(data);
  }
}

export interface VisitaRelations {
  // describe navigational properties here
}

export type VisitaWithRelations = Visita & VisitaRelations;
