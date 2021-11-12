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
  Propietario,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudPropietarioController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/propietario', {
    responses: {
      '200': {
        description: 'Propietario belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Propietario)},
          },
        },
      },
    },
  })
  async getPropietario(
    @param.path.string('id') id: typeof Solicitud.prototype.id,
  ): Promise<Propietario> {
    return this.solicitudRepository.propietario(id);
  }
}
