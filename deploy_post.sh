#!/usr/bin/env bash

GIT_BRANCH=$(git symbolic-ref --short -q HEAD)

# Get all the commits into one, well described commit for pushing
COMMITS=$(git log --oneline $(git describe --tags --abbrev=0 @^)..@ | sed -E 's/^[a-f0-9]+ (.*)$/* \1/g')
echo "$COMMITS"
git checkout ${GIT_BRANCH} mathematica-test-runner README.md test doc
git add .
git commit -m "$COMMITS"

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

git tag ${PACKAGE_VERSION}
git push origin github_deploy --tags
git push github master --tags