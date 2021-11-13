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
import {Veterinaria} from '../models';
import {VeterinariaRepository} from '../repositories';

export class VeterinariaController {
  constructor(
    @repository(VeterinariaRepository)
    public veterinariaRepository : VeterinariaRepository,
  ) {}

  @post('/veterinarias')
  @response(200, {
    description: 'Veterinaria model instance',
    content: {'application/json': {schema: getModelSchemaRef(Veterinaria)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veterinaria, {
            title: 'NewVeterinaria',
            exclude: ['id'],
          }),
        },
      },
    })
    veterinaria: Omit<Veterinaria, 'id'>,
  ): Promise<Veterinaria> {
    return this.veterinariaRepository.create(veterinaria);
  }

  @get('/veterinarias/count')
  @response(200, {
    description: 'Veterinaria model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Veterinaria) where?: Where<Veterinaria>,
  ): Promise<Count> {
    return this.veterinariaRepository.count(where);
  }

  @get('/veterinarias')
  @response(200, {
    description: 'Array of Veterinaria model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Veterinaria, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Veterinaria) filter?: Filter<Veterinaria>,
  ): Promise<Veterinaria[]> {
    return this.veterinariaRepository.find(filter);
  }

  @patch('/veterinarias')
  @response(200, {
    description: 'Veterinaria PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veterinaria, {partial: true}),
        },
      },
    })
    veterinaria: Veterinaria,
    @param.where(Veterinaria) where?: Where<Veterinaria>,
  ): Promise<Count> {
    return this.veterinariaRepository.updateAll(veterinaria, where);
  }

  @get('/veterinarias/{id}')
  @response(200, {
    description: 'Veterinaria model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Veterinaria, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Veterinaria, {exclude: 'where'}) filter?: FilterExcludingWhere<Veterinaria>
  ): Promise<Veterinaria> {
    return this.veterinariaRepository.findById(id, filter);
  }

  @patch('/veterinarias/{id}')
  @response(204, {
    description: 'Veterinaria PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veterinaria, {partial: true}),
        },
      },
    })
    veterinaria: Veterinaria,
  ): Promise<void> {
    await this.veterinariaRepository.updateById(id, veterinaria);
  }

  @put('/veterinarias/{id}')
  @response(204, {
    description: 'Veterinaria PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() veterinaria: Veterinaria,
  ): Promise<void> {
    await this.veterinariaRepository.replaceById(id, veterinaria);
  }

  @del('/veterinarias/{id}')
  @response(204, {
    description: 'Veterinaria DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.veterinariaRepository.deleteById(id);
  }
}
