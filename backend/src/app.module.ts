import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TodosModule } from './todos/todos.module';

import { NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';

// @Module({
//   imports: [
//     ConfigModule.forRoot(),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule,
//         JwtModule.register({
//           secret: 'hardcoded-secret-key',
//           signOptions: { expiresIn: '1d' },
//         }),
//       ],
//       useFactory: (configService: ConfigService) => ({
//         type: 'mysql',
//         host: 'localhost',
//         port: 3306,
//         username: configService.get('DB_USERNAME'), // Use environment variable
//         password: configService.get('DB_PASSWORD'), // Use environment variable
//         database: 'mydb',
//         entities: [__dirname + '/**/*.entity{.ts,.js}'], // Register the Todo entity here
//         synchronize: true, // Auto-create database schema
//       }),
//       inject: [ConfigService],
//     }),
//     AuthModule,
//     TodosModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule } from '@nestjs/config';
// import { ConfigService } from '@nestjs/config';
// import { AuthModule } from './auth/auth.module';
// import { AppService } from './app.service';
// import { AppController } from './app.controller';
// import { TodosModule } from './todos/todos.module';
// import { JwtModule } from '@nestjs/jwt';

// @Module({
//   imports: [
//     ConfigModule.forRoot(),
//     JwtModule.register({
//       secret: 'hardcoded-secret-key',
//       signOptions: { expiresIn: '1d' },
//     }),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule], // Only ConfigModule is needed here
//       useFactory: (configService: ConfigService) => ({
//         type: 'mysql',
//         host: 'localhost',
//         port: 3306,
//         username: configService.get('DB_USERNAME'), // Get DB username from environment variables
//         password: configService.get('DB_PASSWORD'), // Get DB password from environment variables
//         database: 'mydb', // Hard-coded database name
//         entities: [__dirname + '/**/*.entity{.ts,.js}'], // Auto-register all entities
//         synchronize: true, // Synchronize the database schema automatically
//       }),
//       inject: [ConfigService],
//     }),
//     AuthModule,
//     TodosModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule } from '@nestjs/config';
// import { AuthModule } from './auth/auth.module';
// import { AppService } from './app.service';
// import { AppController } from './app.controller';
// import { TodosModule } from './todos/todos.module';
// import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: configService.get('DB_USERNAME'), // Get DB username from environment variables
        password: configService.get('DB_PASSWORD'), // Get DB password from environment variables
        database: 'mydb', // Hard-coded database name
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // Auto-register all entities
        synchronize: true, // Synchronize the database schema automatically
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/register', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
