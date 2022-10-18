#!/usr/bin/env bash

# deploy html to a server and then add html to ipfs

# go to current folder
cd "$(dirname "$0")"

# add env vars
if [ -f ../.env ]; then
  export $(echo $(cat ../.env | sed 's/#.*//g'| xargs) | envsubst)
fi

# check creds
if [ -z "${DEPLOY_HOST+xxx}" ]; then echo "DEPLOY_HOST not set" && exit; fi
if [ -z "${DEPLOY_USER+xxx}" ]; then echo "DEPLOY_USER not set" && exit; fi
if [ -z "${DEPLOY_PASSWORD+xxx}" ]; then echo "DEPLOY_PASSWORD not set" && exit; fi

# save version
PLEBBIT_REACT_VERSION=$(node -e "console.log(require('../package.json').version)")
PLEBBIT_REACT_HTML_NAME="plebbit-html-$PLEBBIT_REACT_VERSION"

SCRIPT="
# download html
cd ~
rm $PLEBBIT_REACT_HTML_NAME.zip
rm -fr $PLEBBIT_REACT_HTML_NAME
wget https://github.com/plebbit/plebbit-react/releases/download/v$PLEBBIT_REACT_VERSION/$PLEBBIT_REACT_HTML_NAME.zip || exit

# extract html
unzip $PLEBBIT_REACT_HTML_NAME.zip || exit
rm $PLEBBIT_REACT_HTML_NAME.zip || exit

# add to ipfs
CID=\`ipfs add --recursive --pin --quieter $PLEBBIT_REACT_HTML_NAME | tail -n 1\`
ipfs pin add --recursive \"\$CID\"

# the CID of plebbit html, add this CID to ENS
echo \"\"
echo $PLEBBIT_REACT_HTML_NAME \"CID: \$CID\"
echo \"\"

# start ipfs daemon if not started
ipfs daemon --init
nohup ipfs daemon &
"

# execute script over ssh
echo "$SCRIPT" | sshpass -p "$DEPLOY_PASSWORD" ssh "$DEPLOY_USER"@"$DEPLOY_HOST"
