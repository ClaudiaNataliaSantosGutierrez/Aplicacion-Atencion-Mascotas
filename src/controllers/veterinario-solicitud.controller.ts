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
  Veterinario,
  Solicitud,
} from '../models';
import {VeterinarioRepository} from '../repositories';

export class VeterinarioSolicitudController {
  constructor(
    @repository(VeterinarioRepository) protected veterinarioRepository: VeterinarioRepository,
  ) { }

  @get('/veterinarios/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Array of Veterinario has many Solicitud',
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
    return this.veterinarioRepository.solicitudes(id).find(filter);
  }

  @post('/veterinarios/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Veterinario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Veterinario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitudInVeterinario',
            exclude: ['id'],
            optional: ['veterinarioId']
          }),
        },
      },
    }) solicitud: Omit<Solicitud, 'id'>,
  ): Promise<Solicitud> {
    return this.veterinarioRepository.solicitudes(id).create(solicitud);
  }

  @patch('/veterinarios/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Veterinario.Solicitud PATCH success count',
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
    return this.veterinarioRepository.solicitudes(id).patch(solicitud, where);
  }

  @del('/veterinarios/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Veterinario.Solicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.veterinarioRepository.solicitudes(id).delete(where);
  }
}
