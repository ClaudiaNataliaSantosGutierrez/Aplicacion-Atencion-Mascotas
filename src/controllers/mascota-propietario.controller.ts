import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Mascota,
  Propietario,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaPropietarioController {
  constructor(
    @repository(MascotaRepository)
    public mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/propietario', {
    responses: {
      '200': {
        description: 'Propietario belonging to Mascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Propietario)},
          },
        },
      },
    },
  })
  async getPropietario(
    @param.path.string('id') id: typeof Mascota.prototype.id,
  ): Promise<Propietario> {
    return this.mascotaRepository.propietario(id);
  }
}
