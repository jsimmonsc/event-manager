#!/bin/bash

rm -rf /tmp/mongodump && mkdir /tmp/mongodump && echo "/tmp/mongodump recreated"
find /srv/event-manager-prod/volumes/backups -type f -mtime +14 -delete

docker run --rm --network=eventmanagerprod_default --link mongo \
    -v /tmp/mongodump:/tmp \
    -v /srv/event-manager-prod/volumes/backups:/backups \
    mongo bash -c \
       'mongodump -v --host mongo:27017 --db "event-manager" --collection "events" --out=/tmp && \
        mongodump -v --host mongo:27017 --db "event-manager" --collection "users" --out=/tmp && \
        BACKUP_NAME=backup.$(date "+%y_%m_%d_%H_%M").tar.gz && \
        tar zcvf "/backups/$BACKUP_NAME" /tmp'
