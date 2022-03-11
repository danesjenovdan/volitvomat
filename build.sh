#!/bin/bash

sudo docker login rg.fr-par.scw.cloud/djnd -u nologin -p $SCW_SECRET_TOKEN

sudo docker build -f volitvomat/Dockerfile -t volitvomat:latest ./volitvomat
sudo docker tag volitvomat:latest rg.fr-par.scw.cloud/djnd/volitvomat:latest
sudo docker push rg.fr-par.scw.cloud/djnd/volitvomat:latest