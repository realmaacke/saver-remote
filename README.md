## Docummentation for API

## Authentication (/auth)
### /auth/renew
```
params: None
body: None
headers: Authorization: "Bearer jwt-here"
response: Renewed JWT
```

### /auth/connect
```
params: None
body: {username: string, password: string}
headers: None
response: Newly created token
```


## Project (/proj)


