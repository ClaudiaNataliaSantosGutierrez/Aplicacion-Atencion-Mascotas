import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Solicitud} from './solicitud.model';
import {Visitas} from './visitas.model';

@model()
export class Medico extends Entity {
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
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  tarjeta_profesional: string;

  @property({
    type: 'string',
    required: true,
  })
  especialidad: string;

  @property({
    type: 'string',
    required: true,
  })
  id_mascota: string;

  @hasMany(() => Solicitud)
  solicitudes: Solicitud[];

  @hasMany(() => Visitas)
  visitas: Visitas[];

  @property({
    type: 'string',
  })
  veterinariaId?: string;

  @hasOne(() => Solicitud)
  solicitud: Solicitud;

  constructor(data?: Partial<Medico>) {
    super(data);
  }
}

export interface MedicoRelations {
  // describe navigational properties here
}

export type MedicoWithRelations = Medico & MedicoRelations;
