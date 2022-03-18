import React from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import config from "../versions/config.json";
import Layout from '@theme/Layout';
import './index.less';

export default function () {
  const isBrowser = useIsBrowser();

  const language = isBrowser && location.pathname.indexOf('/zh-CN/') === 0 ? 'zh-CN' : 'en';
  const dataSource = config?.[language];

  return (
    <Layout>
      <div className="div-one">

        <br/>

        <h1>{ dataSource.title }</h1>
        <br/>
        <h3>{ dataSource.latestVersion }</h3>
        <p>{ dataSource.latestVersionExplain }</p>
        <table>
          <tbody>
          {
            dataSource.table.latestData.map((item, i) => (
              <tr key={ i } index={ i }>
                <td>{ item.versionLabel }</td>
                <td>
                  <a href={ item.docUrl }>
                    { dataSource.table.doc }
                  </a>
                </td>
                <td>
                  <a
                    target="_blank"
                    href={ item.downloadUrl }
                  >
                    { dataSource.table.release }
                  </a>
                </td>
                <td>
                  <a
                    target="_blank"
                    href={ "https://github.com/apache/incubator-seatunnel/tree/" + item.sourceTag }
                  >
                    { dataSource.table.source }
                  </a>
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>

        <br/>

        <h3>{ dataSource.nextVersion }</h3>
        <p>{ dataSource.nextVersionExplain }</p>
        <table>
          <tbody>
          {
            dataSource.table.nextData.map((item, i) => (
              <tr key={ i } index={ i }>
                <td>{ item.versionLabel }</td>
                <td>
                  <a href={ item.docUrl }>
                    { dataSource.table.doc }
                  </a>
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>

        <br/>

        <h3>{ dataSource.historyVersion }</h3>
        <p>{ dataSource.historyVersionExplain }</p>
        <table>
          <tbody>
          {
            dataSource.table.historyData.map((item, i) => (
              <tr key={ i } index={ i }>
                <td>{ item.versionLabel }</td>
                <td>
                  <a href={ item.docUrl }>
                    { dataSource.table.doc }
                  </a>
                </td>
                <td>
                  <a
                    target="_blank"
                    href={ item.downloadUrl }
                  >
                    { dataSource.table.release }
                  </a>
                </td>
                <td>
                  <a
                    target="_blank"
                    href={ "https://github.com/apache/incubator-seatunnel/tree/" + item.sourceTag }
                  >
                    { dataSource.table.source }
                  </a>
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
