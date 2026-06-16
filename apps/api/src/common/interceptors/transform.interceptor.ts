import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  StreamableFile,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface StandardResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, StandardResponse<T> | StreamableFile> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<StandardResponse<T> | StreamableFile> {

    return next.handle().pipe(
      map((data) => {
        const statusCode = context.switchToHttp().getResponse().statusCode;
        // Bypass wrapping for binary/stream responses (e.g. PDF download)
        if (data instanceof StreamableFile) return data;

        // If the return object contains both data and meta, keep it intact to preserve pagination
        const isPaginated = data && typeof data === 'object' && 'data' in data && 'meta' in data;

        return {
          statusCode,
          message: data?.message ?? 'Success',
          data: isPaginated ? data : (data?.data !== undefined ? data.data : data),
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}