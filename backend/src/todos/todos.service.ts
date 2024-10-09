import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm'; 
import { Todo } from './todo.entity';

@Injectable() 
export class TodosService {
  
  constructor(
    @InjectRepository(Todo) 
    private readonly todoRepository: Repository<Todo>, 
  ) {}


  async create(dto: { title: string }) {
    try {
      if (!dto.title) {
        throw new Error('Title must be provided');
      }
      // Creates a new Todo entity instance with the given data (dto)
      const todo = this.todoRepository.create(dto);

      // Saves the created Todo entity to the database and logs the saved entity
      const savedTodo = await this.todoRepository.save(todo);
      console.log('Todo created:', savedTodo); // Log the saved Todo entity

      return { ...savedTodo, status: 'success' };
    } catch (error) {
      console.error('Error creating todo:', error); // Log the error
      throw new InternalServerErrorException('Could not create todo'); // Throw an error for further handling
    }
  }

  async updateTodo(dto: { title: string; id: number }): Promise<Todo> {
    try {
      // Update the todo item based on the ID
      const updateResult = await this.todoRepository.update(
        { id: dto.id }, // Where condition
        { title: dto.title }, // Updated values
      );

      // Check if any rows were affected by the update
      if (updateResult.affected === 0) {
        console.log('No records updated for ID:', dto.id);
        throw new NotFoundException(`Todo with ID ${dto.id} not found`);
      }

      // Fetch the updated todo
      const updatedTodo = await this.todoRepository.findOneBy({ id: dto.id });
      if (!updatedTodo) {
        throw new NotFoundException(`Updated todo with ID ${dto.id} not found`);
      }

      console.log(updatedTodo);
      return updatedTodo;
    } catch (error) {
      console.error('Error updating todo:', error.message || error);
      throw new InternalServerErrorException('Could not update todo');
    }
  }


  async delete(id: number) {
    try {
      const deleteResult = await this.todoRepository.delete(id);

      // Check if any rows were affected (meaning if the record was actually deleted)
      if (deleteResult.affected === 0) {
        throw new NotFoundException(`Todo with ID ${id} not found`);
      }

      console.log(`Todo with ID ${id} deleted successfully.`);
      return { message: `Todo with ID ${id} deleted successfully` };
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw new InternalServerErrorException('Could not delete todo');
    }
  }

  
  async findAll(): Promise<{ todos: Todo[]; status: string }> {
    try {
      const todos = await this.todoRepository.find(); // Find all records
      return { todos, status: 'success' };
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw new InternalServerErrorException('Could not fetch todos');
    }
  }


  async todo(id: number): Promise<Todo> {
    try {
      const todo = await this.todoRepository.findOneBy({ id }); 

      if (!todo) {
        throw new NotFoundException(`Todo with ID ${id} not found`);
      }

      return todo; 
    } catch (error) {
      console.error('Error fetching todo:', error);
      throw new InternalServerErrorException('Could not fetch todo'); 
    }
  }
}
