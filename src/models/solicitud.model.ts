import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Propietario} from './propietario.model';

@model()
export class Solicitud extends Entity {
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
  nombre_propietario: string;

  @property({
    type: 'string',
    required: true,
  })
  identificacion: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_animal: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_atencion: string;

  @property({
    type: 'string',
    required: true,
  })
  id_medico: string;

  @belongsTo(() => Propietario)
  propietarioId: string;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
