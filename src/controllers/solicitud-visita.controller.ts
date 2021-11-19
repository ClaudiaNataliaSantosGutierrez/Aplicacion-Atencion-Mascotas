import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Solicitud,
  Visita,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudVisitaController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/visitas', {
    responses: {
      '200': {
        description: 'Array of Solicitud has many Visita',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Visita)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Visita>,
  ): Promise<Visita[]> {
    return this.solicitudRepository.visitas(id).find(filter);
  }

  @post('/solicituds/{id}/visitas', {
    responses: {
      '200': {
        description: 'Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Visita)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Solicitud.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visita, {
            title: 'NewVisitaInSolicitud',
            exclude: ['id'],
            optional: ['solicitudId']
          }),
        },
      },
    }) visita: Omit<Visita, 'id'>,
  ): Promise<Visita> {
    return this.solicitudRepository.visitas(id).create(visita);
  }

  @patch('/solicituds/{id}/visitas', {
    responses: {
      '200': {
        description: 'Solicitud.Visita PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visita, {partial: true}),
        },
      },
    })
    visita: Partial<Visita>,
    @param.query.object('where', getWhereSchemaFor(Visita)) where?: Where<Visita>,
  ): Promise<Count> {
    return this.solicitudRepository.visitas(id).patch(visita, where);
  }

  @del('/solicituds/{id}/visitas', {
    responses: {
      '200': {
        description: 'Solicitud.Visita DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Visita)) where?: Where<Visita>,
  ): Promise<Count> {
    return this.solicitudRepository.visitas(id).delete(where);
  }
}
