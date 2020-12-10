import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotFoundError, ConflictError } from 'shared/exceptions';

@Injectable()
export class ExceptionsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof NotFoundError) {
          throw new NotFoundException(error.message);
        } else if (error instanceof ConflictError) {
          throw new ConflictException(error.message);
        } else {
          throw new InternalServerErrorException(error.message);
        }
      }),
    );
  }
}
