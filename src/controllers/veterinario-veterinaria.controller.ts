import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Veterinario,
  Veterinaria,
} from '../models';
import {VeterinarioRepository} from '../repositories';

export class VeterinarioVeterinariaController {
  constructor(
    @repository(VeterinarioRepository)
    public veterinarioRepository: VeterinarioRepository,
  ) { }

  @get('/veterinarios/{id}/veterinaria', {
    responses: {
      '200': {
        description: 'Veterinaria belonging to Veterinario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Veterinaria)},
          },
        },
      },
    },
  })
  async getVeterinaria(
    @param.path.string('id') id: typeof Veterinario.prototype.id,
  ): Promise<Veterinaria> {
    return this.veterinarioRepository.veterinaria(id);
  }
}
