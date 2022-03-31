# TODO

- ip, limite de req atingido
- tempo das requests (req/res?)
- tamanho das requests (req/res)
- percentual das requests mais usadas
- percentual dos erros mais lançados
- rotas mais comuns que retornam 404
- rotas mais comuns que retornam erro 500
- rotas mais comuns que retornam 400
- rotas mais chamadas
- guardar horarios req/res

## Example

### Notation

Given a metric name and a set of labels, time series are frequently identified using this notation:

\<metric name>{\<label name>=\<label value>, \<label name>=\<label value>, ...}

For example, a time series with the metric name api_http_requests_total and the labels method="POST" and handler="/messages" could be written like this:

> api_http_requests_total{method="POST", handler="/messages"}
