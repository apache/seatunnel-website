#!/usr/bin/env bash

set -exv

WEBSITE_REPO="https://github.com/apache/incubator-seatunnel-website.git"
MAIN_REPO="https://github.com/apache/incubator-seatunnel.git"

WEBSITE_REPO_NAME="incubator-seatunnel-website"
WEBSITE_NAME="website"
MAIN_NAME="seatunnel"

WORK_PATH=~/work/${WEBSITE_REPO_NAME}

MAIN_PATH=${WORK_PATH}/${MAIN_NAME}
WEBSITE_PATH=${WORK_PATH}/${WEBSITE_NAME}
WEBSITE_REPO_PATH=${WORK_PATH}/${WEBSITE_REPO_NAME}
DOCS_EN=${MAIN_PATH}/docs/en

if [ ! -d ${WORK_PATH} ]; then
  mkdir -p ${WORK_PATH}
else
  rm -rf ${WORK_PATH}
  mkdir -p ${WORK_PATH}
fi

echo "===>>>: Start documents sync"

cd ${WORK_PATH}
echo "===>>>: current work path: ${WORK_PATH}"

echo "===>>>: Clone git repositories"

echo "===>>>: Clone ${WEBSITE_REPO} repositories to ${WEBSITE_NAME}"
git clone --depth 1 ${WEBSITE_REPO} ${WEBSITE_PATH}

echo "===>>>: Clone ${MAIN_REPO} repositories to ${MAIN_NAME}"
git clone --depth 1 ${MAIN_REPO} ${MAIN_PATH}

echo "===>>>: Copy images to ${WEBSITE_PATH}/static/doc/image_en/"
cp -rf ${DOCS_EN}/images/* ${WEBSITE_PATH}/static/doc/image_en/

if [ -d ${DOCS_EN}/images ]; then
  rm -rf ${DOCS_EN}/images
fi

echo "===>>>: Replace images path to /doc/image_en"
function replaceImagesPath(){
  CURRENT_DIR=$1
  echo "===>>>: Current directory: ${CURRENT_DIR}"
  for filePath in ${CURRENT_DIR}/*; do
    if test -f ${filePath}; then
      if [ "${filePath##*.}"x = "md"x ]; then
        echo "===>>: Replace images path to /doc/image_en in ${filePath}"
        if [[ "$OSTYPE" == "darwin"* ]]; then
          sed -r -i '' "s/(\.\.\/)*images/\/doc\/image_en/g" ${filePath}
        else
          sed -r -i "s/(\.\.\/)*images/\/doc\/image_en/g" ${filePath}
        fi
      fi
    else
      replaceImagesPath ${filePath}
    fi
  done
}

replaceImagesPath ${DOCS_EN}

echo "===>>>: Replace elements inside md filePath"
cp -rf ${DOCS_EN}/* ${WEBSITE_PATH}/docs/

echo "===>>>: Replace docs Done"

echo "===>>>: Copy ${WEBSITE_PATH} to ${WEBSITE_REPO_PATH} directory"
cp -rf ${WEBSITE_PATH} ${WEBSITE_REPO_PATH}

echo "===>>>: Replace ${WEBSITE_REPO_PATH} Done"
