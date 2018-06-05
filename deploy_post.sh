#!/usr/bin/env bash

GIT_BRANCH=$(git symbolic-ref --short -q HEAD)

# Get all the commits into one, well described commit for pushing
COMMITS=$(git log --oneline $(git describe --tags --abbrev=0 @^)..@ | sed -E 's/^[a-f0-9]+ (.*)$/* \1/g')
echo "$COMMITS"
git checkout github_deploy
git checkout ${GIT_BRANCH} mathematica-test-runner README.md test doc
git add .
git commit -m "$COMMITS"

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

echo "##### Tagging repo"
git tag ${PACKAGE_VERSION}

echo "##### Pushing to origin"
git push origin github_deploy --tags

echo "##### Pulling github master"
git pull github master

echo "##### Pushing to github master"
git push github master --tags

echo "##### Checking out original branch"
git checkout $GIT_BRANCH
