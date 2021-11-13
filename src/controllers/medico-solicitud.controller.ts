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
  Medico,
  Solicitud,
} from '../models';
import {MedicoRepository} from '../repositories';

export class MedicoSolicitudController {
  constructor(
    @repository(MedicoRepository) protected medicoRepository: MedicoRepository,
  ) { }

  @get('/medicos/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Array of Medico has many Solicitud',
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
    return this.medicoRepository.solicitudes(id).find(filter);
  }

  @post('/medicos/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Medico model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Medico.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitudInMedico',
            exclude: ['id'],
            optional: ['medicoId']
          }),
        },
      },
    }) solicitud: Omit<Solicitud, 'id'>,
  ): Promise<Solicitud> {
    return this.medicoRepository.solicitudes(id).create(solicitud);
  }

  @patch('/medicos/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Medico.Solicitud PATCH success count',
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
    return this.medicoRepository.solicitudes(id).patch(solicitud, where);
  }

  @del('/medicos/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Medico.Solicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.medicoRepository.solicitudes(id).delete(where);
  }
}
