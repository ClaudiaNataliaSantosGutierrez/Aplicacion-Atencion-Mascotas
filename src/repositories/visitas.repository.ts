import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Visitas, VisitasRelations} from '../models';

export class VisitasRepository extends DefaultCrudRepository<
  Visitas,
  typeof Visitas.prototype.id,
  VisitasRelations
> {
  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource,
  ) {
    super(Visitas, dataSource);
  }
}
