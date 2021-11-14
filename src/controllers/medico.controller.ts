import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Medico} from '../models';
import {MedicoRepository} from '../repositories';

export class MedicoController {
  constructor(
    @repository(MedicoRepository)
    public medicoRepository : MedicoRepository,
  ) {}

  @post('/medicos')
  @response(200, {
    description: 'Medico model instance',
    content: {'application/json': {schema: getModelSchemaRef(Medico)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Medico, {
            title: 'NewMedico',
            exclude: ['id'],
          }),
        },
      },
    })
    medico: Omit<Medico, 'id'>,
  ): Promise<Medico> {
    return this.medicoRepository.create(medico);
  }

  @get('/medicos/count')
  @response(200, {
    description: 'Medico model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Medico) where?: Where<Medico>,
  ): Promise<Count> {
    return this.medicoRepository.count(where);
  }

  @get('/medicos')
  @response(200, {
    description: 'Array of Medico model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Medico, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Medico) filter?: Filter<Medico>,
  ): Promise<Medico[]> {
    return this.medicoRepository.find(filter);
  }

  @patch('/medicos')
  @response(200, {
    description: 'Medico PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Medico, {partial: true}),
        },
      },
    })
    medico: Medico,
    @param.where(Medico) where?: Where<Medico>,
  ): Promise<Count> {
    return this.medicoRepository.updateAll(medico, where);
  }

  @get('/medicos/{id}')
  @response(200, {
    description: 'Medico model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Medico, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Medico, {exclude: 'where'}) filter?: FilterExcludingWhere<Medico>
  ): Promise<Medico> {
    return this.medicoRepository.findById(id, filter);
  }

  @patch('/medicos/{id}')
  @response(204, {
    description: 'Medico PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Medico, {partial: true}),
        },
      },
    })
    medico: Medico,
  ): Promise<void> {
    await this.medicoRepository.updateById(id, medico);
  }

  @put('/medicos/{id}')
  @response(204, {
    description: 'Medico PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() medico: Medico,
  ): Promise<void> {
    await this.medicoRepository.replaceById(id, medico);
  }

  @del('/medicos/{id}')
  @response(204, {
    description: 'Medico DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.medicoRepository.deleteById(id);
  }
}
