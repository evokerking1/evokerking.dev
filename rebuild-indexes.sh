#!/usr/bin/env bash

set -e

echo "Rebuilding game indexes..."

node build-index.js games

echo "Successfully rebuilt game indexes."

echo "Rebuilding asset indexes..."

node build-index.js assets

echo "Successfully rebuilt assets indexes."

echo "Rebuilding JSON schema indexes..."

node build-index.js json_schemas

echo "Successfully rebuilt JSON schema indexes."
