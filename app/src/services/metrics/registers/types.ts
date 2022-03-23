export enum MetricsIds {
  NEW_REQUEST = 'new_request',
  GET_REQUEST = 'get_request',
  PUT_REQUEST = 'put_request',
  POST_REQUEST = 'post_request',
  DELETE_REQUEST = 'delete_request',
  INTERNAL_ERROR = 'internal_error',
  COMMON_ERROR = 'common_error',
  CRITICAL_ERROR = 'critical_error',
  NOT_FOUND_ERROR = 'not_found_error',
  TOTAL_ERROR = 'total_error',
}

export enum MetricsHelp {
  NEW_REQUEST = 'return all requests until the start',
  GET_REQUEST = 'total of requests with GET method',
  PUT_REQUEST = 'total of requests with PUT method',
  POST_REQUEST = 'total of requests with POST method',
  DELETE_REQUEST = 'total of requests with DELETE method',
  INTERNAL_ERROR = 'total internal server error',
  COMMON_ERROR = 'total errors thrown by the application',
  CRITICAL_ERROR = 'total of critial errors that made the app shutdown',
  NOT_FOUND_ERROR = 'not_found_error',
  TOTAL_ERROR = 'total_error',
}
