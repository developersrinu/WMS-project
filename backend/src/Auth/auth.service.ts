// import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { AuthUser } from './auth.entity';
// import * as bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';

// interface CreateUserDto {
//   userName: string;
//   email: string;
//   password: string;
// }

// interface LoginUserDto {
//   email: string;
//   password: string;
// }

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectRepository(AuthUser)
//     private readonly authRepository: Repository<AuthUser>,
//     private readonly jwtService: JwtService,
//   ) { }

//   async register(dto: CreateUserDto): Promise<AuthUser> {
//     try {
//       console.log('Password before hashing:', dto.password);

//       // Validate input
//       if (typeof dto.password !== 'string') {
//         throw new HttpException('Invalid password format', HttpStatus.BAD_REQUEST);
//       }

//       // Check for existing user
//       const existingUser = await this.authRepository.findOne({ where: { email: dto.email } });
//       if (existingUser) {
//         throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
//       }

//       // const saltRounds = 10;
//       const hashedPassword = await bcrypt.hash(dto.password, 10);

//       const authUser = this.authRepository.create({
//         userName: dto.userName,
//         email: dto.email,
//         password: hashedPassword,
//       });

//       await this.authRepository.save(authUser);
//       return authUser;
//     } catch (error) {
//       console.error('Registration error:', error);
//       throw new HttpException('Registration failed. Please try again.', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   async login(dto: LoginUserDto): Promise<{ logined: boolean; token: string }> {
//     try {
//       const user = await this.authRepository.findOne({ where: { email: dto.email } });
//       console.log('user', user)
//       if (!user) {
//         throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
//       }

//       const isVerifiedUser = await bcrypt.compare(dto.password, user.password);
//       if (isVerifiedUser) {
//         const token = this.jwtService.sign({ id: user.id });
//         console.log('{ logined: true, token }', { logined: true, token })
//         return { logined: true, token };
//       } else {
//         throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       throw new HttpException('Login failed. Please try again.', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }
// }

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthUser } from './auth.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

interface CreateUserDto {
  userName: string;
  email: string;
  password: string;
}

interface LoginUserDto {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthUser)
    private readonly authRepository: Repository<AuthUser>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto): Promise<AuthUser> {
    try {
      console.log('Password before hashing:', dto.password);

      // Validate input
      if (typeof dto.password !== 'string') {
        throw new HttpException(
          'Invalid password format',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Check for existing user
      const existingUser = await this.authRepository.findOne({
        where: { email: dto.email },
      });
      if (existingUser) {
        throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const authUser = this.authRepository.create({
        userName: dto.userName,
        email: dto.email,
        password: hashedPassword,
      });

      await this.authRepository.save(authUser);
      return authUser;
    } catch (error) {
      console.error('Registration error:', error);
      throw new HttpException(
        'Registration failed. Please try again.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(
    dto: LoginUserDto,
  ): Promise<{ logined: boolean; token: string; user: any }> {
    try {
      const user = await this.authRepository.findOne({
        where: { email: dto.email },
      });
      if (!user) {
        throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
      }

      const isVerifiedUser = await bcrypt.compare(dto.password, user.password);
      console.log('this.jwtService', this.jwtService);
      if (isVerifiedUser) {
        const token = await this.jwtService.sign({ user });
        console.log('token', token);
        return { logined: true, token, user };
      } else {
        throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw new HttpException(
        'Login failed. Please try again.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
