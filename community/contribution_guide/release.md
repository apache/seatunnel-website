# Become Apache Release Manager

Release managers shepherd a release from an initial community consensus to getting the compiled code package to final distribution, and may be involved in publicizing the release to the project's community and the ASF in general.

Tips: The Release Manager needs to have an Apache LDAP account, which means you need to become a Committer of the project before you can have an Apache LDAP account. All of the following words for `tyrantlucifer` will serve as an example of a userId in the document, and the release manager needs to use their own userId.

An Apache release is a set of valid, signed, artifacts, voted on by the appropriate PMC and distributed on the official ASF release infrastructure.

For a release, you go through the following steps:
- Has code that complies with the software licensing requirements
- Decides as a community to make a release, and designates a release manager
- The release manager prepares and signs the proposed release materials
- The PMC votes on whether to approve the release
- If the vote passes, the release manager copies the artifacts to the distribution infrastructure.

The source code and build process must comply with the ASF legal and intellectual property requirements for a valid release, and the project must have the infrastructure in place to correctly sign the release artifacts.

## Environment Preparation
If this is the first time for a publisher to publish, you need to install the necessary environment, including the signature tool GnuPG and Maven repository certification-related preparations.

### Install Git
Use to clone project source code locally.

### Install GPG
Used to generate a digital signature, leaving a trail of every action you take. Apache's maven and SVN repositories both use GPG signatures to verify the validity of files.

Download GnuPG binary releases from [the official GnuPG website](https://www.gnupg.org/download/index.html). 

Note: The commands of 1. x and 2. x versions of GnuPG are slightly different. The following description takes 2.2.28 as an example. After the installation, the GPG command is added to the system environment variable and is available.
```bash
# Check the version, which should be 2. x
gpg --full-gen-key
```

#### Configure GPG KEY
##### Create the Key
```shell
gpg --full-gen-key
```
```bash
gpg (GnuPG) 2.0.22; Copyright (C) 2013 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Please select what kind of key you want:
   (1) RSA and RSA (default)
   (2) DSA and Elgamal
   (3) DSA (sign only)
   (4) RSA (sign only)
Your selection? 1
RSA keys may be between 1024 and 4096 bits long.
What keysize do you want? (3072) 4096 
Requested keysize is 4096 bits
Please specify how long the key should be valid.
         0 = key does not expire
      <n>  = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
Key is valid for? (0) 0 
Key does not expire at all
Is this correct? (y/N) y 
```

As shown above, the options are:
- 1
- 4096
- 0
- y

In the process of configuring GPG, the key types selected are RSA and RSA (default), so the first option is 1, and the desired key size can be directly input the corresponding value. The third option is 0, indicating that the validity period of the key is never expired. Finally, input y to ensure that the above input is correct.

```shell
You need a user ID to identify your key; the software constructs the user ID
from the Real Name, Comment and Email Address in this form:
    "Heinrich Heine (Der Dichter) <heinrichh@duesseldorf.de>"

Real name: tyrantlucifer 
Email address: tyrantlucifer@apache.org
Comment: The key of Apache SeaTunnel
You selected this USER-ID:
    “tyrantlucifer (The key of Apache SeaTunnel) <tyrantlucifer@apache.org>”

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O 
You need a password to protect your private key.
```

As shown above, you will need to specify your personal information and encryption password for this key. You will need to fill in the following information:
- Name
- Email (Apache Email)
- Comment for key
- Password (Very important, don't forget)


```shell
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.

gpg: key 09****85 marked as ultimately trusted
public and secret key created and signed.

pub   4096R/0983DF85 2022-12-28
keys fingerprint = AE** FC** EC** 60** 72**  56** 05** AE** 09** DF**
uid                  tyrantlucifer (The key of Apache SeaTunnel) <tyrantlucifer@apache.org>
sub   4***R/B7****46 2022-12-28
```

Note: gpg keys, which need to be remembered and used in subsequent releases.

##### Verify Key
```bash
gpg --list-keys
```
```bash
/home/hadoop/.gnupg/pubring.gpg
-------------------------------
pub   4096R/0983DF85 2022-12-28
uid                  tyrantlucifer (The key of Apache SeaTunnel) <tyrantlucifer@apache.org>
sub   4***R/B7****46 2022-12-28
```
Tips: 0983DF85 is your public key abbreviation.

##### Upload the key to the public server
The public key is sent to the keyserver using the key id.
```bash
$ gpg --keyserver keyserver.ubuntu.com --send-key 0983DF85
```
keyserver.ubuntu.com specifies the selected keyserver. 
This is recommended because Apache Nexus uses this keyserver for verification.

##### Verify that the key is uploaded properly
You can use the following two methods to verify whether the key is uploaded properly:

- Command line validation
```bash
gpg --keyserver keyserver.ubuntu.com --search-keys 0983DF85
```
- Website verification
[OpenPGP Keyserver (ubuntu.com)](http://keyserver.ubuntu.com/)
![](/image/20230324/20221228223258.png)
![](/image/20230324/20221228223313.png)
Tips: This screenshot is the key that has been uploaded before. 
It is normal that the key generated in the previous step is inconsistent with that in the previous step.



### Install SHASUM
Used to generate signatures for files.

### SVN
Used to pull the Apache Release SVN repository. Apache uses svn to host the release of the project.

#### Pull the release and dev repositories to the local
```bash
mkdir -p ~/seatunnel-release-prepare/dev
mkdir -p ~/seatunnel-release-prepare/release
cd ~/seatunnel-release-prepare/dev
svn --username=${APACHE LDAP username} co https://dist.apache.org/repos/dist/dev/seatunnel
cd ~/seatunnel-release-prepare/release
svn --username=${APACHE LDAP username} co https://dist.apache.org/repos/dist/release/seatunnel
```

#### Upload the key to the dev and release repositories
> Tips: You only need to do this when you release this project for the first time.

```bash
cd ~/seatunnel-release-prepare/dev/seatunnel
gpg -a --export ${GPG USERNAME} >> KEYS
svn add KEYS
svn --username=${APACHE LDAP USERNAME} commit -m "Add ${APACHE LDAP USERNAME} GPG key"
```

Committer not have permission of `release` folder, You should find a PMC member to help you add this KEYS file to release folder.
```bash
cd ~/seatunnel-release-prepare/release/seatunnel
gpg -a --export ${GPG USERNAME} >> KEYS
svn add KEYS
svn --username=${APACHE LDAP USERNAME} commit -m "Add ${APACHE LDAP USERNAME} GPG key"
```


### MAVEN
Used to compile the project.

#### Configure maven
##### Create a master password
```bash
mvn --encrypt-master-password <apache password>
```

##### Configure the master password
Add the file `${user.home}/.m2/settings-security.xml` to configure the password created in the previous step.

```xml
<settingsSecurity>
    <master><!-- Fill in the password printed in the previous step --></master>
</settingsSecurity>
```


##### Encrypt the Apache LDAP password
```bash
mvn --encrypt-password <apache password>
```
##### Add new profile
Edit the configuration file of your local maven environment, the general path is `~/.m2/setting.xml`, and add the following xml file:

```xml
<settings>
  <servers>
    <server>
      <id>apache.snapshots.https</id>
      <username> <!-- APACHE LDAP USERNAME --> </username>
      <password> <!-- APACHE LDAP ENCRYPTED PASSWORD, Password encrypted in the previous step --> </password>
    </server>
    <server>
      <id>apache.releases.https</id>
      <username> <!-- APACHE LDAP USERNAME --> </username>
      <password> <!-- APACHE LDAP ENCRYPTED PASSWORD, Password encrypted in the previous step --> </password>
    </server>
    <server>
        <id>gpg.passphrase</id>
        <passphrase><!-- GPG KEY PASSWORD --></passphrase>
    </server>
  </servers>
</settings>
```

> Tips: If you get a 403 forbidden error during the maven release step, and you are absolutely sure that you used the correct password, when you are using your own laptop, you can skip password encryption and use the original password value.

## Project version preparation

### Branch preparation
```bash
mkdir -p ~/seatunnel-release-prepare
cd ~/seatunnel-release-prepare
git clone git@github.com:apache/seatunnel.git
cd seatunnel
git checkout -b ${RELEASE.VERSION}-release
```
### Update release-note
```bash
vim release-note.md
git add release-note.md
git commit -m "[Release][${RELEASE.VERSION}][release-note] Add release-note"
git push
```
### Precompiled test

```bash
mvn release:prepare -Prelease -Darguments="-DskipTests -Dskip.spotless=true" -DdryRun=true -Dusername=${GITHUB USERNAME}
```
### Compile
before this step, you need edit the `.gitignore` file, delete `seatunnel-examples` first.
```bash
mvn release:clean
mvn release:prepare -Prelease -Darguments="-DskipTests -Dskip.spotless=true" -DpushChanges=false -Dusername=${GITHUB USERNAME}
```
After this step, the code has changed, and it not match our project's code style requirement, so you need run this command to fix code style and commit change.
```bash
./mvnw spotless:apply
git commit -am "fix code style"
```

### Submit source code

```bash
git push
git push origin --tags
```
### Deploy jar packages
- Upload jar packages

```bash
mvn release:perform -Prelease -Darguments="-DskipTests -Dskip.spotless=true" -Dusername=${GITHUB USERNAME}
```
> ** Note: During the execution of this command, ensure that the IP address remains constant; otherwise, multiple unusable repositories might appear in stagingRepositories.**

- Close the stage repository
[https://repository.apache.org/#stagingRepositories](https://repository.apache.org/#stagingRepositories)
![](/image/20230324/20221228225445.png)

## Upload to SVN

### Upload source code and binary packages to the dev repository
#### Copy source code and binary packages
```bash
mkdir -p ~/seatunnel-release-prepare/dev/seatunnel/${RELEASE.VERSION}
cp -f ~/seatunnel-release-prepare/seatunnel/seatunnel-dist/target/*.tar.gz ~/seatunnel-release-prepare/dev/seatunnel/${RELEASE.VERSION}
cd ~/seatunnel-release-prepare/dev/seatunnel/${RELEASE.VERSION}
```

#### Generate signature
```bash
shasum -a 512 apache-seatunnel-${RELEASE.VERSION}-src.tar.gz >> apache-seatunnel-${RELEASE.VERSION}-src.tar.gz.sha512
shasum -b -a 512 apache-seatunnel-${RELEASE.VERSION}-bin.tar.gz >> apache-seatunnel-${RELEASE.VERSION}-bin.tar.gz.sha512
```

#### Generate GPG signature
```bash
gpg --armor --detach-sig apache-seatunnel-${RELEASE.VERSION}-src.tar.gz
gpg --armor --detach-sig apache-seatunnel-${RELEASE.VERSION}-bin.tar.gz
```

#### Check file signature
```bash
shasum -c apache-seatunnel-${RELEASE.VERSION}-src.tar.gz.sha512
shasum -c apache-seatunnel-${RELEASE.VERSION}-bin.tar.gz.sha512
```

#### Check digital signatures
step1: Import (Release Manager does not need to do this step)
```bash
curl https://dist.apache.org/repos/dist/dev/seatunnel/KEYS >> KEYS
gpg --import KEYS
gpg --edit-key "${GPG username of releaser}"
  > trust

Please decide how far you trust this user to correctly verify other users' keys
(by looking at passports, checking fingerprints from different sources, etc.)

  1 = I don't know or won't say
  2 = I do NOT trust
  3 = I trust marginally
  4 = I trust fully
  5 = I trust ultimately
  m = back to the main menu

Your decision? 5

  > save
```
step2: Check the gpg digital signature

```bash
gpg --verify apache-seatunnel-${RELEASE.VERSION}-src.tar.gz.asc apache-seatunnel-${RELEASE.VERSION}-src.tar.gz
gpg --verify apache-seatunnel-${RELEASE.VERSION}-bin.tar.gz.asc apache-seatunnel-${RELEASE.VERSION}-bin.tar.gz
```

#### Commit
Commit all files to the dev repository.
```bash
cd ..
svn add ${RELEASE.VERSION}
svn --username=${APACHE LDAP USERNAME} commit -m "release ${RELEASE.VERSION}"
```

## Vote by mail
### dev@seatunnel.apache.org Voting
#### Voting initiate
```bash
[VOTE] Release Apache SeaTunnel 2.3.8 (RC1)

Hello SeaTunnel Community,

This is a call for vote to release Apache SeaTunnel version 2.3.8 (RC1)

Release notes:
https://github.com/apache/seatunnel/blob/2.3.8/release-note.md

The release candidates:
https://dist.apache.org/repos/dist/dev/seatunnel/2.3.8

Git tag for the release:
https://github.com/apache/seatunnel/tree/2.3.8

Docker image
https://hub.docker.com/layers/apache/seatunnel/2.3.8/images/sha256-7ba69f18989b73afb159884c2e8717ff548087c334794fd4a13439726ce974d3?context=explore

Maven 2 staging repository:
https://repository.apache.org/content/repositories/orgapacheseatunnel-1120/org/apache/seatunnel/

Release Commit ID:
https://github.com/apache/seatunnel/commit/860463186a4ae954496c223dd2055e6fc195b8d2

Keys to verify the Release Candidate:
https://downloads.apache.org/seatunnel/KEYS

The vote will be open for at least 72 hours or until necessary numbers of
votes are reached.

Please vote accordingly:

[ ] +1 approve

[ ] +0 no opinion

[ ] -1 disapprove with the reason

Checklist for reference:

[ ] Download links are valid.

[ ] Checksums and PGP signatures are valid.

[ ] Source code artifacts have correct names matching the current release.

[ ] LICENSE and NOTICE files are correct for each SeaTunnel repo.

[ ] All files have license headers if necessary.

[ ] No compiled archives bundled in source archive.


— 

Best Regards
Naijie Liu

```

#### Voting close
```bash
[RESULT] [VOTE] Release Apache SeaTunnel 2.3.8 (RC1)

Hi SeaTunnel community,

This vote now closes since 72 hours have passed.

There are 6 approving votes, 4 of which are binding:
- Jia Fan (binding)
- Guangdong Liu (binding)
- hailin0 (binding)
- David (binding)
- Mohammad Arshad
- User name 6

There are 2 (+0 no opinion) vote
- User name 7
- User name 8

There are no disapproving votes

The vote passes with 4 binding +1 votes and 2 non-binding +1 votes

The vote thread:

https://lists.apache.org/thread/xf18yy6nw03m38k4rjn1tk1bjw84rqlz

I will publish the release and make an announcement once it is done.

— 

Best Regards
Naijie Liu

```
Only the PMC membere has binding vote. 

How to get vote email thread link:  
open this page https://lists.apache.org/list.html?dev@seatunnel.apache.org, find the vote email thread. and click the link copy icon.
![](/image/20230324/image.png)



## Official Release
### Moving files
Moving files from the dev repository to the release repository. This step only PMC member has permission.
```bash
svn mv https://dist.apache.org/repos/dist/dev/seatunnel/${RELEASE.VERSION} https://dist.apache.org/repos/dist/release/seatunnel/
```

### Generate website document
https://github.com/apache/seatunnel-website?tab=readme-ov-file#39-add-a-new-version-for-documents


### Release Maven Repository
![](/image/20230324/20221228232210.png)

### Send notification email
[dev@seatunnel.apache.org](dev@seatunnel.apache.org)
[announce@apache.org](announce@apache.org)

> ** Please note that you should send emails in plain text mode, otherwise they will be rejected by Apache's email server.**

```bash
Hi all,

We are glad to announce the release of Apache SeaTunnel 2.3.8.

Once again I would like to express my thanks to your help.

SeaTunnel: SeaTunnel is a distributed, high-performance data integration tool for the synchronization and transformation of massive
data (offline & real-time).

Apache SeaTunnel website: 

http://seatunnel.apache.org/

Downloads: 

https://seatunnel.apache.org/download/

Release Notes:

https://github.com/apache/seatunnel/blob/2.3.8/release-note.md

Documents: 

https://seatunnel.apache.org/docs/2.3.8/about/

Twitter: 

https://twitter.com/ASFSeaTunnel

SeaTunnel Resources:
- GitHub: https://github.com/apache/seatunnel
- Issue: https://github.com/apache/seatunnel/issues
- Mailing list: dev@seatunnel.apache.org

- Apache SeaTunnel Team

```


## Something After Release
### Update github repo releases
- https://github.com/apache/seatunnel/releases


### Update project snapshot version
some PR for refer
- https://github.com/apache/seatunnel/pull/7841
- https://github.com/apache/seatunnel/pull/7435
- https://github.com/apache/seatunnel/pull/7305
