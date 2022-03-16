import React from 'react';
import './index.less';
import Layout from '@theme/Layout';
import data from './data.json'

export default function () {
	return (
		<Layout>
			<div className="main">
				<div>
					<h1>Download the SeaTunnel(Incubating) releases</h1>
					<p>Use the links below to download the Apache SeaTunnel(Incubating) from one of our mirrors.</p>
					<p className="tip">Only source code releases are official Apache releases: Windows and Linux binary distributions are just for end user convenience.</p>
					<h2>SeaTunnel</h2>
					<table className="version-table">
						<thead>
						<tr>
							<th>Date</th>
							<th>Version</th>
							<th>Download</th>
							<th>Source Code(zip)</th>
							<th>Source Code(tar.gz)</th>
						</tr>
						</thead>
						<tbody>
						{
							data.map(item => {
								return (
									<tr key={item.version}>
										<td>{item.date}</td>
										<td>{item.version}</td>
										<td>
											<a href={item.download}>Incubator-SeaTunnel-{item.version}.zip</a>
										</td>
										<td>
											<a href={item.sourceCodeZip}>Incubator-SeaTunnel-{item.version}.zip</a>
										</td>
										<td>
											<a href={item.sourceCodeGz}>Incubator-SeaTunnel-{item.version}.tar.gz</a>
										</td>
									</tr>
								)
							})
						}
						</tbody>
					</table>
					<h2>Historical versions of non-Apache</h2>
					<a href="https://github.com/apache/incubator-seatunnel/releases">Historical versions</a>
				</div>
			</div>
		</Layout>
	);
}
