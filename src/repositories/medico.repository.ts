import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Medico, MedicoRelations} from '../models';

export class MedicoRepository extends DefaultCrudRepository<
  Medico,
  typeof Medico.prototype.id,
  MedicoRelations
> {
  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource,
  ) {
    super(Medico, dataSource);
  }
}
