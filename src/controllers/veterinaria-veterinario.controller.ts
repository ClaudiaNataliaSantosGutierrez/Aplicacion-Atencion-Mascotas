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
  Veterinaria,
  Veterinario,
} from '../models';
import {VeterinariaRepository} from '../repositories';

export class VeterinariaVeterinarioController {
  constructor(
    @repository(VeterinariaRepository) protected veterinariaRepository: VeterinariaRepository,
  ) { }

  @get('/veterinarias/{id}/veterinarios', {
    responses: {
      '200': {
        description: 'Array of Veterinaria has many Veterinario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Veterinario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Veterinario>,
  ): Promise<Veterinario[]> {
    return this.veterinariaRepository.veterinarios(id).find(filter);
  }

  @post('/veterinarias/{id}/veterinarios', {
    responses: {
      '200': {
        description: 'Veterinaria model instance',
        content: {'application/json': {schema: getModelSchemaRef(Veterinario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Veterinaria.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veterinario, {
            title: 'NewVeterinarioInVeterinaria',
            exclude: ['id'],
            optional: ['veterinariaId']
          }),
        },
      },
    }) veterinario: Omit<Veterinario, 'id'>,
  ): Promise<Veterinario> {
    return this.veterinariaRepository.veterinarios(id).create(veterinario);
  }

  @patch('/veterinarias/{id}/veterinarios', {
    responses: {
      '200': {
        description: 'Veterinaria.Veterinario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Veterinario, {partial: true}),
        },
      },
    })
    veterinario: Partial<Veterinario>,
    @param.query.object('where', getWhereSchemaFor(Veterinario)) where?: Where<Veterinario>,
  ): Promise<Count> {
    return this.veterinariaRepository.veterinarios(id).patch(veterinario, where);
  }

  @del('/veterinarias/{id}/veterinarios', {
    responses: {
      '200': {
        description: 'Veterinaria.Veterinario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Veterinario)) where?: Where<Veterinario>,
  ): Promise<Count> {
    return this.veterinariaRepository.veterinarios(id).delete(where);
  }
}
