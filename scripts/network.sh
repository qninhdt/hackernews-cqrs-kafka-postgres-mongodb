#!/bin/bash

networks=("api-net" "message-broker-net" "query-db-net")

for net in "${networks[@]}"; do
  # Check if the network exists using docker network ls
  if ! docker network ls --filter name="^${net}$" --format "{{.Name}}" | grep -w "${net}" > /dev/null; then
    echo "Creating network: ${net}"
    docker network create "${net}"
  else
    echo "Network ${net} already exists."
  fi
done
