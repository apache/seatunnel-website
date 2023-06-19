import React from 'react';
import './index.less';
import Layout from '@theme/Layout';
import data from './data.json'

const getLastPath = path => {
	if (!path) { return '' }

	return path.substring(path.lastIndexOf('/') + 1)
}

export default function () {
	return (
		<Layout>
			<div className="main">
				<div>
					<h1>Download the SeaTunnel releases</h1>
					<p>Use the links below to download the Apache SeaTunnel from one of our mirrors.</p>
					<h2>SeaTunnel</h2>
					<table className="version-table">
						<thead>
						<tr>
							<th>Date</th>
							<th>Version</th>
							<th>Binary Distribution</th>
							<th>Source Code</th>
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
											<a href={item.binaryDistribution.bin}>[bin] {getLastPath(item.binaryDistribution.bin)}</a>
											<a href={item.binaryDistribution.asc}>[asc] {getLastPath(item.binaryDistribution.asc)}</a>
											<hr />
											<a href={item.binaryDistribution.sha512}>[sha512] {getLastPath(item.binaryDistribution.sha512)}</a>
										</td>
										<td>
											<a href={item.sourceCode.src}>[src] {getLastPath(item.sourceCode.src)}</a>
											<a href={item.sourceCode.asc}>[asc] {getLastPath(item.sourceCode.asc)}</a>
											<hr />
											<a href={item.sourceCode.sha512}>[sha512] {getLastPath(item.sourceCode.sha512)}</a>
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
