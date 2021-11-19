import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Persona} from './persona.model';
import {Veterinario} from './veterinario.model';
import {Mascota} from './mascota.model';
import {Visita} from './visita.model';

@model()
export class Solicitud extends Entity {
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
  detalle: string;

  @belongsTo(() => Persona)
  personaId: string;

  @belongsTo(() => Veterinario)
  veterinarioId: string;

  @belongsTo(() => Mascota)
  mascotaId: string;

  @hasMany(() => Visita)
  visitas: Visita[];

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
