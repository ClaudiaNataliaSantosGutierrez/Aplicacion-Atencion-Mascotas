import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Visita,
  Veterinario,
} from '../models';
import {VisitaRepository} from '../repositories';

export class VisitaVeterinarioController {
  constructor(
    @repository(VisitaRepository)
    public visitaRepository: VisitaRepository,
  ) { }

  @get('/visitas/{id}/veterinario', {
    responses: {
      '200': {
        description: 'Veterinario belonging to Visita',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Veterinario)},
          },
        },
      },
    },
  })
  async getVeterinario(
    @param.path.string('id') id: typeof Visita.prototype.id,
  ): Promise<Veterinario> {
    return this.visitaRepository.veterinario(id);
  }
}
