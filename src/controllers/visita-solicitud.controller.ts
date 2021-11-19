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
  Solicitud,
} from '../models';
import {VisitaRepository} from '../repositories';

export class VisitaSolicitudController {
  constructor(
    @repository(VisitaRepository)
    public visitaRepository: VisitaRepository,
  ) { }

  @get('/visitas/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Solicitud belonging to Visita',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async getSolicitud(
    @param.path.string('id') id: typeof Visita.prototype.id,
  ): Promise<Solicitud> {
    return this.visitaRepository.solicitud(id);
  }
}
