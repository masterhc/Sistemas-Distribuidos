import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Somemodel} from '../models';
import {SomerepoRepository} from '../repositories';

export class SomecontrollerController {
  constructor(
    @repository(SomerepoRepository)
    public somerepoRepository : SomerepoRepository,
  ) {}

  @post('/somemodels')
  @response(200, {
    description: 'Somemodel model instance',
    content: {'application/json': {schema: getModelSchemaRef(Somemodel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Somemodel, {
            title: 'NewSomemodel',
            exclude: ['id'],
          }),
        },
      },
    })
    somemodel: Omit<Somemodel, 'id'>,
  ): Promise<Somemodel> {
    return this.somerepoRepository.create(somemodel);
  }

  @get('/somemodels/count')
  @response(200, {
    description: 'Somemodel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Somemodel) where?: Where<Somemodel>,
  ): Promise<Count> {
    return this.somerepoRepository.count(where);
  }

  @get('/somemodels')
  @response(200, {
    description: 'Array of Somemodel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Somemodel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Somemodel) filter?: Filter<Somemodel>,
  ): Promise<Somemodel[]> {
    return this.somerepoRepository.find(filter);
  }

  @patch('/somemodels')
  @response(200, {
    description: 'Somemodel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Somemodel, {partial: true}),
        },
      },
    })
    somemodel: Somemodel,
    @param.where(Somemodel) where?: Where<Somemodel>,
  ): Promise<Count> {
    return this.somerepoRepository.updateAll(somemodel, where);
  }

  @get('/somemodels/{id}')
  @response(200, {
    description: 'Somemodel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Somemodel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Somemodel, {exclude: 'where'}) filter?: FilterExcludingWhere<Somemodel>
  ): Promise<Somemodel> {
    return this.somerepoRepository.findById(id, filter);
  }

  @patch('/somemodels/{id}')
  @response(204, {
    description: 'Somemodel PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Somemodel, {partial: true}),
        },
      },
    })
    somemodel: Somemodel,
  ): Promise<void> {
    await this.somerepoRepository.updateById(id, somemodel);
  }

  @put('/somemodels/{id}')
  @response(204, {
    description: 'Somemodel PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() somemodel: Somemodel,
  ): Promise<void> {
    await this.somerepoRepository.replaceById(id, somemodel);
  }

  @del('/somemodels/{id}')
  @response(204, {
    description: 'Somemodel DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.somerepoRepository.deleteById(id);
  }
}
