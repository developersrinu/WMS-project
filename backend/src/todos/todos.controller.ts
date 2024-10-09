import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post('create')
  async create(@Body() dto: { title: string }): Promise<Todo> {
    return this.todosService.create(dto);
  }

  @Put(':id')
  async updateTodo(
    @Param('id') id: number, 
    @Body() dto: { title: string },
  ): Promise<Todo> {
    return this.todosService.updateTodo({ ...dto, id }); 
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    return this.todosService.delete(id);
  }

  @Get()
  async findAll(): Promise<{ todos: Todo[]; status: string }> {
    return this.todosService.findAll(); 
  }

  @Get(':id') 
  async findOne(@Param('id') id: number): Promise<Todo> {
    return this.todosService.todo(id);
  }
}
