#!/usr/bin/env bash
message=$1

npm run build

git commit -a -m "$message"