#!/usr/bin/env bash

npm publish

GIT_BRANCH=$(git symbolic-ref --short -q HEAD)

COMMITS=$(git log --oneline $(git describe --tags --abbrev=0 @^)..@)
echo "$COMMITS"
#git checkout ${GIT_BRANCH} mathematica-test-runner README.md test
#### THIS DOESN'T WORK BECAUSE THE COMMIT IS DONE AFTER
#### Probably can clean this up with the 'postversion' command but it's not worth my time.
#git add .
#git commit -m "Pulled in changes for deploying to Github"
#git merge --no-edit v${PACKAGE_VERSION}
##git push origin github_deploy
##git push github master