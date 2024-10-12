# Embedding

> Embedding Transform Plugin

## Description

The `Embedding` transform plugin leverages embedding models to convert text data into vectorized representations. This
transformation can be applied to various fields. The plugin supports multiple model providers and can be integrated with
different API endpoints.

## Options

| Name                           | Type   | Required | Default Value | Description                                                                                                 |
|--------------------------------|--------|----------|---------------|-------------------------------------------------------------------------------------------------------------|
| model_provider                 | enum   | yes      | -             | The model provider for embedding. Options may include `QIANFAN`, `OPENAI`, etc.                             |
| api_key                        | string | yes      | -             | The API key required to authenticate with the embedding service.                                            |
| secret_key                     | string | yes      | -             | The secret key required for additional authentication with the embedding service.                           |
| single_vectorized_input_number | int    | no       | 1             | The number of inputs vectorized in one request. Default is 1.                                               |
| vectorization_fields           | map    | yes      | -             | A mapping between input fields and their corresponding output vector fields.                                |
| model                          | string | yes      | -             | The specific model to use for embedding (e.g: `text-embedding-3-small` for OPENAI).                         |
| api_path                       | string | no       | -             | The API endpoint for the embedding service. Typically provided by the model provider.                       |
| oauth_path                     | string | no       | -             | The API endpoint for the oauth service.                                                                     |
| custom_config                  | map    | no       |               | Custom configurations for the model.                                                                        |
| custom_response_parse          | string | no       |               | Specifies how to parse the response from the model using JsonPath. Example: `$.choices[*].message.content`. |
| custom_request_headers         | map    | no       |               | Custom headers for the request to the model.                                                                |
| custom_request_body            | map    | no       |               | Custom body for the request. Supports placeholders like `${model}`, `${input}`.                             |

### model_provider

The providers for generating embeddings include common options such as `DOUBAO`, `QIANFAN`, and `OPENAI`. Additionally,
you can choose `CUSTOM` to implement requests and retrievals for custom embedding models.

### api_key

The API key for authenticating requests to the embedding service. This is typically provided by the model provider when
you register for their service.

### secret_key

The secret key used for additional authentication. Some providers may require this for secure API requests.

### single_vectorized_input_number

Specifies how many inputs are processed in a single vectorization request. The default is 1. Adjust based on your
processing
capacity and the model provider's API limitations.

### vectorization_fields

A mapping between input fields and their respective output vector fields. This allows the plugin to understand which
text fields to vectorize and how to store the resulting vectors.

```hocon
vectorization_fields {
    book_intro_vector = book_intro
    author_biography_vector  = author_biography
}
```

### model

The specific embedding model to use. This depends on the `embedding_model_provider`. For example, if using OPENAI, you
might specify `text-embedding-3-small`.

### api_path

The API endpoint to use for making requests to the embedding service. This might vary based on the provider and model
used. Generally, this is provided by the model provider.

### oauth_path

The API endpoint for the oauth service. Get certification information. This might vary based on the provider and model
used. Generally, this is provided by the model provider.

### custom_config

The `custom_config` option allows you to provide additional custom configurations for the model. This is a map where you
can define various settings that might be required by the specific model you're using.

### custom_response_parse

The `custom_response_parse` option allows you to specify how to parse the model's response. You can use JsonPath to
extract the specific data you need from the response. For example, by using `$.data[*].embedding`, you can extract
the `embedding` field values from the following JSON and obtain a `List` of nested `List` results. For more details on
using JsonPath, please refer to
the [JsonPath Getting Started guide](https://github.com/json-path/JsonPath?tab=readme-ov-file#getting-started).

```json
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "index": 0,
      "embedding": [
        -0.006929283495992422,
        -0.005336422007530928,
        -0.00004547132266452536,
        -0.024047505110502243
      ]
    }
  ],
  "model": "text-embedding-3-small",
  "usage": {
    "prompt_tokens": 5,
    "total_tokens": 5
  }
}
```

### custom_request_headers

The `custom_request_headers` option allows you to define custom headers that should be included in the request sent to
the model's API. This is useful if the API requires additional headers beyond the standard ones, such as authorization
tokens, content types, etc.

### custom_request_body

The `custom_request_body` option supports placeholders:

- `${model}`: Placeholder for the model name.
- `${input}`: Placeholder to determine input value and define request body request type based on the type of body
  value. Example: `["${input}"]` -> ["input"] (list)

### common options

Transform plugin common parameters, please refer to [Transform Plugin](common-options.md) for details.

## Example Configuration

```hocon
env {
  job.mode = "BATCH"
}

source {
  FakeSource {
    row.num = 5
    schema = {
      fields {
        book_id = "int"
        book_name = "string"
        book_intro = "string"
        author_biography = "string"
      }
    }
    rows = [
      {fields = [1, "To Kill a Mockingbird",
      "Set in the American South during the 1930s, To Kill a Mockingbird tells the story of young Scout Finch and her brother, Jem, who are growing up in a world of racial inequality and injustice. Their father, Atticus Finch, is a lawyer who defends a black man falsely accused of raping a white woman, teaching his children valuable lessons about morality, courage, and empathy.",
      "Harper Lee (1926–2016) was an American novelist best known for To Kill a Mockingbird, which won the Pulitzer Prize in 1961. Lee was born in Monroeville, Alabama, and the town served as inspiration for the fictional Maycomb in her novel. Despite the success of her book, Lee remained a private person and published only one other novel, Go Set a Watchman, which was written before To Kill a Mockingbird but released in 2015 as a sequel."
      ], kind = INSERT}
      {fields = [2, "1984",
      "1984 is a dystopian novel set in a totalitarian society governed by Big Brother. The story follows Winston Smith, a man who works for the Party rewriting history. Winston begins to question the Party’s control and seeks truth and freedom in a society where individuality is crushed. The novel explores themes of surveillance, propaganda, and the loss of personal autonomy.",
      "George Orwell (1903–1950) was the pen name of Eric Arthur Blair, an English novelist, essayist, journalist, and critic. Orwell is best known for his works 1984 and Animal Farm, both of which are critiques of totalitarian regimes. His writing is characterized by lucid prose, awareness of social injustice, opposition to totalitarianism, and support of democratic socialism. Orwell’s work remains influential, and his ideas have shaped contemporary discussions on politics and society."
      ], kind = INSERT}
      {fields = [3, "Pride and Prejudice",
      "Pride and Prejudice is a romantic novel that explores the complex relationships between different social classes in early 19th century England. The story centers on Elizabeth Bennet, a young woman with strong opinions, and Mr. Darcy, a wealthy but reserved gentleman. The novel deals with themes of love, marriage, and societal expectations, offering keen insights into human behavior.",
      "Jane Austen (1775–1817) was an English novelist known for her sharp social commentary and keen observations of the British landed gentry. Her works, including Sense and Sensibility, Emma, and Pride and Prejudice, are celebrated for their wit, realism, and biting critique of the social class structure of her time. Despite her relatively modest life, Austen’s novels have gained immense popularity, and she is considered one of the greatest novelists in the English language."
      ], kind = INSERT}
      {fields = [4, "The Great GatsbyThe Great Gatsby",
      "The Great Gatsby is a novel about the American Dream and the disillusionment that can come with it. Set in the 1920s, the story follows Nick Carraway as he becomes entangled in the lives of his mysterious neighbor, Jay Gatsby, and the wealthy elite of Long Island. Gatsby's obsession with the beautiful Daisy Buchanan drives the narrative, exploring themes of wealth, love, and the decay of the American Dream.",
      "F. Scott Fitzgerald (1896–1940) was an American novelist and short story writer, widely regarded as one of the greatest American writers of the 20th century. Born in St. Paul, Minnesota, Fitzgerald is best known for his novel The Great Gatsby, which is often considered the quintessential work of the Jazz Age. His works often explore themes of youth, wealth, and the American Dream, reflecting the turbulence and excesses of the 1920s."
      ], kind = INSERT}
      {fields = [5, "Moby-Dick",
      "Moby-Dick is an epic tale of obsession and revenge. The novel follows the journey of Captain Ahab, who is on a relentless quest to kill the white whale, Moby Dick, that once maimed him. Narrated by Ishmael, a sailor aboard Ahab’s ship, the story delves into themes of fate, humanity, and the struggle between man and nature. The novel is also rich with symbolism and philosophical musings.",
      "Herman Melville (1819–1891) was an American novelist, short story writer, and poet of the American Renaissance period. Born in New York City, Melville gained initial fame with novels such as Typee and Omoo, but it was Moby-Dick, published in 1851, that would later be recognized as his masterpiece. Melville’s work is known for its complexity, symbolism, and exploration of themes such as man’s place in the universe, the nature of evil, and the quest for meaning. Despite facing financial difficulties and critical neglect during his lifetime, Melville’s reputation soared posthumously, and he is now considered one of the great American authors."
      ], kind = INSERT}
    ]
    result_table_name = "fake"
  }
}

transform {
  Embedding {
    source_table_name = "fake"
    embedding_model_provider = QIANFAN
    model = bge_large_en
    api_key = xxxxxxxxxx
    secret_key = xxxxxxxxxx
    api_path = xxxxxxxxxx
    vectorization_fields {
        book_intro_vector = book_intro
        author_biography_vector  = author_biography
    }
    result_table_name = "embedding_output"
  }
}

sink {
  Assert {
      source_table_name = "embedding_output"
      rules =
        {
          field_rules = [
            {
              field_name = book_id
              field_type = int
              field_value = [
                {
                  rule_type = NOT_NULL
                }
              ]
            },
            {
              field_name = book_name
              field_type = string
              field_value = [
                {
                  rule_type = NOT_NULL
                }
              ]
            },
            {
              field_name = book_intro
              field_type = string
              field_value = [
                {
                  rule_type = NOT_NULL
                }
              ]
            },
            {
              field_name = author_biography
              field_type = string
              field_value = [
                {
                  rule_type = NOT_NULL
                }
              ]
            },
            {
              field_name = book_intro_vector
              field_type = float_vector
              field_value = [
                {
                  rule_type = NOT_NULL
                }
              ]
            },
            {
              field_name = author_biography_vector
              field_type = float_vector
              field_value = [
                {
                  rule_type = NOT_NULL
                }
              ]
            }
          ]
        }
    }
}
```

### Customize the embedding model

```hocon

env {
  job.mode = "BATCH"
}

source {
  FakeSource {
    row.num = 5
    schema = {
      fields {
        book_id = "int"
        book_name = "string"
        book_intro = "string"
        author_biography = "string"
      }
    }
    rows = [
      {fields = [1, "To Kill a Mockingbird",
      "Set in the American South during the 1930s, To Kill a Mockingbird tells the story of young Scout Finch and her brother, Jem, who are growing up in a world of racial inequality and injustice. Their father, Atticus Finch, is a lawyer who defends a black man falsely accused of raping a white woman, teaching his children valuable lessons about morality, courage, and empathy.",
      "Harper Lee (1926–2016) was an American novelist best known for To Kill a Mockingbird, which won the Pulitzer Prize in 1961. Lee was born in Monroeville, Alabama, and the town served as inspiration for the fictional Maycomb in her novel. Despite the success of her book, Lee remained a private person and published only one other novel, Go Set a Watchman, which was written before To Kill a Mockingbird but released in 2015 as a sequel."
      ], kind = INSERT}
      {fields = [2, "1984",
      "1984 is a dystopian novel set in a totalitarian society governed by Big Brother. The story follows Winston Smith, a man who works for the Party rewriting history. Winston begins to question the Party’s control and seeks truth and freedom in a society where individuality is crushed. The novel explores themes of surveillance, propaganda, and the loss of personal autonomy.",
      "George Orwell (1903–1950) was the pen name of Eric Arthur Blair, an English novelist, essayist, journalist, and critic. Orwell is best known for his works 1984 and Animal Farm, both of which are critiques of totalitarian regimes. His writing is characterized by lucid prose, awareness of social injustice, opposition to totalitarianism, and support of democratic socialism. Orwell’s work remains influential, and his ideas have shaped contemporary discussions on politics and society."
      ], kind = INSERT}
      {fields = [3, "Pride and Prejudice",
      "Pride and Prejudice is a romantic novel that explores the complex relationships between different social classes in early 19th century England. The story centers on Elizabeth Bennet, a young woman with strong opinions, and Mr. Darcy, a wealthy but reserved gentleman. The novel deals with themes of love, marriage, and societal expectations, offering keen insights into human behavior.",
      "Jane Austen (1775–1817) was an English novelist known for her sharp social commentary and keen observations of the British landed gentry. Her works, including Sense and Sensibility, Emma, and Pride and Prejudice, are celebrated for their wit, realism, and biting critique of the social class structure of her time. Despite her relatively modest life, Austen’s novels have gained immense popularity, and she is considered one of the greatest novelists in the English language."
      ], kind = INSERT}
      {fields = [4, "The Great GatsbyThe Great Gatsby",
      "The Great Gatsby is a novel about the American Dream and the disillusionment that can come with it. Set in the 1920s, the story follows Nick Carraway as he becomes entangled in the lives of his mysterious neighbor, Jay Gatsby, and the wealthy elite of Long Island. Gatsby's obsession with the beautiful Daisy Buchanan drives the narrative, exploring themes of wealth, love, and the decay of the American Dream.",
      "F. Scott Fitzgerald (1896–1940) was an American novelist and short story writer, widely regarded as one of the greatest American writers of the 20th century. Born in St. Paul, Minnesota, Fitzgerald is best known for his novel The Great Gatsby, which is often considered the quintessential work of the Jazz Age. His works often explore themes of youth, wealth, and the American Dream, reflecting the turbulence and excesses of the 1920s."
      ], kind = INSERT}
      {fields = [5, "Moby-Dick",
      "Moby-Dick is an epic tale of obsession and revenge. The novel follows the journey of Captain Ahab, who is on a relentless quest to kill the white whale, Moby Dick, that once maimed him. Narrated by Ishmael, a sailor aboard Ahab’s ship, the story delves into themes of fate, humanity, and the struggle between man and nature. The novel is also rich with symbolism and philosophical musings.",
      "Herman Melville (1819–1891) was an American novelist, short story writer, and poet of the American Renaissance period. Born in New York City, Melville gained initial fame with novels such as Typee and Omoo, but it was Moby-Dick, published in 1851, that would later be recognized as his masterpiece. Melville’s work is known for its complexity, symbolism, and exploration of themes such as man’s place in the universe, the nature of evil, and the quest for meaning. Despite facing financial difficulties and critical neglect during his lifetime, Melville’s reputation soared posthumously, and he is now considered one of the great American authors."
      ], kind = INSERT}
    ]
    result_table_name = "fake"
  }
}

transform {
 Embedding {
    source_table_name = "fake"
    model_provider = CUSTOM
    model = text-embedding-3-small
    api_key = xxxxxxxx
    api_path = "http://mockserver:1080/v1/doubao/embedding"
    single_vectorized_input_number = 2
    vectorization_fields {
        book_intro_vector = book_intro
        author_biography_vector  = author_biography
    }
    custom_config={
        custom_response_parse = "$.data[*].embedding"
        custom_request_headers = {
            "Content-Type"= "application/json"
            "Authorization"= "Bearer xxxxxxx
        }
        custom_request_body ={
            modelx = "${model}"
            inputx = ["${input}"]
        }
    }
    result_table_name = "embedding_output_1"
  }
}

sink {
  Assert {
      source_table_name = "embedding_output_1"
      rules =
        {
          field_rules = [
            {
              field_name = book_id
              field_type = int
              field_value = [
                {
                  rule_type = NOT_NULL
                }
              ]
            },
            {
              field_name = book_name
              field_type = string
              field_value = [
                {
                  rule_type = NOT_NULL
                }
              ]
            },
            {
              field_name = book_intro
              field_type = string
              field_value = [
                {
                  rule_type = NOT_NULL
                }
              ]
            },
            {
              field_name = author_biography
              field_type = string
              field_value = [
                {
                  rule_type = NOT_NULL
                }
              ]
            },
            {
              field_name = book_intro_vector
              field_type = float_vector
              field_value = [
                {
                  rule_type = NOT_NULL
                }
              ]
            },
            {
              field_name = author_biography_vector
              field_type = float_vector
              field_value = [
                {
                  rule_type = NOT_NULL
                }
              ]
            }
          ]
        }
    }
}

```
