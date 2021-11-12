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
  Propietario,
  Mascota,
} from '../models';
import {PropietarioRepository} from '../repositories';

export class PropietarioMascotaController {
  constructor(
    @repository(PropietarioRepository) protected propietarioRepository: PropietarioRepository,
  ) { }

  @get('/propietarios/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Array of Propietario has many Mascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Mascota>,
  ): Promise<Mascota[]> {
    return this.propietarioRepository.mascotas(id).find(filter);
  }

  @post('/propietarios/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Propietario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mascota)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Propietario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {
            title: 'NewMascotaInPropietario',
            exclude: ['id'],
            optional: ['propietarioId']
          }),
        },
      },
    }) mascota: Omit<Mascota, 'id'>,
  ): Promise<Mascota> {
    return this.propietarioRepository.mascotas(id).create(mascota);
  }

  @patch('/propietarios/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Propietario.Mascota PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {partial: true}),
        },
      },
    })
    mascota: Partial<Mascota>,
    @param.query.object('where', getWhereSchemaFor(Mascota)) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.propietarioRepository.mascotas(id).patch(mascota, where);
  }

  @del('/propietarios/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Propietario.Mascota DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Mascota)) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.propietarioRepository.mascotas(id).delete(where);
  }
}
