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
  Mascota,
  Visitas,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaVisitasController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/visitas', {
    responses: {
      '200': {
        description: 'Array of Mascota has many Visitas',
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
    return this.mascotaRepository.visitas(id).find(filter);
  }

  @post('/mascotas/{id}/visitas', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(Visitas)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visitas, {
            title: 'NewVisitasInMascota',
            exclude: ['id'],
            optional: ['mascotaId']
          }),
        },
      },
    }) visitas: Omit<Visitas, 'id'>,
  ): Promise<Visitas> {
    return this.mascotaRepository.visitas(id).create(visitas);
  }

  @patch('/mascotas/{id}/visitas', {
    responses: {
      '200': {
        description: 'Mascota.Visitas PATCH success count',
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
    return this.mascotaRepository.visitas(id).patch(visitas, where);
  }

  @del('/mascotas/{id}/visitas', {
    responses: {
      '200': {
        description: 'Mascota.Visitas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Visitas)) where?: Where<Visitas>,
  ): Promise<Count> {
    return this.mascotaRepository.visitas(id).delete(where);
  }
}
