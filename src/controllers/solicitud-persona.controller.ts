import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Solicitud,
  Persona,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudPersonaController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Solicitud.prototype.id,
  ): Promise<Persona> {
    return this.solicitudRepository.persona(id);
  }
}
