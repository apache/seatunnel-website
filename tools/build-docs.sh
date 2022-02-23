#!/usr/bin/env bash

WEBSITE_REPO="https://github.com/apache/incubator-seatunnel-website.git"
MAIN_REPO="https://github.com/apache/incubator-seatunnel.git"

WEBSITE_REPO_NAME="incubator-seatunnel-website"
WEBSITE_NAME="website"
MAIN_NAME="seatunnel"

#WORK_PATH=~/work/${WEBSITE_REPO_NAME}
WORK_PATH=~/yyyy/${WEBSITE_REPO_NAME}

# To be compatible with MacOS and Linux
txt=""
if [[ "$OSTYPE" == "darwin"* ]]; then
  # Mac OSX
  txt=''
elif [[ "$OSTYPE" == "linux-gnu" ]]; then
  # linux
  txt=""
elif [[ "$OSTYPE" == "freebsd"* ]]; then
  # ...
  txt=""
else
  # Unknown.
  echo "Operating system unknown, please tell us(submit issue) for better service"
  exit 1
fi

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
git clone --depth 1 ${WEBSITE_REPO} ${WORK_PATH}/${WEBSITE_NAME}

echo "===>>>: Clone ${MAIN_REPO} repositories to ${MAIN_NAME}"
git clone --depth 1 ${MAIN_REPO} ${WORK_PATH}/${MAIN_NAME}

echo "===>>>: Copy images to ${WORK_PATH}/${WEBSITE_NAME}/static/doc/image_en/"
cp -rf ${WORK_PATH}/${MAIN_NAME}/docs/en/images/* ${WORK_PATH}/${WEBSITE_NAME}/static/doc/image_en/

echo "===>>>: Replace images path to /doc/image_en"
sed -r -i ${txt} "s/(\.\.\/)+images/\/doc\/image_en/g" ${WORK_PATH}/${MAIN_NAME}/docs/en/**/*.md

echo "===>>>: Replace elements inside md files"
cp -rf ${WORK_PATH}/${MAIN_NAME}/docs/en/* ${WORK_PATH}/${WEBSITE_NAME}/docs/

echo "===>>>: Replace docs Done"

echo "===>>>: Copy ${WORK_PATH}/${WEBSITE_NAME} to ${WORK_PATH}/${WEBSITE_REPO_NAME} directory"
cp -rf ${WORK_PATH}/${WEBSITE_NAME} ${WORK_PATH}/${WEBSITE_REPO_NAME}

echo "===>>>: Replace ${WORK_PATH}/${WEBSITE_REPO_NAME} Done"
