#Guardian

[Guardian](https://github.com/InterestingLab/guardian) is a sub-project of seatunnel. It is a monitoring and alarming tool that can provide monitoring of seatunnel's survival and scheduling delay. Guardian is capable of dynamically loading configuration files at runtime and provides an HTTP API to support real-time modification of configuration. Currently only seatunnel on Yarn is supported.

## run Guardian

Download Guardian, take guardian_1.0.0 as an example
````
wget https://github.com/InterestingLab/guardian/releases/download/v1.0.0/guardian_1.0.0.tar.gz
tar -xvf guardian_1.0.0
cd guardian_1.0.0
./bin/guardian check config.json
````


## config file

Guardian configuration files are written in `JSON` format, a valid example, click [here](https://github.com/InterestingLab/guardian/blob/master/config.json.template)

The entire configuration file consists of the following parts:

- port: the port to which the interface API is bound
- node_name: node information
- check_interval: the time interval for checking the application
- yarn: the detected YARN cluster address
- apps: specific apps that need to be detected
- alert_manager: alert management

The following is a detailed description of each part:


### yarn

````
# Yarn resourcemanager
api_hosts: <list>
````

**Example**

````
"yarn": {
    "api_hosts": [
        "10.11.10.21:8088",
        "10.11.10.22:8088"
    ]
}
````

### apps

````
[{
    # Spark application name
    "app_name": <string>,
    # Restart command when application fails
    "start_cmd": <string>,
    # The number of applications running under the same app_name
    "app_num": <number>,
    # Application type, default 'spark'
    "check_type": <string>,
    # mark whether the application is valid or not
    "active": <boolean>
    "check_options": {
        # Alarm level, support WARNNING, ERROR, etc.
        "alert_level": <string>,
        "max_delayed_batch_num": <number>,
        "max_delayed_time": <number>
    }
}]
````

**Example**

````
"apps": [
    {
        "app_name": "seatunnel-app",
        "start_cmd": "test_cmd",
        "app_num": 1,
        "check_type": "spark",
        "check_options": {
            "alert_level": "WARNING",
            "max_delayed_batch_num": 10,
            "max_delayed_time": 600
        }
    }
]
````

### alert_manager

#### routes

Alarm routing, currently only supports alarm levels

Trigger an alarm when the alarm level is `WARNNING` or `ERROR`

````
"routes": {
    "match": {
        "level": ["WARNING", "ERROR"]
    }
}
````

#### **emails**

Send alarm information by email

````
# Email verification username
"auth_username": <string>,
# Email verification password
"auth_password": <string>,
# Mailbox stmp server
"smtp_server": <string>,
# sender
"sender": <string>,
# recipient list
"receivers": <list>
````

**Example**

````
"emails": {
    "auth_username": "username",
    "auth_password": "password",
    "smtp_server": "smtp.163.com",
    "sender": "huochen1994@163.com",
    "receivers": ["garygaowork@gmail.com"],
    "routes": {
        "match": {
            "level": ["WARNING", "ERROR"]
        }
    }
}
````

#### **webhooks**

Implement custom alarm mode through interface

````
# webhook interface address
"url": <string>
````

**Example**

````
"webhook": {
    "url": "http://api.webhook.interestinglab.org/alert",
    "routes": {
        "match": {
            "level": ["ERROR"]
        }
    }
}
````

When Gaurdian calls the interface, it will send an HTTP POST request to the configured interface address in the following JSON format:

````
{
    "subject": "Guardian",
    "objects": "seatunnel_app",
    "content": "App is not running or less than expected number of running instance, will restart"
}
````


## Guardian interface usage guide


### GET

#### Overview

* Function description

  Get the configuration information of Guardian corresponding to app_name

* Basic interface

  http://localhost:5000/config/[app_name]

* Request method

  get

#### Interface parameter definition

N/A

#### return result

````
curl 'http://localhost:5000/config/seatunnel-app2'

{
  "content": {
    "app_name": "seatunnel-app2",
    "app_num": 1,
    "check_options": {},
    "check_type": "spark",
    "start_cmd": "test_cmd_not_exist"
  },
  "status": 0
}
````

### POST

#### Overview

* Function description

  Update or add application configuration information in Guardian. When `app_name` exists, update the corresponding configuration information. When `app_name` does not exist, add an application monitoring configuration

* Basic interface

  http://localhost:5000/config/[app_name]

* Request method

  post

#### Interface parameter definition

| Field | Type | Comment | Instance |
| :--: | :--: | :--: | :--:|
| start_cmd| string| restart command | |
|app_num| num | Existing number | 2 |
|check_type| string | Application type | spark |
|check_options| dict| | |
|active| boolean| is active | true|

#### return result

```
`
curl 'http://localhost:5000/config/seatunnel-app2' -d '
{
    'active': false
}'

{
  "status": 0
}
````

### DELETE

#### Overview

* Function description

  Delete the configuration information of Guardian corresponding to app_name

* Basic interface

  http://localhost:5000/config/[app_name]

* Request method

  delete

#### Interface parameter definition

N/A

#### return result

````
curl -XDELETE 10.212.81.56:5000/config/seatunnel-app2

{
  "status": 0
}
````


### Return status code description

| status | Description |
| :--: | :--:|
| 0 | Success|
| 1 | Parameter error|
| 2 | Internal error |
