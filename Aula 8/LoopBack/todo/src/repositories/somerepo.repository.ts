import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SomedsDataSource} from '../datasources';
import {Somemodel, SomemodelRelations} from '../models';

export class SomerepoRepository extends DefaultCrudRepository<
  Somemodel,
  typeof Somemodel.prototype.id,
  SomemodelRelations
> {
  constructor(
    @inject('datasources.someds') dataSource: SomedsDataSource,
  ) {
    super(Somemodel, dataSource);
  }
}
