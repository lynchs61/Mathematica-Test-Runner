#!/usr/bin/env bash

./node_modules/.bin/generic-package-version --regex "^version\s+=\s+\"(\d+\.\d+\.\d+(?:-\d+)?)\";$" --replacement "version = \"__\";" mathematica-test-runner

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

GIT_BRANCH=$(git symbolic-ref --short -q HEAD)

./node_modules/.bin/es-soft create -s mathematica-test-runner -v ${PACKAGE_VERSION} -t mathematicaclitool

git checkout github_deploy
git checkout ${GIT_BRANCH} mathematica-test-runner README.md test
git status