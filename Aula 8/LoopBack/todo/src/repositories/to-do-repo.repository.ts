import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DsToDoDataSource} from '../datasources';
import {ToDo, ToDoRelations} from '../models';

export class ToDoRepoRepository extends DefaultCrudRepository<
  ToDo,
  typeof ToDo.prototype.id,
  ToDoRelations
> {
  constructor(
    @inject('datasources.DS_ToDo') dataSource: DsToDoDataSource,
  ) {
    super(ToDo, dataSource);
  }
}
