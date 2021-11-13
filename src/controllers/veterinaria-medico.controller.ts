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
  Medico,
} from '../models';
import {VeterinariaRepository} from '../repositories';

export class VeterinariaMedicoController {
  constructor(
    @repository(VeterinariaRepository) protected veterinariaRepository: VeterinariaRepository,
  ) { }

  @get('/veterinarias/{id}/medicos', {
    responses: {
      '200': {
        description: 'Array of Veterinaria has many Medico',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Medico)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Medico>,
  ): Promise<Medico[]> {
    return this.veterinariaRepository.medicos(id).find(filter);
  }

  @post('/veterinarias/{id}/medicos', {
    responses: {
      '200': {
        description: 'Veterinaria model instance',
        content: {'application/json': {schema: getModelSchemaRef(Medico)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Veterinaria.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Medico, {
            title: 'NewMedicoInVeterinaria',
            exclude: ['id'],
            optional: ['veterinariaId']
          }),
        },
      },
    }) medico: Omit<Medico, 'id'>,
  ): Promise<Medico> {
    return this.veterinariaRepository.medicos(id).create(medico);
  }

  @patch('/veterinarias/{id}/medicos', {
    responses: {
      '200': {
        description: 'Veterinaria.Medico PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Medico, {partial: true}),
        },
      },
    })
    medico: Partial<Medico>,
    @param.query.object('where', getWhereSchemaFor(Medico)) where?: Where<Medico>,
  ): Promise<Count> {
    return this.veterinariaRepository.medicos(id).patch(medico, where);
  }

  @del('/veterinarias/{id}/medicos', {
    responses: {
      '200': {
        description: 'Veterinaria.Medico DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Medico)) where?: Where<Medico>,
  ): Promise<Count> {
    return this.veterinariaRepository.medicos(id).delete(where);
  }
}
