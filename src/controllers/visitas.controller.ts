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
import {Visitas} from '../models';
import {VisitasRepository} from '../repositories';

export class VisitasController {
  constructor(
    @repository(VisitasRepository)
    public visitasRepository : VisitasRepository,
  ) {}

  @post('/visitas')
  @response(200, {
    description: 'Visitas model instance',
    content: {'application/json': {schema: getModelSchemaRef(Visitas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visitas, {
            title: 'NewVisitas',
            exclude: ['id'],
          }),
        },
      },
    })
    visitas: Omit<Visitas, 'id'>,
  ): Promise<Visitas> {
    return this.visitasRepository.create(visitas);
  }

  @get('/visitas/count')
  @response(200, {
    description: 'Visitas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Visitas) where?: Where<Visitas>,
  ): Promise<Count> {
    return this.visitasRepository.count(where);
  }

  @get('/visitas')
  @response(200, {
    description: 'Array of Visitas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Visitas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Visitas) filter?: Filter<Visitas>,
  ): Promise<Visitas[]> {
    return this.visitasRepository.find(filter);
  }

  @patch('/visitas')
  @response(200, {
    description: 'Visitas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visitas, {partial: true}),
        },
      },
    })
    visitas: Visitas,
    @param.where(Visitas) where?: Where<Visitas>,
  ): Promise<Count> {
    return this.visitasRepository.updateAll(visitas, where);
  }

  @get('/visitas/{id}')
  @response(200, {
    description: 'Visitas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Visitas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Visitas, {exclude: 'where'}) filter?: FilterExcludingWhere<Visitas>
  ): Promise<Visitas> {
    return this.visitasRepository.findById(id, filter);
  }

  @patch('/visitas/{id}')
  @response(204, {
    description: 'Visitas PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visitas, {partial: true}),
        },
      },
    })
    visitas: Visitas,
  ): Promise<void> {
    await this.visitasRepository.updateById(id, visitas);
  }

  @put('/visitas/{id}')
  @response(204, {
    description: 'Visitas PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() visitas: Visitas,
  ): Promise<void> {
    await this.visitasRepository.replaceById(id, visitas);
  }

  @del('/visitas/{id}')
  @response(204, {
    description: 'Visitas DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.visitasRepository.deleteById(id);
  }
}
