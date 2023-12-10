# Quick Deployment of Apache SeaTunnel Web

Apache SeaTunnel offers two methods for submitting tasks:

1. **SeaTunnel Web:** This is a visual method to create and submit seatunnel tasks.
2. **Command Line:** SeaTunnel also provides a command line method for task submission.

## Deployment of Apache SeaTunnel Server
Since SeaTunnel Web uses SeaTunnel Java client to submit tasks, a SeaTunnel server is required to run these tasks. Therefore, the first step is to deploy a SeaTunnel server. If you haven't yet started the SeaTunnel server, you can refer to the following steps for deployment and service start-up.

Download and deploy the SeaTunnel installation package to start the Zeta service. Obtain the SeaTunnel server package (version 2.3.3 or higher, as SeaTunnel Web supports only 2.3.3 and above versions of the SeaTunnel Zeta engine) from [https://seatunnel.apache.org/download](https://seatunnel.apache.org/download).

- **Download Connector Plugins:** This process also involves automatic download and installation of third-party dependencies, such as `seatunnel-hadoop3-3.1.4-uber-2.3.3-optional.jar`. Follow the instructions on [https://seatunnel.apache.org/docs/2.3.3/start-v2/locally/deployment](https://seatunnel.apache.org/docs/2.3.3/start-v2/locally/deployment) to download the connector plugins.
- **Repackaging:** After downloading the connector plugins, run `tar -zcvf apache-seatunnel-2.3.3.tar.gz apache-seatunnel-2.3.3` to repackage, creating a complete installation package `apache-seatunnel-2.3.3.tar.gz` for deploying the SeaTunnel Zeta engine server.
- **Cluster Deployment:** Copy `apache-seatunnel-2.3.3.tar.gz` to other server nodes for SeaTunnel Zeta cluster deployment. For details on deployment and starting the Zeta service, refer to [https://seatunnel.apache.org/docs/seatunnel-engine/deployment](https://seatunnel.apache.org/docs/seatunnel-engine/deployment). To start the Zeta service, use: `$SEATUNNEL_HOME/bin/seatunnel-cluster.sh -d`


## 2. Download and Unzip SeaTunnel Web

1. Download installation package `apache-seatunnel-web-1.0.0-bin.tar.gz` from [SeaTunnel Download Page](https://seatunnel.apache.org/download) or directly from [https://www.apache.org/dyn/closer.lua/seatunnel/seatunnel-web/1.0.0/apache-seatunnel-web-1.0.0-bin.tar.gz](https://www.apache.org/dyn/closer.lua/seatunnel/seatunnel-web/1.0.0/apache-seatunnel-web-1.0.0-bin.tar.gz).
2. unzip `tar -zxvf apache-seatunnel-web-1.0.0-bin.tar.gz` to get a directory named `apache-seatunnel-web-1.0.0-bin`.

## 3. Deploy SeaTunnel Zeta Client on SeaTunnel Web

If you're using SeaTunnel Web, you need to deploy a SeaTunnel Zeta client on the SeaTunnel Web node. (This step can be skipped if you're running both SeaTunnel Zeta service and SeaTunnel Web on the same node.)
- Copy `apache-seatunnel-2.3.3.tar.gz` to the SeaTunnel Web node and unzip it in the same path as the SeaTunnel Zeta server node.
- **Set Environment Variables:** On the SeaTunnel Web node, set `SEATUNNEL_HOME` as an environment variable, similar to the SeaTunnel Zeta server node.
    ```
    export SEATUNNEL_HOME=${seatunnel install path}
    export PATH=$PATH:$SEATUNNEL_HOME/bin
    ```
- Run `$SEATUNNEL_HOME/bin/seatunnel.sh --config $SEATUNNEL_HOME/config/v2.batch.config.template`. Successful completion of this job indicates that the Zeta client is deployed successfully.


## 4. Initialize Database for SeaTunnel Web Service
1.  Modify `apache-seatunnel-web-1.0.0-bin/script/seatunnel_server_env.sh` to set the database address, port, username, and password. Example:
    ```
    export HOSTNAME="localhost"
    export PORT="3306"
    export USERNAME="root"
    export PASSWORD="123456"
    ```
2. **Install MySQL Client:** On the current node, install `mysql-client` using `sudo apt install mysql-client`.
3. Execute `sh apache-seatunnel-web-1.0.0-bin/script/init_sql.sh`. A successful run without errors indicates successful initialization. (Alternatively, manually copy `/script/seatunnel_server_mysql.sql` to the database and execute the script.)


## 5. Download DataSource Plugins
1. Download the **[`download_datasource.sh`](./download_datasource.sh)** script and place it in the `apache-seatunnel-web-1.0.0-bin/bin` directory. Run the command `sh download_datasource.sh`. This will automatically download the necessary JAR packages for various data source connections required for web operation to the `libs` directory.

   ![DataSource Plugins](https://github.com/apache/seatunnel/assets/15833811/955a5cb9-4dc9-4d21-9e1a-93557e46bcdf)

2. After downloading, ensure that the MySQL driver is included in the `libs` directory. If not, manually download the MySQL driver to this directory, as SeaTunnel Web cannot start without it.


## 6. Configure the Application and Start SeaTunnel Web Backend Service

- Modify `apache-seatunnel-web-1.0.0-bin/conf/application.yml` with SeaTunnel database connection information (same as in `script/seatunnel_server_env.sh`).
    ```yaml
    url: jdbc:mysql://localhost:3306/seatunnel?useSSL=false&useUnicode=true&characterEncoding=utf-8&allowMultiQueries=true&allowPublicKeyRetrieval=true
    username: xxx
    password: xxx
    ```
- Copy `hazelcast-client.yaml` from `apache-seatunnel-2.3.3/config` to `apache-seatunnel-web-1.0.0-bin/conf/` and configure it, especially the cluster members' IP and port. Refer to [SeaTunnel Engine Client Configuration](https://seatunnel.apache.org/docs/seatunnel-engine/deployment#6-config-seatunnel-engine-client).
    ```yaml
    hazelcast-client:
      cluster-name: seatunnel
      properties:
          hazelcast.logging.type: log4j2
      network:
        cluster-members:
          - ip:5801
    ```
- Move `plugin-mapping.properties` from `apache-seatunnel-2.3.3/connectors` to the `apache-seatunnel-web-1.0.0-bin/conf/` directory.


## 7. Start SeaTunnel Web

1. Go to the `apache-seatunnel-web-1.0.0-bin` directory:
    ```
    cd apache-seatunnel-web-1.0.0-bin
    ```
2. Start the SeaTunnel Web backend service:
    ```
    sh bin/seatunnel-backend-daemon.sh start
    ```
3. Visit UI [http://127.0.0.1:8801/ui/](http://127.0.0.1:8801/ui/) and log in with the default credentials (username: admin, password: admin). A successful login screen indicates successful deployment.
    ```
    ![Login UI](https://github.com/apache/dolphinscheduler/assets/15833811/39505fec-64bd-4e94-9f60-de505b4bb0cb)

    ```
