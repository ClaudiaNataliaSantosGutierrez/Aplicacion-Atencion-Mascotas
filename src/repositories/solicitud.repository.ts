import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Solicitud, SolicitudRelations} from '../models';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {
  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource,
  ) {
    super(Solicitud, dataSource);
  }
}
