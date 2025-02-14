---
title: Submit Code
sidebar_position: 2
---

# Submit Code

* First from the remote repository <https://github.com/apache/seatunnel.git> fork a copy of the code into your own repository

* There are currently three branches in the remote repository:
    * **dev**   daily development branch
      > Every day dev development branch, newly submitted code can pull request to this branch.

    * **2.3.9-release** release version branch
      > The release version branch, there will be 3.0...and other version branches in the future.

* Take your fork repository named `seatunnel` as an example

* Clone your repository to your local

    ```shell
    git clone git@github.com:<YOUR_GITHUB_ID>/seatunnel.git
    ```

* Add remote repository address, named upstream

    ```shell
    git remote add upstream git@github.com:apache/seatunnel.git
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
  
* Create a new branch to modify the code

    ```shell
    git checkout -b feature-xxx
    ```

* After modifying the code locally, submit it to your own repository:

    ```shell
    git commit -m 'commit content'
    git push
    ```

* Submit changes to the remote repository

* On the GitHub page, click "New pull request".

* Select the modified local branch and the branch you want to merge with the past, click "Create pull request".

* Then the community Committers will do CodeReview, and then he will discuss some details (including design, implementation, performance, etc.) with you. When everyone on the team is satisfied with this modification, the commit will be merged into the dev branch

* Finally, congratulations, you have become an official contributor to Apache SeaTunnel!
