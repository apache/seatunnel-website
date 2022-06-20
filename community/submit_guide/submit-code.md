---
title: Submit Code
sidebar_position: 2
---

# Submit Code

* First from the remote repository <https://github.com/apache/incubator-seatunnel.git> fork a copy of the code into your own repository

* There are currently three branches in the remote repository:
    * **dev**   daily development branch
      > Every day dev development branch, newly submitted code can pull request to this branch.

    * **1.0.0-release** release version branch
      > The release version branch, there will be 2.0...and other version branches in the future.

* Clone your repository to your local

    ```shell
    git clone git@github.com:apache/incubator-seatunnel.git
    ```

* Add remote repository address, named upstream

    ```shell
    git remote add upstream git@github.com:apache/incubator-seatunnel.git
    ```

* View repository

    ```shell
    git remote -v
    ```

  > At this time, there will be two repositories: origin (your own repository) and upstream (remote repository)

* Get/Update remote repository code

    ```shell
    git fetch upstream
    ```

* Synchronize remote repository code to local repository

    ```shell
    git checkout origin/dev
    git merge --no-ff upstream/dev
    ```

* If remote branch has a new branch such as `dev-1.0`, you need to synchronize this branch to the local repository

    ```shell
    git checkout -b dev-1.0 upstream/dev-1.0
    git push --set-upstream origin dev-1.0
    ```

* After modifying the code locally, submit it to your own repository:

    ```shell
    git commit -m 'commit content'
    git push
    ```

* Submit changes to the remote repository

* On the github page, click "New pull request".

* Select the modified local branch and the branch you want to merge with the past, click "Create pull request".

* Then the community Committers will do CodeReview, and then he will discuss some details (including design, implementation, performance, etc.) with you. When everyone on the team is satisfied with this modification, the commit will be merged into the dev branch

* Finally, congratulations, you have become an official contributor to Apache Seatunnel !
