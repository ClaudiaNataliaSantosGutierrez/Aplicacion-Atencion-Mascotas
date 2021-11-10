import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Tipoanimal, TipoanimalRelations} from '../models';

export class TipoanimalRepository extends DefaultCrudRepository<
  Tipoanimal,
  typeof Tipoanimal.prototype.id,
  TipoanimalRelations
> {
  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource,
  ) {
    super(Tipoanimal, dataSource);
  }
}
