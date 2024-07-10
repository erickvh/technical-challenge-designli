import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { catchError, lastValueFrom, map } from 'rxjs';

@Injectable()
export class CustomHttpService {
  private logger = new Logger(CustomHttpService.name);

  constructor(private readonly httpService: HttpService) {}

  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return lastValueFrom(
      this.httpService
        .get(url, config)
        .pipe(map((response) => response.data))
        .pipe(
          catchError((e) => {
            this.logger.error(e);
            if (axios.isAxiosError(e)) {
              throw new HttpException(e.response.data, e.response.status);
            }
            throw new InternalServerErrorException(e.message);
          }),
        ),
    );
  }
}
