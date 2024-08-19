# How Documentation Work

[Our website](https://seatunnel.apache.org) is generated based on this repository(**apache/incubator-seatunnel-website**),
but the content of document is hold on [our codebase repository](https://github.com/apache/incubator-seatunnel/tree/dev/docs).
So we have to fetch the document from the codebase repository before we build the document.

Indeed, you could fetch it by your hand, but we provide the more convenience way to do it, the `build-docs.sh` in directory
`tools`. It will

* Create the directory named `swap` under your project directory, as well `docs` and `static/image_en`.
* Fetch the latest code in codebase repository(apache/seatunnel) to directory `swap`.
* Sync the latest `incubator-seatunnel/docs/en` and `incubator-seatunnel/docs/en/image` to directory `docs` and `static/image_en`.

When the main library code is synchronized to the local, HTTP is used by default as the protocol for git to communicate with the server, because it do not requests password or secret key. such as local development where we already have RSA public key, run command `export PROTOCOL_MODE=ssh` in terminal change protocol to SSH which in is faster and stable in many cases.

After that, you are finish the prepare work, and all resources you need to build our website it there, you could run your
`npm` command to build the website.

## How It Works in GitHub Action

Our GitHub Action also use script `tools/build-docs.sh` to finish its prepare work. Consistent way to prepare and build
the website is good for both development and production maintenance.
