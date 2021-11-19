import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Veterinaria, VeterinariaRelations, Veterinario} from '../models';
import {VeterinarioRepository} from './veterinario.repository';

export class VeterinariaRepository extends DefaultCrudRepository<
  Veterinaria,
  typeof Veterinaria.prototype.id,
  VeterinariaRelations
> {

  public readonly veterinarios: HasManyRepositoryFactory<Veterinario, typeof Veterinaria.prototype.id>;

  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource, @repository.getter('VeterinarioRepository') protected veterinarioRepositoryGetter: Getter<VeterinarioRepository>,
  ) {
    super(Veterinaria, dataSource);
    this.veterinarios = this.createHasManyRepositoryFactoryFor('veterinarios', veterinarioRepositoryGetter,);
    this.registerInclusionResolver('veterinarios', this.veterinarios.inclusionResolver);
  }
}
