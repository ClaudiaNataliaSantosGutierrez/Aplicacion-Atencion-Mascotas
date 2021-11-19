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
import {Visita} from '../models';
import {VisitaRepository} from '../repositories';

export class VisitaController {
  constructor(
    @repository(VisitaRepository)
    public visitaRepository : VisitaRepository,
  ) {}

  @post('/visitas')
  @response(200, {
    description: 'Visita model instance',
    content: {'application/json': {schema: getModelSchemaRef(Visita)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visita, {
            title: 'NewVisita',
            exclude: ['id'],
          }),
        },
      },
    })
    visita: Omit<Visita, 'id'>,
  ): Promise<Visita> {
    return this.visitaRepository.create(visita);
  }

  @get('/visitas/count')
  @response(200, {
    description: 'Visita model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Visita) where?: Where<Visita>,
  ): Promise<Count> {
    return this.visitaRepository.count(where);
  }

  @get('/visitas')
  @response(200, {
    description: 'Array of Visita model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Visita, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Visita) filter?: Filter<Visita>,
  ): Promise<Visita[]> {
    return this.visitaRepository.find(filter);
  }

  @patch('/visitas')
  @response(200, {
    description: 'Visita PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visita, {partial: true}),
        },
      },
    })
    visita: Visita,
    @param.where(Visita) where?: Where<Visita>,
  ): Promise<Count> {
    return this.visitaRepository.updateAll(visita, where);
  }

  @get('/visitas/{id}')
  @response(200, {
    description: 'Visita model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Visita, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Visita, {exclude: 'where'}) filter?: FilterExcludingWhere<Visita>
  ): Promise<Visita> {
    return this.visitaRepository.findById(id, filter);
  }

  @patch('/visitas/{id}')
  @response(204, {
    description: 'Visita PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visita, {partial: true}),
        },
      },
    })
    visita: Visita,
  ): Promise<void> {
    await this.visitaRepository.updateById(id, visita);
  }

  @put('/visitas/{id}')
  @response(204, {
    description: 'Visita PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() visita: Visita,
  ): Promise<void> {
    await this.visitaRepository.replaceById(id, visita);
  }

  @del('/visitas/{id}')
  @response(204, {
    description: 'Visita DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.visitaRepository.deleteById(id);
  }
}
