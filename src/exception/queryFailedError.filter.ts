import { Catch } from '@nestjs/common';
import { GqlExceptionFilter, GqlExecutionContext } from '@nestjs/graphql';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryFailedErrorFilter implements GqlExceptionFilter {
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
