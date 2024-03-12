#!/bin/bash

sudo docker login rg.fr-par.scw.cloud/djnd -u nologin -p $SCW_SECRET_TOKEN

sudo docker build -f volitvomat/Dockerfile -t volitvomat:parlamentarne-2022 ./volitvomat
sudo docker tag volitvomat:parlamentarne-2022 rg.fr-par.scw.cloud/djnd/volitvomat:parlamentarne-2022
sudo docker push rg.fr-par.scw.cloud/djnd/volitvomat:parlamentarne-2022