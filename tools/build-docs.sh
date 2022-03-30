#!/usr/bin/env bash

set -euo pipefail

SOURCE_PATH="$(cd "$(dirname "$(dirname "${BASH_SOURCE[0]}")" )" && pwd)"

# Codebase Repository
PROJECT_NAME="seatunnel"
PROJECT_BRANCH_NAME="dev"

# Repository Website(current) Directory
SWAP_DIR="${SOURCE_PATH}/swap"
PROJECT_SITE_IMG_DIR="${SOURCE_PATH}/static/image_en"
PROJECT_SITE_DOC_DIR="${SOURCE_PATH}/docs"

# Repository Codebase(current) Directory
PROJECT_DIR="${SWAP_DIR}/${PROJECT_NAME}"
PROJECT_IMG_DIR="${PROJECT_DIR}/docs/en/images"
PROJECT_DOC_DIR="${PROJECT_DIR}/docs/en"
PROJECT_SIDEBAR_PATH="${PROJECT_DIR}/docs/sidebars.js"

# Repository Codebase(current) File Path
DOCUSAURUS_DOC_SIDEBARS_FILE="${SOURCE_PATH}/sidebars.js"


# Choose the protocol for git communication to server, default is HTTP because it do not requests password or secret key,
# run command `export PROTOCOL_MODE=ssh` in terminal change protocol to SSH which in is faster and stable in many cases,
# such as local development where we already have RSA public key.
if [ "${PROTOCOL_MODE:-HTTP}" == "ssh" ]; then
    PROJECT_REPO="git@github.com:apache/${PROJECT_NAME}.git"
else
    PROJECT_REPO="https://github.com/apache/${PROJECT_NAME}.git"
fi

##############################################################
#
# Rebuild specific directory, if directory exists, will remove
# it before create it, otherwise create it directly. It
# supports one or more parameters.
#
# Arguments:
#
#   <path...>: One or more directories want to rebuild
#
##############################################################
function rebuild_dirs() {
    for dir in "$@"; do
        echo "  ---> Rebuild directory ${dir}"
        if [ -d "${dir}" ]; then
          rm -rf "${dir}"
        fi
        mkdir -p "${dir}"
    done
}

##############################################################
#
# Remove specific exists file. It supports one or more
# parameters.
#
# Arguments:
#
#   <file...>: One or more files want to remove
#
##############################################################
function rm_exists_files() {
    for file in "$@"; do
        echo "  ---> Remove exists ${file}"
        if [ -f "${file}" ]; then
          rm -rf "${file}"
        fi
    done
}

##############################################################
#
# Clone repository to target directory, it will only support
# clone one depth. Supported two or three parameters, if you
# want to clone into specific directory you should provider
# the third parameter.
#
# Arguments:
#
#   repo: The link of the repository you want to clone
#   branch: The branch to clone
#   path: Optional parameter, The directory to keep the clone
#         content
#
##############################################################
function clone_repo() {
    if [ "$#" -eq 2 ]; then
        local repo="${1}"
        local path="${2}"

        echo "  ---> Start clone repository ${repo} to directory ${path}"
        git clone --depth 1 "${repo}" "${path}"
    elif [ "$#" -eq 3 ]; then
        local repo="${1}"
        local branch="${2}"
        local path="${3}"

        echo "  ---> Start clone repository ${repo} branch ${branch} to directory ${path}"
        git clone --depth 1 --branch "${branch}" "${repo}" "${path}"
    else
        echo "Illegal number of parameters. Only support parameters number of 2 or 3 but get $#."
        exit 1
    fi
}

##############################################################
#
# Replace images path in markdown documents, the source path
# in repo `apache/incubator-seatunnel` is like `images/<name>.png`
# and we should replace it to `images_en/<name>.png`
#
# Arguments:
#
#   replace_dir: The directory to replace the img path
#
##############################################################
function replace_images_path(){
  replace_dir=$1
  for file_path in "${replace_dir}"/*; do
    if test -f "${file_path}"; then
      if [ "${file_path##*.}"x = "md"x ] || [ "${file_path##*.}"x = "mdx"x ]; then
        echo "  ---> Replace images path to /doc/image_en in ${file_path}"
        if [[ "$OSTYPE" == "darwin"* ]]; then
          sed -E -i '' "s/(\.\.\/)*images/\/image_en/g" "${file_path}"
        else
          sed -E -i "s/(\.\.\/)*images/\/image_en/g" "${file_path}"
        fi
      fi
    else
      replace_images_path "${file_path}"
    fi
  done
}

##############################################################
# Main project to do prepare job to debug and build our web
##############################################################
function prepare_docs() {
    echo "===>>>: Start documents sync."

    echo "===>>>: Rebuild directory swap, docs, static/image_en."
    rebuild_dirs "${SWAP_DIR}" "${PROJECT_SITE_DOC_DIR}" "${PROJECT_SITE_IMG_DIR}"

    echo "===>>>: Remove exists file sidebars.js."
    rm_exists_files "${DOCUSAURUS_DOC_SIDEBARS_FILE}"

    echo "===>>>: Clone project main codebase repositories."
    clone_repo "${PROJECT_REPO}" "${PROJECT_BRANCH_NAME}" "${PROJECT_DIR}"

    echo "===>>>: Rsync sidebars.js to ${DOCUSAURUS_DOC_SIDEBARS_FILE}"
    rsync -av "${PROJECT_SIDEBAR_PATH}" "${DOCUSAURUS_DOC_SIDEBARS_FILE}"

    echo "===>>>: Rsync images to ${PROJECT_SITE_IMG_DIR}"
    rsync -av "${PROJECT_IMG_DIR}"/ "${PROJECT_SITE_IMG_DIR}"

    echo "===>>>: Rsync documents exclude images to ${PROJECT_SITE_DOC_DIR}"
    rsync -av --exclude images "${PROJECT_DOC_DIR}"/ "${PROJECT_SITE_DOC_DIR}"

    echo "===>>>: Replace images path in ${PROJECT_SITE_DOC_DIR}"
    replace_images_path "${PROJECT_SITE_DOC_DIR}"

    echo "===>>>: End documents sync"
}

prepare_docs
