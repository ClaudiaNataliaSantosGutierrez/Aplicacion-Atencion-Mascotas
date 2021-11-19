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
  Mascota,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudMascotaController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/mascota', {
    responses: {
      '200': {
        description: 'Mascota belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async getMascota(
    @param.path.string('id') id: typeof Solicitud.prototype.id,
  ): Promise<Mascota> {
    return this.solicitudRepository.mascota(id);
  }
}
