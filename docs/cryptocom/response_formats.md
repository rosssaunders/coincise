## Response Format

| Name     | Type   | Description                                              |
| -------- | ------ | -------------------------------------------------------- |
| id       | long   | Original request identifier                              |
| method   | string | Method invoked                                           |
| result   | object | Result object                                            |
| code     | int    | 0 for success, see below for full list                   |
| message  | string | (optional) For server or error messages                  |
| original | string | (optional) Original request as a string, for error cases |
