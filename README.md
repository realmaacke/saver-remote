## Docummentation for API

## Authentication (/auth)
### GET /auth/renew
```
params: None
body: None
headers: Authorization: "Bearer jwt-here"
response: { token: str|null, success: bool, message: str}
```

### POST /auth/connect
```
params: None
body: {username: string, password: string}
headers: None
response: { token: str|null, success: bool, message: str}
```

### POST /auth/create
```
params: None
body: {username: string, password: string}
headers: None
response: { token: null, success: bool, message: str}
```


## Project (/proj)
### GET /proj/:username/:project_name
```
params: username: string, project_name: string
body: None
headers: Authorization
response: None
```

### POST /proj/:username/:project_name
```
params: username: string, project_name: string
body: data: any[]|null
headers: Authorization
response {success: boolean, data: any[]|null, message:string}
```

### POST /proj/add/:username/:project_name
```
params: username: string, project_name: string
body: data: any[]|null
headers: Authorization
response {success: boolean, data: any[]|null, message:string}
```
