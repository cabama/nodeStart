# nodeStart
This repository for quickstart a nodejs project. The code is writed in typescript.

For the login, Passport is used and setup with GoogleAuth and Token.

#### DockerCompose
DockerCompose is used.
There are:
- Node image -> this generate a bin folder with the built files.
- MongoDB image -> mongo perssistant the data in /mongo/data folder
*If this folder not exist should be created*

```bash
docker-compose up --build
```


### Docs
- [express-validator](https://express-validator.github.io/docs/)
