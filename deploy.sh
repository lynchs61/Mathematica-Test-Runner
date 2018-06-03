#!/usr/bin/env bash

./node_modules/.bin/generic-package-version --regex "^version\s+=\s+\"(\d+\.\d+\.\d+(?:-\d+)?)\";$" --replacement "version = \"__\";" mathematica-test-runner