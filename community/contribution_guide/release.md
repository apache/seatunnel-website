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
gpg --version 
```

### Install SHASUM
Used to generate signatures for files.

### SVN
Used to pull the Apache Release SVN repository. Apache uses svn to host the release of the project.

### MAVEN
Used to compile the project.

## Environment Configuration
### Configure GPG KEY
#### Create the Key
```shell
gpg --gen-key
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

#### Verify Key
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

#### Upload the key to the public server
The public key is sent to the keyserver using the key id.
```bash
$ gpg --keyserver keyserver.ubuntu.com --send-key 0983DF85
```
keyserver.ubuntu.com specifies the selected keyserver. 
This is recommended because Apache Nexus uses this keyserver for verification.

#### Verify that the key is uploaded properly
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

### Configure maven
#### Create a master password
```bash
mvn --encrypt-master-password <apache password>
```

#### Configure the master password
Add the file `${user.home}/.m2/settings-security.xml` to configure the password created in the previous step.

```xml
<settingsSecurity>
    <master><!-- Fill in the password printed in the previous step --></master>
</settingsSecurity>
```


#### Encrypt the Apache LDAP password
```bash
mvn --encrypt-password <apache password>
```
#### Add new profile
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

## Project version preparation

### Branch preparation
```bash
mkdir -p ~/seatunnel-release-prepare
cd ~/seatunnel-release-prepare
git clone git@github.com:apache/incubator-seatunnel.git
cd incubator-seatunnel
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
mvn release:prepare -Prelease -Darguments="-DskipTests" -DdryRun=true -Dusername=${GITHUB USERNAME}
```
### Compile
```bash
mvn release:clean
mvn release:prepare -Prelease -Darguments="-DskipTests" -DpushChanges=false -Dusername=${GITHUB USERNAME}
```
### Submit source code

```bash
git push
git push origin --tags
```
### Deploy jar packages
- Upload jar packages

```bash
mvn release:perform -Prelease -Darguments="-DskipTests" -Dusername=${GITHUB USERNAME}
```
- Close the stage repository
[https://repository.apache.org/#stagingRepositories](https://repository.apache.org/#stagingRepositories)
![](/image/20230324/20221228225445.png)

## Upload to SVN
### Pull the release and dev repositories to the local
```bash
mkdir -p ~/seatunnel-release-prepare/dev
mkdir -p ~/seatunnel-release-prepare/release
cd ~/seatunnel-release-prepare/dev
svn --username=${APACHE LDAP username} co https://dist.apache.org/repos/dist/dev/incubator/seatunnel
cd ~/seatunnel-release-prepare/release
svn --username=${APACHE LDAP username} co https://dist.apache.org/repos/dist/release/incubator/seatunnel
```

### Upload the key to the dev and release repositories
Tips: Only the first Release Manager needs to do this step.

```bash
cd ~/seatunnel-release-prepare/dev/seatunnel
gpg -a --export ${GPG USERNAME} >> KEYS
svn add KEYS
svn --username=${APACHE LDAP USERNAME} commit -m "Add ${APACHE LDAP USERNAME} GPG key"
```
```bash
cd ~/seatunnel-release-prepare/release/seatunnel
gpg -a --export ${GPG USERNAME} >> KEYS
svn add KEYS
svn --username=${APACHE LDAP USERNAME} commit -m "Add ${APACHE LDAP USERNAME} GPG key"
```

### Upload source code and binary packages to the dev repository
#### Copy source code and binary packages
```bash
mkdir -p ~/seatunnel-release-prepare/dev/seatunnel/${RELEASE.VERSION}
cp -f ~/seatunnel-release-prepare/incubator-seatunnel/seatunnel-dist/target/*.tar.gz ~/seatunnel-release-prepare/dev/seatunnel/${RELEASE.VERSION}
cd ~/seatunnel-release-prepare/dev/seatunnel/${RELEASE.VERSION}
```

#### Generate signature
```bash
shasum -a 512 apache-seatunnel-incubating-${RELEASE.VERSION}-src.tar.gz >> apache-seatunnel-incubating-${RELEASE.VERSION}-src.tar.gz.sha512
shasum -b -a 512 apache-seatunnel-incubating-${RELEASE.VERSION}-bin.tar.gz >> apache-seatunnel-incubating-${RELEASE.VERSION}-bin.tar.gz.sha512
```

#### Generate GPG signature
```bash
gpg --armor --detach-sig apache-seatunnel-incubating-${RELEASE.VERSION}-src.tar.gz
gpg --armor --detach-sig apache-seatunnel-incubating-${RELEASE.VERSION}-bin.tar.gz
```

#### Check file signature
```bash
shasum -c apache-seatunnel-incubating-${RELEASE.VERSION}-src.tar.gz.sha512
shasum -c apache-seatunnel-incubating-${RELEASE.VERSION}-bin.tar.gz.sha512
```

#### Check digital signatures
step1: Import (Release Manager does not need to do this step)
```bash
curl https://dist.apache.org/repos/dist/dev/incubator/seatunnel/KEYS >> KEYS
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
gpg --verify apache-seatunnel-incubating-${RELEASE.VERSION}-src.tar.gz.asc apache-seatunnel-incubating-${RELEASE.VERSION}-src.tar.gz
gpg --verify apache-seatunnel-incubating-${RELEASE.VERSION}-seatunnel-bin.tar.gz.asc apache-seatunnel-incubating-${RELEASE.VERSION}-seatunnel-bin.tar.gz
```

#### Commit
Commit all files to the dev repository.
```bash
svn add *
svn --username=${APACHE LDAP USERNAME} commit -m "release ${RELEASE.VERSION}"
```

## Vote by mail
### dev@seatunnel.apache.org Voting
#### Voting initiate
```bash
[VOTE] Release Apache SeaTunnel(Incubating) 2.3.0

Hello SeaTunnel Community,

This is a call for vote to release Apache SeaTunnel (Incubating) version 2.3.0

Release notes:
https://github.com/apache/incubator-seatunnel/blob/2.3.0/release-note.md

The release candidates:
https://dist.apache.org/repos/dist/dev/incubator/seatunnel/2.3.0 

Git tag for the release:
https://github.com/apache/incubator-seatunnel/tree/2.3.0

Maven 2 staging repository:
https://repository.apache.org/content/repositories/orgapacheseatunnel-1015/org/apache/seatunnel/

Release Commit ID:
https://github.com/apache/incubator-seatunnel/commit/d7280abbe9e72262640836182a7f090a5706988a

Keys to verify the Release Candidate: 
https://downloads.apache.org/incubator/seatunnel/KEYS
 
The vote will be open for at least 72 hours or until necessary numbers of votes are reached.

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

More detail checklist please refer:
https://cwiki.apache.org/confluence/display/INCUBATOR/Incubator+Release+Checklist


--

Best Regards
Chao Tian
```

#### Voting close
```bash
[VOTE] Release Apache SeaTunnel(Incubating) 2.3.0

Hi SeaTunnel Community,

Thanks, everyone, I will close this vote thread and the results will be tallied.

Best wishes!
Chao Tian
#### 归票
[RESULT] [VOTE] Release Apache SeaTunnel(Incubating) 2.3.0

Hi SeaTunnel community,

This vote now closes since 72 hours have passed.

The vote PASSES with

3 (+1 binding) votes from the IPMC,
David,
Guo Wei,
Calvin Kirs  

6 (+1 non-binding) votes from the developer from the community

Jun Gao, 
TaoZex, 
hailin0,
Peng Yuan,
Zongwen Li,
Guangdong Liu
and no further 0 or -1 votes.


The vote thread: 

https://lists.apache.org/thread/98oc6q6vghlg8qpfyf5yttzy925tfp9g 


Thanks for your participation, I will now bring the vote to
[general@incubator.apache.org](mailto:general@incubator.apache.org) <mailto:
[general@incubator.apache.org](mailto:general@incubator.apache.org)> to get
approval by the IPMC.
If this vote passes also, the release is accepted and will be published.

Best wishes,
Chao Tian
```

### general@incubator.apache.org Voting
#### Voting initiate
```bashing
[VOTE] Release Apache SeaTunnel(Incubating) 2.3.0

Hello IPMC, This is an official vote for the Apache
SeaTunnel(Incubating) 2.3.0  that we have been working toward.

To learn more about Apache SeaTunnel(Incubating), please see:

https://seatunnel.apache.org

The Apache SeaTunnel (incubating) community has voted and approved the release.

Vote thread:

https://lists.apache.org/thread/98oc6q6vghlg8qpfyf5yttzy925tfp9g

Result thread:

https://lists.apache.org/thread/6c0463dsoh8r0gmvqo67lttgy4o40xst

Release changes:

https://github.com/apache/incubator-seatunnel/blob/2.3.0/release-note.md

The release candidates:

https://dist.apache.org/repos/dist/dev/incubator/seatunnel/2.3.0

Maven 2 staging repository:

https://repository.apache.org/content/repositories/orgapacheseatunnel-1015/org/apache/seatunnel/

Git tag for the release:

https://github.com/apache/incubator-seatunnel/tree/2.3.0

Release Commit ID:

https://github.com/apache/incubator-seatunnel/commit/d7280abbe9e72262640836182a7f090a5706988a

Keys to verify the Release Candidate:

https://downloads.apache.org/incubator/seatunnel/KEYS

GPG user ID:

tyrantlucifer

The vote will be open for at least 72 hours or until necessary numbers
of votes are reached.

Please vote accordingly:

[ ] +1 approve
[ ] +0 no opinion
[ ] -1 disapprove with the reason

Checklist for reference:

[ ] Download links are valid.
[ ] Checksums and PGP signatures are valid.
[ ] DISCLAIMER is included.
[ ] Source code artifacts have correct names matching the current release.
[ ] LICENSE and NOTICE files are correct for each SeaTunnel repo.
[ ] All files have license headers if necessary.
[ ] No compiled archives bundled in source archive.

More detail checklist please refer:
https://cwiki.apache.org/confluence/display/INCUBATOR/Incubator+Release+Checklist

The following votes are carried over from the SeaTunnel dev mailing list:

+1(binding)
David,
William-Guowei,
Calvin Kirs

Best Regards,
Chao Tian
```

#### Voting close
```bash
[VOTE] Release Apache SeaTunnel(Incubating) 2.3.0

Hi IPMC,

Thanks, everyone, I will close this vote thread and the results will be tallied.

Best wishes!
Chao Tian
```

#### Voting summary
```bash
[RESULT] [VOTE] Release Apache SeaTunnel(Incubating) 2.3.0

Hi SeaTunnel community,

This vote now closes since 72 hours have passed.

The vote PASSES with

3 (+1 binding) votes from the IPMC,
David,
Guo Wei,
Calvin Kirs  

6 (+1 non-binding) votes from the developer from the community

Jun Gao, 
TaoZex, 
hailin0,
Peng Yuan,
Zongwen Li,
Guangdong Liu
and no further 0 or -1 votes.


The vote thread: 

https://lists.apache.org/thread/98oc6q6vghlg8qpfyf5yttzy925tfp9g 


Thanks for your participation, I will now bring the vote to
[general@incubator.apache.org](mailto:general@incubator.apache.org) <mailto:
[general@incubator.apache.org](mailto:general@incubator.apache.org)> to get
approval by the IPMC.
If this vote passes also, the release is accepted and will be published.

Best wishes,
Chao Tian
```

## Official Release
### Moving files
Moving files from the dev repository to the release repository.
```bash
svn mv https://dist.apache.org/repos/dist/dev/incubator/seatunnel/${RELEASE.VERSION} https://dist.apache.org/repos/dist/release/incubator/seatunnel/
```

### Release Maven Repository
![](/image/20230324/20221228232210.png)

### Send notification email
[dev@seatunnel.apache.org](dev@seatunnel.apache.org)
[general@incubator.apache.org](dev@seatunnel.apache.org)

```bash
Hi all,

We are glad to announce the release of Apache SeaTunnel(incubating) ${RELEASE.VERSION}.

Once again I would like to express my thanks to your help.

SeaTunnel: SeaTunnel(Incubating) is a distributed, high-performance data integration platform for the synchronization and transformation of massive
data (offline & real-time).

Apache SeaTunnel(Incubating) website: 

http://seatunnel.apache.org/

Downloads: 

https://seatunnel.apache.org/download/

Release Notes:

https://github.com/apache/incubator-seatunnel/blob/${RELEASE.VERSION}/release-note.md

Documents: 

https://seatunnel.apache.org/docs/${RELEASE.VERSION}/intro/about

Twitter: 

https://twitter.com/ASFSeaTunnel

SeaTunnel(Incubating) Resources:
- GitHub: https://github.com/apache/incubator-seatunnel
- Issue: https://github.com/apache/incubator-seatunnel/issues
- Mailing list: dev@seatunnel.apache.org

- Apache SeaTunnel(Incubating) Team
```