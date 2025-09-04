import { UserService } from '@/modules/user/user.service';
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LastSeenInterceptor implements NestInterceptor {
    public constructor(private readonly userService: UserService) {}

    public intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<void> {
        return next.handle().pipe(
            tap(async () => {
                const http = context.switchToHttp();
                const sub = http.getRequest().user?.sub;

                await this.userService.update(sub, {
                    lastSeenAt: new Date().toISOString(),
                });
            }),
        );
    }
}
