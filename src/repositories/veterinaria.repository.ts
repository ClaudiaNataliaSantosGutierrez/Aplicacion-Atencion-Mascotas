import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Veterinaria, VeterinariaRelations} from '../models';

export class VeterinariaRepository extends DefaultCrudRepository<
  Veterinaria,
  typeof Veterinaria.prototype.id,
  VeterinariaRelations
> {
  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource,
  ) {
    super(Veterinaria, dataSource);
  }
}
