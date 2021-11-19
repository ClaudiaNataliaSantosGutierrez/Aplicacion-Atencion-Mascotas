import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Persona, Veterinario, Mascota, Visita} from '../models';
import {PersonaRepository} from './persona.repository';
import {VeterinarioRepository} from './veterinario.repository';
import {MascotaRepository} from './mascota.repository';
import {VisitaRepository} from './visita.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof Solicitud.prototype.id>;

  public readonly veterinario: BelongsToAccessor<Veterinario, typeof Solicitud.prototype.id>;

  public readonly mascota: BelongsToAccessor<Mascota, typeof Solicitud.prototype.id>;

  public readonly visitas: HasManyRepositoryFactory<Visita, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('VeterinarioRepository') protected veterinarioRepositoryGetter: Getter<VeterinarioRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('VisitaRepository') protected visitaRepositoryGetter: Getter<VisitaRepository>,
  ) {
    super(Solicitud, dataSource);
    this.visitas = this.createHasManyRepositoryFactoryFor('visitas', visitaRepositoryGetter,);
    this.registerInclusionResolver('visitas', this.visitas.inclusionResolver);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
    this.veterinario = this.createBelongsToAccessorFor('veterinario', veterinarioRepositoryGetter,);
    this.registerInclusionResolver('veterinario', this.veterinario.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
