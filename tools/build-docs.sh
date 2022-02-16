#!/usr/bin/env bash

WEBSITE_REPO="https://github.com/apache/incubator-seatunnel-website.git"
MAIN_REPO="https://github.com/apache/incubator-seatunnel.git"

WEBSITE_REPO_NAME="incubator-seatunnel-website"
WEBSITE_NAME="seatunnel-website"
MAIN_NAME="seatunnel"

WORK_PATH=~/work/incubator-seatunnel-website

if [ ! -d ${WORK_PATH} ]; then
  mkdir -p ${WORK_PATH}
else
  rm -rf ${WORK_PATH}
  mkdir -p ${WORK_PATH}
fi

echo "===>>>: Start documents sync"

CURRENT_PATH=$(cd "$(dirname "$0")"; pwd)
echo "===>>>: current path: ${CURRENT_PATH}"

cd ${WORK_PATH}
echo "===>>>: current work path: ${WORK_PATH}"

echo "===>>>: Clone git repositories"

echo "===>>>: Clone ${WEBSITE_REPO} repositories to ${WEBSITE_NAME}"
git clone --depth 1 ${WEBSITE_REPO} ${WORK_PATH}/${WEBSITE_NAME}

echo "===>>>: Clone ${MAIN_REPO} repositories to ${MAIN_NAME}"
git clone --depth 1 ${MAIN_REPO} ${WORK_PATH}/${MAIN_NAME}

echo "===>>>: Replace elements inside md files"
cp -rf ${WORK_PATH}/${MAIN_NAME}/docs/en/* ${WORK_PATH}/${WEBSITE_NAME}/docs/

echo "===>>>: Replace docs Done"

echo "===>>>: Copy ${WORK_PATH}/${WEBSITE_NAME} to ${WORK_PATH}/${WEBSITE_REPO_NAME} directory"
cp -rf ${WORK_PATH}/${WEBSITE_NAME} ${WORK_PATH}/${WEBSITE_REPO_NAME}

echo "===>>>: Replace ${WORK_PATH}/${WEBSITE_REPO_NAME} Done"
