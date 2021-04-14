import {Entity, model, property} from '@loopback/repository';

@model()
export class ToDo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
    required: true,
  })
  todo: string;


  constructor(data?: Partial<ToDo>) {
    super(data);
  }
}

export interface ToDoRelations {
  // describe navigational properties here
}

export type ToDoWithRelations = ToDo & ToDoRelations;
