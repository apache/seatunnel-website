#!/bin/bash

WEBSITE_REPO="https://github.com/apache/incubator-seatunnel-website.git"
MAIN_REPO="https://github.com/apache/incubator-seatunnel.git"

WEBSITE_NAME="seatunnel-website"
MAIN_NAME="seatunnel"

WORK_PATH="/tmp/seatunnel"

if [ ! -d ${WORK_PATH} ]; then
  mkdir -p ${WORK_PATH}
else
  rm -rf ${WORK_PATH}
  mkdir -p ${WORK_PATH}
fi

echo "===>>>: Start documents sync"

cd ${WORK_PATH}
echo "===>>>: current path: ${WORK_PATH}"

echo "===>>>: Clone git repositories"

echo "===>>>: Clone ${MAIN_NAME} repositories"
git clone --depth 1 ${WEBSITE_REPO} ${WORK_PATH}/${WEBSITE_NAME}

echo "===>>>: Clone ${WEBSITE_NAME} repositories"
git clone --depth 1 ${MAIN_REPO} ${WORK_PATH}/${MAIN_NAME}

echo "===>>>: Replace elements inside md files"
cp -rf ${WORK_PATH}/${MAIN_NAME}/docs/en/ ${WORK_PATH}/${WEBSITE_NAME}/docs

echo "===>>>: Replace Done"
