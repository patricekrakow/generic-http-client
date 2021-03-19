```text
$ cd ~/environment/generic-http-client/
$ docker --version
Docker version 19.03.12, build 48a66213fe
$ docker build --tag patrice1972/generic-http-client:0.1.0 .
...
Successfully built b6f6a5e8e491
Successfully tagged patrice1972/generic-http-client:0.1.0
$ docker images
REPOSITORY                                        TAG                 IMAGE ID            CREATED             SIZE
patrice1972/generic-http-client                   0.1.0               b6f6a5e8e491        15 seconds ago      167MB
...
$ docker run --network="host" patrice1972/generic-http-client:0.1.0
...
$ docker login
...
Login Succeeded
$ docker push patrice1972/generic-http-client:0.1.0
...
0.1.0: digest: sha256:91f0e130a58889e57777178e79b37096b8be2cca6bf185e35291f254fb365aa5 size: 2197
```
