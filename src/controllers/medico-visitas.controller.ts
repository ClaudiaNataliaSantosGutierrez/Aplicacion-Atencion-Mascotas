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
  Visitas,
} from '../models';
import {MedicoRepository} from '../repositories';

export class MedicoVisitasController {
  constructor(
    @repository(MedicoRepository) protected medicoRepository: MedicoRepository,
  ) { }

  @get('/medicos/{id}/visitas', {
    responses: {
      '200': {
        description: 'Array of Medico has many Visitas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Visitas)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Visitas>,
  ): Promise<Visitas[]> {
    return this.medicoRepository.visitas(id).find(filter);
  }

  @post('/medicos/{id}/visitas', {
    responses: {
      '200': {
        description: 'Medico model instance',
        content: {'application/json': {schema: getModelSchemaRef(Visitas)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Medico.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visitas, {
            title: 'NewVisitasInMedico',
            exclude: ['id'],
            optional: ['medicoId']
          }),
        },
      },
    }) visitas: Omit<Visitas, 'id'>,
  ): Promise<Visitas> {
    return this.medicoRepository.visitas(id).create(visitas);
  }

  @patch('/medicos/{id}/visitas', {
    responses: {
      '200': {
        description: 'Medico.Visitas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visitas, {partial: true}),
        },
      },
    })
    visitas: Partial<Visitas>,
    @param.query.object('where', getWhereSchemaFor(Visitas)) where?: Where<Visitas>,
  ): Promise<Count> {
    return this.medicoRepository.visitas(id).patch(visitas, where);
  }

  @del('/medicos/{id}/visitas', {
    responses: {
      '200': {
        description: 'Medico.Visitas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Visitas)) where?: Where<Visitas>,
  ): Promise<Count> {
    return this.medicoRepository.visitas(id).delete(where);
  }
}
