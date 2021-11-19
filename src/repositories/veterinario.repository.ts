import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Veterinario, VeterinarioRelations, Veterinaria, Visita, Solicitud} from '../models';
import {VeterinariaRepository} from './veterinaria.repository';
import {VisitaRepository} from './visita.repository';
import {SolicitudRepository} from './solicitud.repository';

export class VeterinarioRepository extends DefaultCrudRepository<
  Veterinario,
  typeof Veterinario.prototype.id,
  VeterinarioRelations
> {

  public readonly veterinaria: BelongsToAccessor<Veterinaria, typeof Veterinario.prototype.id>;

  public readonly visitas: HasManyRepositoryFactory<Visita, typeof Veterinario.prototype.id>;

  public readonly solicitudes: HasManyRepositoryFactory<Solicitud, typeof Veterinario.prototype.id>;

  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource, @repository.getter('VeterinariaRepository') protected veterinariaRepositoryGetter: Getter<VeterinariaRepository>, @repository.getter('VisitaRepository') protected visitaRepositoryGetter: Getter<VisitaRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Veterinario, dataSource);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
    this.visitas = this.createHasManyRepositoryFactoryFor('visitas', visitaRepositoryGetter,);
    this.registerInclusionResolver('visitas', this.visitas.inclusionResolver);
    this.veterinaria = this.createBelongsToAccessorFor('veterinaria', veterinariaRepositoryGetter,);
    this.registerInclusionResolver('veterinaria', this.veterinaria.inclusionResolver);
  }
}
