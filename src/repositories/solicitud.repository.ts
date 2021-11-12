import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Propietario} from '../models';
import {PropietarioRepository} from './propietario.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly propietario: BelongsToAccessor<Propietario, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>,
  ) {
    super(Solicitud, dataSource);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
  }
}
