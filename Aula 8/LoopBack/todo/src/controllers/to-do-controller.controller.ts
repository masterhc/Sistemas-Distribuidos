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
import {ToDo} from '../models';
import {ToDoRepoRepository} from '../repositories';

export class ToDoControllerController {
  constructor(
    @repository(ToDoRepoRepository)
    public toDoRepoRepository : ToDoRepoRepository,
  ) {}

  @post('/todo')
  @response(200, {
    description: 'ToDo model instance',
    content: {'application/json': {schema: getModelSchemaRef(ToDo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ToDo, {
            title: 'NewToDo',
            exclude: ['id'],
          }),
        },
      },
    })
    toDo: Omit<ToDo, 'id'>,
  ): Promise<ToDo> {
    return this.toDoRepoRepository.create(toDo);
  }

  @get('/todo/count')
  @response(200, {
    description: 'ToDo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ToDo) where?: Where<ToDo>,
  ): Promise<Count> {
    return this.toDoRepoRepository.count(where);
  }

  @get('/todo')
  @response(200, {
    description: 'Array of ToDo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ToDo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ToDo) filter?: Filter<ToDo>,
  ): Promise<ToDo[]> {
    return this.toDoRepoRepository.find(filter);
  }

  @patch('/todo')
  @response(200, {
    description: 'ToDo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ToDo, {partial: true}),
        },
      },
    })
    toDo: ToDo,
    @param.where(ToDo) where?: Where<ToDo>,
  ): Promise<Count> {
    return this.toDoRepoRepository.updateAll(toDo, where);
  }

  @get('/todo/{id}')
  @response(200, {
    description: 'ToDo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ToDo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ToDo, {exclude: 'where'}) filter?: FilterExcludingWhere<ToDo>
  ): Promise<ToDo> {
    return this.toDoRepoRepository.findById(id, filter);
  }

  @patch('/todo/{id}')
  @response(204, {
    description: 'ToDo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ToDo, {partial: true}),
        },
      },
    })
    toDo: ToDo,
  ): Promise<void> {
    await this.toDoRepoRepository.updateById(id, toDo);
  }

  @put('/todo/{id}')
  @response(204, {
    description: 'ToDo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() toDo: ToDo,
  ): Promise<void> {
    await this.toDoRepoRepository.replaceById(id, toDo);
  }

  @del('/todo/{id}')
  @response(204, {
    description: 'ToDo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.toDoRepoRepository.deleteById(id);
  }
}
