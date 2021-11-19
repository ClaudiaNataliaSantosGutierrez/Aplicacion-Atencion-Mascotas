import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Solicitud} from './solicitud.model';
import {Veterinaria} from './veterinaria.model';
import {Visita} from './visita.model';

@model()
export class Veterinario extends Entity {
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
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: false,
  })
  clave: string;

  @property({
    type: 'string',
    required: true,
  })
  especialidad: string;

  @property({
    type: 'string',
    required: true,
  })
  licencia: string;

  @property({
    type: 'string',
    required: true,
  })
  identificacion: string;

  @belongsTo(() => Veterinaria)
  veterinariaId: string;

  @hasMany(() => Visita)
  visitas: Visita[];

  @hasMany(() => Solicitud)
  solicitudes: Solicitud[];

  constructor(data?: Partial<Veterinario>) {
    super(data);
  }
}

export interface VeterinarioRelations {
  // describe navigational properties here
}

export type VeterinarioWithRelations = Veterinario & VeterinarioRelations;
