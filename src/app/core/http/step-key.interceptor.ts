import { HttpInterceptorFn } from '@angular/common/http';
import { API_BASE_URL, STEP_API_KEY } from '../config/api.config';

export const stepKeyInterceptor: HttpInterceptorFn = (request, next) => {
  if (!request.url.startsWith(API_BASE_URL)) return next(request);
  return next(request.clone({ setHeaders: { 'X-STEP-KEY': STEP_API_KEY } }));
};
