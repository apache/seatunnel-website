import ChangeLog from '../changelog/connector-http.md';

# Http

> Http source connector

## Support Those Engines

> Spark<br/>
> Flink<br/>
> SeaTunnel Zeta<br/>

## Key Features

- [x] [batch](../../concept/connector-v2-features.md)
- [x] [stream](../../concept/connector-v2-features.md)
- [ ] [exactly-once](../../concept/connector-v2-features.md)
- [ ] [column projection](../../concept/connector-v2-features.md)
- [ ] [parallelism](../../concept/connector-v2-features.md)
- [ ] [support user-defined split](../../concept/connector-v2-features.md)

## Description

Used to read data from Http.

## Key features

- [x] [batch](../../concept/connector-v2-features.md)
- [x] [stream](../../concept/connector-v2-features.md)
- [ ] [exactly-once](../../concept/connector-v2-features.md)
- [ ] [column projection](../../concept/connector-v2-features.md)
- [ ] [parallelism](../../concept/connector-v2-features.md)
- [ ] [support user-defined split](../../concept/connector-v2-features.md)

Supported DataSource Info
-------------------------

In order to use the Http connector, the following dependencies are required.
They can be downloaded via install-plugin.sh or from the Maven central repository.

| Datasource | Supported Versions | Dependency                                                                         |
|------------|--------------------|------------------------------------------------------------------------------------|
| Http       | universal          | [Download](https://mvnrepository.com/artifact/org.apache.seatunnel/connector-http) |

## Source Options

| Name                          |  Type   | Required | Default     | Description                                                                                                                                                                       |
|-------------------------------|---------|----------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| url                           | String  | Yes      | -           | Http request url.                                                                                                                                                                 |
| schema                        | Config  | No       | -           | Http and seatunnel data structure mapping                                                                                                                                         |
| schema.fields                 | Config  | No       | -           | The schema fields of upstream data                                                                                                                                                |
| json_field                    | Config  | No       | -           | This parameter helps you configure the schema,so this parameter must be used with schema.                                                                                         |
| pageing                       | Config  | No       | -           | This parameter is used for paging queries                                                                                                                                         |
| pageing.page_field            | String  | No       | -           | This parameter is used to specify the page field name in the request. It can be used in headers, params, or body with placeholders like ${page_field}.                             |
| pageing.use_placeholder_replacement | Boolean | No | false | If true, use placeholder replacement (${field}) for headers, parameters and body values, otherwise use key-based replacement.                                                  |
| pageing.total_page_size       | Int     | No       | -           | This parameter is used to control the total number of pages                                                                                                                       |
| pageing.batch_size            | Int     | No       | -           | The batch size returned per request is used to determine whether to continue when the total number of pages is unknown                                                            |
| pageing.start_page_number     | Int     | No       | 1           | Specify the page number from which synchronization starts                                                                                                                         |
| pageing.page_type             | String  | No       | PageNumber  | this parameter is used to specify the page type ,or PageNumber if not set, only support `PageNumber` and `Cursor`.                                  |
| pageing.cursor_field          | String  | No       | -           | this parameter is used to specify the Cursor field name in the request parameter.                                                                                       |
| pageing.cursor_response_field | String  | No       | -           | This parameter specifies the field in the response from which the cursor is retrieved.                                                                                            |
| content_json                  | String  | No       | -           | This parameter can get some json data.If you only need the data in the 'book' section, configure `content_field = "$.store.book.*"`.                                              |
| format                        | String  | No       | text        | The format of upstream data, now only support `json` `text`, default `text`.                                                                                                      |
| method                        | String  | No       | get         | Http request method, only supports GET, POST method.                                                                                                                              |
| headers                       | Map     | No       | -           | Http headers.                                                                                                                                                                     |
| params                        | Map     | No       | -           | Http params.                                                                                                                                                                      |
| body                          | String  | No       | -           | Http body,the program will automatically add http header application/json,body is jsonbody.                                                                                       |
| poll_interval_millis          | Int     | No       | -           | Request http api interval(millis) in stream mode.                                                                                                                                 |
| retry                         | Int     | No       | -           | The max retry times if request http return to `IOException`.                                                                                                                      |
| retry_backoff_multiplier_ms   | Int     | No       | 100         | The retry-backoff times(millis) multiplier if request http failed.                                                                                                                |
| retry_backoff_max_ms          | Int     | No       | 10000       | The maximum retry-backoff times(millis) if request http failed                                                                                                                    |
| enable_multi_lines            | Boolean | No       | false       |                                                                                                                                                                                   |
| connect_timeout_ms            | Int     | No       | 12000       | Connection timeout setting, default 12s.                                                                                                                                          |
| socket_timeout_ms             | Int     | No       | 60000       | Socket timeout setting, default 60s.                                                                                                                                              |
| common-options                |         | No       | -           | Source plugin common parameters, please refer to [Source Common Options](../source-common-options.md) for details                                                                 |
| keep_params_as_form           |    Boolean  | No       | false       | Whether the params are submitted according to the form, used for compatibility with legacy behaviors. When true, the value of the params parameter is submitted through the form. |
| keep_page_param_as_http_param |    Boolean  | No       | false       | Whether to set the paging parameters to params. For compatibility with legacy behaviors.                                                                                          |


## How to Create a Http Data Synchronization Jobs

```hocon
env {
  parallelism = 1
  job.mode = "BATCH"
}

source {
  Http {
    plugin_output = "http"
    url = "http://mockserver:1080/example/http"
    method = "GET"
    format = "json"
    schema = {
      fields {
        c_map = "map<string, string>"
        c_array = "array<int>"
        c_string = string
        c_boolean = boolean
        c_tinyint = tinyint
        c_smallint = smallint
        c_int = int
        c_bigint = bigint
        c_float = float
        c_double = double
        c_bytes = bytes
        c_date = date
        c_decimal = "decimal(38, 18)"
        c_timestamp = timestamp
        c_row = {
          C_MAP = "map<string, string>"
          C_ARRAY = "array<int>"
          C_STRING = string
          C_BOOLEAN = boolean
          C_TINYINT = tinyint
          C_SMALLINT = smallint
          C_INT = int
          C_BIGINT = bigint
          C_FLOAT = float
          C_DOUBLE = double
          C_BYTES = bytes
          C_DATE = date
          C_DECIMAL = "decimal(38, 18)"
          C_TIMESTAMP = timestamp
        }
      }
    }
  }
}

# Console printing of the read Http data
sink {
  Console {
    parallelism = 1
  }
}
```

## Parameter Interpretation

### format

when you assign format is `json`, you should also assign schema option, for example:

upstream data is the following:

```json
{
  "code": 200,
  "data": "get success",
  "success": true
}
```

you should assign schema as the following:

```hocon

schema {
  fields {
    code = int
    data = string
    success = boolean
  }
}

```

connector will generate data as the following:

| code |    data     | success |
|------|-------------|---------|
| 200  | get success | true    |

when you assign format is `text`, connector will do nothing for upstream data, for example:

upstream data is the following:

```json
{
  "code": 200,
  "data": "get success",
  "success": true
}
```

connector will generate data as the following:

|                         content                          |
|----------------------------------------------------------|
| {"code":  200, "data":  "get success", "success":  true} |

### keep_params_as_form
For compatibility with old versions of http.
When set to true,`<params>` and `<pageing>` will be submitted in the form.
When set to false，`<params>` will be added to the url path,and `<pageing>` will not be added to the body or form. It will replace placeholders in params and body.

### keep_page_param_as_http_param
Whether to set the paging parameters to params.
When set to true,`<pageing>` is set to `<params>`.
When set to false,When the page field exists in `<body>` or `<params>`, replace value.

When set to false,config example:
```hocon
body="""{"id":1,"page":"${page}"}"""
```

```hocon
params={
 page: "${page}"
}
```

### params
By default, the parameters will be added to the url path.
If you need to keep the old version behavior, please check keep_params_as_form.

### body
The HTTP body is used to carry the actual data in requests or responses, including JSON, form submissions.

The reference format is as follows：
```hocon
body="{"id":1,"name":"setunnel"}"
```

For form submissions,please set the content-type as follows.
```hocon
headers {
    Content-Type = "application/x-www-form-urlencoded"
}
```

### content_json

This parameter can get some json data.If you only need the data in the 'book' section, configure `content_field = "$.store.book.*"`.

If your return data looks something like this.

```json
{
  "store": {
    "book": [
      {
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      },
      {
        "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95
    }
  },
  "expensive": 10
}
```

You can configure `content_field = "$.store.book.*"` and the result returned looks like this:

```json
[
  {
    "category": "reference",
    "author": "Nigel Rees",
    "title": "Sayings of the Century",
    "price": 8.95
  },
  {
    "category": "fiction",
    "author": "Evelyn Waugh",
    "title": "Sword of Honour",
    "price": 12.99
  }
]
```

Then you can get the desired result with a simpler schema,like

```hocon
Http {
  url = "http://mockserver:1080/contentjson/mock"
  method = "GET"
  format = "json"
  content_field = "$.store.book.*"
  schema = {
    fields {
      category = string
      author = string
      title = string
      price = string
    }
  }
}
```

Here is an example:

- Test data can be found at this link [mockserver-config.json](../../../../seatunnel-e2e/seatunnel-connector-v2-e2e/connector-http-e2e/src/test/resources/mockserver-config.json)
- See this link for task configuration [http_contentjson_to_assert.conf](../../../../seatunnel-e2e/seatunnel-connector-v2-e2e/connector-http-e2e/src/test/resources/http_contentjson_to_assert.conf).

### json_field

This parameter helps you configure the schema,so this parameter must be used with schema.

If your data looks something like this:

```json
{
  "store": {
    "book": [
      {
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      },
      {
        "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95
    }
  },
  "expensive": 10
}
```

You can get the contents of 'book' by configuring the task as follows:

```hocon
source {
  Http {
    url = "http://mockserver:1080/jsonpath/mock"
    method = "GET"
    format = "json"
    json_field = {
      category = "$.store.book[*].category"
      author = "$.store.book[*].author"
      title = "$.store.book[*].title"
      price = "$.store.book[*].price"
    }
    schema = {
      fields {
        category = string
        author = string
        title = string
        price = string
      }
    }
  }
}
```

- Test data can be found at this link [mockserver-config.json](../../../../seatunnel-e2e/seatunnel-connector-v2-e2e/connector-http-e2e/src/test/resources/mockserver-config.json)
- See this link for task configuration [http_jsonpath_to_assert.conf](../../../../seatunnel-e2e/seatunnel-connector-v2-e2e/connector-http-e2e/src/test/resources/http_jsonpath_to_assert.conf).

### pageing
The current supported pagination type are `PageNumber` and `Cursor`.
if you need to use pagination, you need to configure `pageing`. the default pagination type is `PageNumber`.


#### 1. PageNumber
When using `PageNumber` pagination, you can include page parameters in different parts of your HTTP request:

- **In URL parameters**: Add the page parameter to the `params` section
- **In request body**: Include the page parameter in the `body` JSON
- **In headers**: Add the page parameter to the `headers` section

You can use placeholders like `${page}` with `use_placeholder_replacement = true` to dynamically update these values. The placeholders can be used in various formats:

- As a standalone value: `"${page}"`
- With prefix/suffix: `"10${page}"` or `"page-${page}"`
- As a number without quotes: `${page}` (in JSON body)
- In nested JSON structures: `{"pagination":{"page":${page}}}`

##### Example 1: Using page parameters in body and params

```hocon
source {
    Http {
      url = "http://localhost:8080/mock/queryData"
      method = "POST"
      format = "json"
      body="""{"id":1,"page":"${page}"}"""
      content_field = "$.data.*"
      params={
       page: "${page}"
      }
      pageing={
       #you can not set this parameter ,the default value is PageNumber
       page_type="PageNumber"
       total_page_size=20
       page_field=page
       use_placeholder_replacement=true
       #when don't know the total_page_size use batch_size if read size<batch_size finish ,otherwise continue
       #batch_size=10
      }
      schema = {
        fields {
          name = string
          age = string
        }
      }
    }
}
```

##### Example 2: Using page parameters in headers

```hocon
source {
    Http {
      url = "http://localhost:8080/mock/queryData"
      method = "GET"
      format = "json"
      headers={
        Page-Number = "${pageNo}"
        Authorization = "Bearer token-123"
      }
      pageing={
        page_field = pageNo
        start_page_number = 1
        batch_size = 10
        use_placeholder_replacement = true
      }
      schema = {
        fields {
          name = string
          age = string
        }
      }
    }
}
```

##### Example 3: Using key-based replacement (without placeholders)

```hocon
source {
    Http {
      url = "http://localhost:8080/mock/queryData"
      method = "GET"
      format = "json"
      params={
        page = "1"
      }
      pageing={
        page_field = page
        start_page_number = 1
        batch_size = 10
        use_placeholder_replacement = false
      }
      schema = {
        fields {
          name = string
          age = string
        }
      }
    }
}
```

##### Example 4: Using prefixed page number in headers

```hocon
source {
    Http {
      url = "http://localhost:8080/mock/queryData"
      method = "GET"
      format = "json"
      headers = {
        Page-Number = "10${page}"  # Will become "105" when page=5
        Authorization = "Bearer token-123"
      }
      pageing = {
        page_field = page
        start_page_number = 5
        batch_size = 10
        use_placeholder_replacement = true
      }
      schema = {
        fields {
          name = string
          age = string
        }
      }
    }
}
```

##### Example 5: Using unquoted page number in body

```hocon
source {
    Http {
      url = "http://localhost:8080/mock/queryData"
      method = "POST"
      format = "json"
      body = """{"a":${page},"limit":10}"""  # Unquoted number
      pageing = {
        page_field = page
        start_page_number = 1
        batch_size = 10
        use_placeholder_replacement = true
      }
      schema = {
        fields {
          name = string
          age = string
        }
      }
    }
}
```

##### Example 6: Using nested JSON structure with page parameter

```hocon
source {
    Http {
      url = "http://localhost:8080/mock/queryData"
      method = "POST"
      format = "json"
      body = """{"pagination":{"page":${page},"size":10},"filters":{"active":true}}"""  # Nested structure
      pageing = {
        page_field = page
        start_page_number = 1
        total_page_size = 20
        use_placeholder_replacement = true
      }
      schema = {
        fields {
          name = string
          age = string
        }
      }
    }
}
```

#### 2. Cursor
the `pageing.page_type` parameter must be set to `Cursor`.
`cursor_field` is the field name of the cursor in the request parameters.
`cursor_response_field` is the field name denotes the name of the pagination token field in the response data, we should add this to add pageing fields into request.
````hocon

source {
    Http {
      plugin_output = "http"
      url = "http://localhost:8080/mock/cursor_data"
      method = "GET"
      format = "json"
      content_field = "$.data.*"
      keep_page_param_as_http_param = true
      pageing ={
        page_type="Cursor"
        cursor_field ="cursor"
        cursor_response_field="$.paging.cursors.next"
      }
    schema = {
      fields {
        content=string
        id=int
        name=string
      }
    }
   json_field = {
    content = "$.data[*].content"
    id = "$.data[*].id"
    name = "$.data[*].name"
   }
  }
}

```

## Changelog

<ChangeLog />
