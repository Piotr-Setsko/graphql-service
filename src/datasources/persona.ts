import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';

export class PersonalizationAPI extends RESTDataSource {
  willSendRequest(request: RequestOptions) {
    console.log(this.context.token);
    request.headers.set('Authorization', this.context.token);
  }
}