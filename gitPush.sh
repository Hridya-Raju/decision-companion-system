#!/bin/bash

# Set variables
BRANCH="hridya/digitalwallet"  
COMMIT_MSG=${1:-"Auto commit"}  

# Add all changes
git add .

git rm -r --cached node_modules
git rm --cached .env
git rm --cached log/*.log
git rm --cached gitPush.sh 

# Commit changes
git commit -m "$COMMIT_MSG"

# Push to the remote repository
git push origin "$BRANCH"

echo "Changes pushed to branch: $BRANCH"