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
import {Mascota} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaController {
  constructor(
    @repository(MascotaRepository)
    public mascotaRepository : MascotaRepository,
  ) {}

  @post('/mascotas')
  @response(200, {
    description: 'Mascota model instance',
    content: {'application/json': {schema: getModelSchemaRef(Mascota)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {
            title: 'NewMascota',
            exclude: ['id'],
          }),
        },
      },
    })
    mascota: Omit<Mascota, 'id'>,
  ): Promise<Mascota> {
    return this.mascotaRepository.create(mascota);
  }

  @get('/mascotas/count')
  @response(200, {
    description: 'Mascota model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Mascota) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.mascotaRepository.count(where);
  }

  @get('/mascotas')
  @response(200, {
    description: 'Array of Mascota model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Mascota, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Mascota) filter?: Filter<Mascota>,
  ): Promise<Mascota[]> {
    return this.mascotaRepository.find(filter);
  }

  @patch('/mascotas')
  @response(200, {
    description: 'Mascota PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {partial: true}),
        },
      },
    })
    mascota: Mascota,
    @param.where(Mascota) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.mascotaRepository.updateAll(mascota, where);
  }

  @get('/mascotas/{id}')
  @response(200, {
    description: 'Mascota model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Mascota, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Mascota, {exclude: 'where'}) filter?: FilterExcludingWhere<Mascota>
  ): Promise<Mascota> {
    return this.mascotaRepository.findById(id, filter);
  }

  @patch('/mascotas/{id}')
  @response(204, {
    description: 'Mascota PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {partial: true}),
        },
      },
    })
    mascota: Mascota,
  ): Promise<void> {
    await this.mascotaRepository.updateById(id, mascota);
  }

  @put('/mascotas/{id}')
  @response(204, {
    description: 'Mascota PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() mascota: Mascota,
  ): Promise<void> {
    await this.mascotaRepository.replaceById(id, mascota);
  }

  @del('/mascotas/{id}')
  @response(204, {
    description: 'Mascota DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.mascotaRepository.deleteById(id);
  }
}
