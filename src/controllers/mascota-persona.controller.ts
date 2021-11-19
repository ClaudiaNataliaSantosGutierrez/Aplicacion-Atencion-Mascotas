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
  Persona,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaPersonaController {
  constructor(
    @repository(MascotaRepository)
    public mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Mascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Mascota.prototype.id,
  ): Promise<Persona> {
    return this.mascotaRepository.persona(id);
  }
}
