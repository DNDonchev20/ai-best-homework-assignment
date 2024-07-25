import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { apiKey, isKeyRequired } from 'src/constants';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly logger = new Logger(ApiKeyGuard.name);

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    
    const isApiKeyRequiredFlag = isKeyRequired == 'true';
    console.log('isApiKeyRequiredFlag', isApiKeyRequiredFlag);

    if (!isApiKeyRequiredFlag) {
      const receivedApiKey = request.headers['api-key'];

      if (!receivedApiKey) {
        throw new UnauthorizedException('API key is missing');
      }

      if (receivedApiKey !== apiKey) {
        this.logger.warn('Invalid API key');
        throw new UnauthorizedException('Invalid API key');
      }
    }

    return true;
  }
}