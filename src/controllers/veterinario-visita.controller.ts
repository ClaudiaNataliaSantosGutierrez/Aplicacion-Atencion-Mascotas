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
  Visita,
} from '../models';
import {VeterinarioRepository} from '../repositories';

export class VeterinarioVisitaController {
  constructor(
    @repository(VeterinarioRepository) protected veterinarioRepository: VeterinarioRepository,
  ) { }

  @get('/veterinarios/{id}/visitas', {
    responses: {
      '200': {
        description: 'Array of Veterinario has many Visita',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Visita)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Visita>,
  ): Promise<Visita[]> {
    return this.veterinarioRepository.visitas(id).find(filter);
  }

  @post('/veterinarios/{id}/visitas', {
    responses: {
      '200': {
        description: 'Veterinario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Visita)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Veterinario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visita, {
            title: 'NewVisitaInVeterinario',
            exclude: ['id'],
            optional: ['veterinarioId']
          }),
        },
      },
    }) visita: Omit<Visita, 'id'>,
  ): Promise<Visita> {
    return this.veterinarioRepository.visitas(id).create(visita);
  }

  @patch('/veterinarios/{id}/visitas', {
    responses: {
      '200': {
        description: 'Veterinario.Visita PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visita, {partial: true}),
        },
      },
    })
    visita: Partial<Visita>,
    @param.query.object('where', getWhereSchemaFor(Visita)) where?: Where<Visita>,
  ): Promise<Count> {
    return this.veterinarioRepository.visitas(id).patch(visita, where);
  }

  @del('/veterinarios/{id}/visitas', {
    responses: {
      '200': {
        description: 'Veterinario.Visita DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Visita)) where?: Where<Visita>,
  ): Promise<Count> {
    return this.veterinarioRepository.visitas(id).delete(where);
  }
}
