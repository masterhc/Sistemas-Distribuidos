import {Entity, model, property} from '@loopback/repository';

@model()
export class Somemodel extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;


  constructor(data?: Partial<Somemodel>) {
    super(data);
  }
}

export interface SomemodelRelations {
  // describe navigational properties here
}

export type SomemodelWithRelations = Somemodel & SomemodelRelations;
