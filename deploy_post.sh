#!/usr/bin/env bash

npm publish

GIT_BRANCH=$(git symbolic-ref --short -q HEAD)

# Get all the commits into one, well described commit for pushing
COMMITS=$(git log --oneline $(git describe --tags --abbrev=0 @^)..@ | sed -E 's/^[a-f0-9]+ (.*)$/* \1/g')
echo "$COMMITS"
#git checkout ${GIT_BRANCH} mathematica-test-runner README.md test doc
#git add .
#git commit -m "Pulled in changes for deploying to Github"
#git merge --no-edit v${PACKAGE_VERSION}
##git push origin github_deploy
##git push github master