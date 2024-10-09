// import {
//   BadRequestException,
//   Injectable,
//     NestMiddleware,
//     UnauthorizedException
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';

// import { Request, Response, NextFunction } from 'express';

// @Injectable()
// // export class LoggerMiddleware implements NestMiddleware {
// //     use(req: Request, res: Response, next: NextFunction) {
// //         // Log the incoming request
// //         console.log('Request:', {
// //             method: req.method,
// //             url: req.url,
// //             headers: req.headers,
// //             body: req.body,
// //         });

// //         // Check if the api-key is present and valid
// //         const apiKey = req.headers['Authorization'];
// //         console.log('apikey::::::::',apiKey)
// //         if (apiKey !== 'api-key1') {
// //             throw new BadRequestException('Invalid API key'); // Throw an exception if the key is not valid
// //         }

// //         next(); // Proceed to the next middleware or route handler if the key is valid
// //     }
// // }

// // import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
// // import { Request, Response, NextFunction } from 'express';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     // Log the incoming request
//     console.log('Request::::::::::::', res);

//     // Check if the Authorization header is present and valid
//     // const authorizationHeader = req.headers['authorization'];
//     // console.log('Authorization Header:', authorizationHeader);

//     // // Validate the presence of the Authorization header
//     // if (!authorizationHeader) {
//     //   throw new BadRequestException('Authorization header is missing');
//     // }

//     // // Extract the API key from the Bearer token
//     // const apiKey = authorizationHeader.split(' ')[1]; // Extract the key after "Bearer "
//     // console.log('API Key:', apiKey);

//     // // Check if the API key matches the expected value
//     // if (apiKey !== 'api-key1') {
//       //   throw new BadRequestException('Invalid API key'); // Throw an exception if the key is not valid

//       // }

//       const authHeader = req.headers.authorization;

//       if (!authHeader || !authHeader.startsWith('Bearer ')) {
//           throw new UnauthorizedException('Authorization header is missing or invalid');
//       }

//       const token = authHeader.split(' ')[1];

//       try {
//           const decoded = jwt.verify(token, 'your-secret-key'); // Verify token with your secret key
//           console.log('Decoded Token:', decoded);
//           req['user'] = decoded; // Store the decoded user information in the request
//           next();
//       } catch (error) {
//           throw new UnauthorizedException('Invalid or expired token');
//       }

//  // Proceed to the next middleware or route handler if the key is valid
//   }
// }

import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Log the incoming request
    console.log('Incoming Request:', {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
    });

    // next();

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authorization header is missing or invalid',
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(token);
      console.log('Decoded Token:', decoded);
      req['user'] = decoded;

      next();
    } catch (error) {
      console.error('Token verification error:', error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
