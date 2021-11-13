import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Mascota, MascotaRelations, Propietario, Visitas, Solicitud} from '../models';
import {PropietarioRepository} from './propietario.repository';
import {VisitasRepository} from './visitas.repository';
import {SolicitudRepository} from './solicitud.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.id,
  MascotaRelations
> {

  public readonly propietario: BelongsToAccessor<Propietario, typeof Mascota.prototype.id>;

  public readonly visitas: HasManyRepositoryFactory<Visitas, typeof Mascota.prototype.id>;

  public readonly solicitudes: HasManyRepositoryFactory<Solicitud, typeof Mascota.prototype.id>;

  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('VisitasRepository') protected visitasRepositoryGetter: Getter<VisitasRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Mascota, dataSource);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
    this.visitas = this.createHasManyRepositoryFactoryFor('visitas', visitasRepositoryGetter,);
    this.registerInclusionResolver('visitas', this.visitas.inclusionResolver);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
  }
}
