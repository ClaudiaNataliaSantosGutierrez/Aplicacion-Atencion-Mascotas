import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Mascota, MascotaRelations, Propietario} from '../models';
import {PropietarioRepository} from './propietario.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.id,
  MascotaRelations
> {

  public readonly propietario: BelongsToAccessor<Propietario, typeof Mascota.prototype.id>;

  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>,
  ) {
    super(Mascota, dataSource);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
  }
}
