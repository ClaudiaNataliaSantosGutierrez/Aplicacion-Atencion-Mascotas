import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Visita, VisitaRelations, Veterinario, Solicitud} from '../models';
import {VeterinarioRepository} from './veterinario.repository';
import {SolicitudRepository} from './solicitud.repository';

export class VisitaRepository extends DefaultCrudRepository<
  Visita,
  typeof Visita.prototype.id,
  VisitaRelations
> {

  public readonly veterinario: BelongsToAccessor<Veterinario, typeof Visita.prototype.id>;

  public readonly solicitud: BelongsToAccessor<Solicitud, typeof Visita.prototype.id>;

  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource, @repository.getter('VeterinarioRepository') protected veterinarioRepositoryGetter: Getter<VeterinarioRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Visita, dataSource);
    this.solicitud = this.createBelongsToAccessorFor('solicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitud', this.solicitud.inclusionResolver);
    this.veterinario = this.createBelongsToAccessorFor('veterinario', veterinarioRepositoryGetter,);
    this.registerInclusionResolver('veterinario', this.veterinario.inclusionResolver);
  }
}
