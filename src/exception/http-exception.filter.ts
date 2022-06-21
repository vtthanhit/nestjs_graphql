import { Catch, HttpException } from '@nestjs/common';
import { GqlExceptionFilter, GqlExecutionContext } from '@nestjs/graphql';

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: any, context: GqlExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const { res, req } = gqlContext;
    const status = exception.getStatus();
    res.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
