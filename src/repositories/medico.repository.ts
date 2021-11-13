import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Medico, MedicoRelations, Solicitud, Visitas} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {VisitasRepository} from './visitas.repository';

export class MedicoRepository extends DefaultCrudRepository<
  Medico,
  typeof Medico.prototype.id,
  MedicoRelations
> {

  public readonly solicitudes: HasManyRepositoryFactory<Solicitud, typeof Medico.prototype.id>;

  public readonly visitas: HasManyRepositoryFactory<Visitas, typeof Medico.prototype.id>;

  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('VisitasRepository') protected visitasRepositoryGetter: Getter<VisitasRepository>,
  ) {
    super(Medico, dataSource);
    this.visitas = this.createHasManyRepositoryFactoryFor('visitas', visitasRepositoryGetter,);
    this.registerInclusionResolver('visitas', this.visitas.inclusionResolver);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
  }
}
