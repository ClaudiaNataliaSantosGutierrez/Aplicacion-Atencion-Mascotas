import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Propietario, PropietarioRelations, Solicitud, Mascota} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {MascotaRepository} from './mascota.repository';

export class PropietarioRepository extends DefaultCrudRepository<
  Propietario,
  typeof Propietario.prototype.id,
  PropietarioRelations
> {

  public readonly solicituds: HasManyRepositoryFactory<Solicitud, typeof Propietario.prototype.id>;

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Propietario.prototype.id>;

  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(Propietario, dataSource);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
    this.solicituds = this.createHasManyRepositoryFactoryFor('solicituds', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicituds', this.solicituds.inclusionResolver);
  }
}
