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
  Veterinario,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudVeterinarioController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/veterinario', {
    responses: {
      '200': {
        description: 'Veterinario belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Veterinario)},
          },
        },
      },
    },
  })
  async getVeterinario(
    @param.path.string('id') id: typeof Solicitud.prototype.id,
  ): Promise<Veterinario> {
    return this.solicitudRepository.veterinario(id);
  }
}
