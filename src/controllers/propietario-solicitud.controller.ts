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
  Propietario,
  Solicitud,
} from '../models';
import {PropietarioRepository} from '../repositories';

export class PropietarioSolicitudController {
  constructor(
    @repository(PropietarioRepository) protected propietarioRepository: PropietarioRepository,
  ) { }

  @get('/propietarios/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Array of Propietario has many Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Solicitud>,
  ): Promise<Solicitud[]> {
    return this.propietarioRepository.solicituds(id).find(filter);
  }

  @post('/propietarios/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Propietario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Propietario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitudInPropietario',
            exclude: ['id'],
            optional: ['propietarioId']
          }),
        },
      },
    }) solicitud: Omit<Solicitud, 'id'>,
  ): Promise<Solicitud> {
    return this.propietarioRepository.solicituds(id).create(solicitud);
  }

  @patch('/propietarios/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Propietario.Solicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    solicitud: Partial<Solicitud>,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.propietarioRepository.solicituds(id).patch(solicitud, where);
  }

  @del('/propietarios/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Propietario.Solicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.propietarioRepository.solicituds(id).delete(where);
  }
}
