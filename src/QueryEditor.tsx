/*
 * Copyright 2021 Akamai Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import defaults from 'lodash/defaults';

import React, { ChangeEvent, PureComponent } from 'react';
import { QueryEditorProps } from '@grafana/data';
import { LegacyForms } from '@grafana/ui';
import { DataSource } from './DataSource';
import { defaultQuery, MyDataSourceOptions, MyQuery } from './types';

const { FormField } = LegacyForms;

type Props = QueryEditorProps<DataSource, MyQuery, MyDataSourceOptions>;

export class QueryEditor extends PureComponent<Props> {
  onDomainNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, domainName: event.target.value });
    // console.log('domainName: ' + event.target.value);
    if (event.target.value) {
      onRunQuery();
    }
  };

  onMetricNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, metricName: event.target.value });
    // console.log('metricName: ' + event.target.value);
    if (query.domainName) {
      onRunQuery();
    }
  };

  render() {
    const query = defaults(this.props.query, defaultQuery);
    const { domainName, metricName } = query;

    return (
      <div className="gf-form">
        <div>
          <FormField
            value={domainName || ''}
            labelWidth={8}
            inputWidth={20}
            placeholder="Enter domain name"
            onChange={this.onDomainNameChange}
            label="Domain"
            tooltip="Enter one domain name."
          />
          <FormField
            value={metricName || ''}
            labelWidth={8}
            inputWidth={20}
            onChange={this.onMetricNameChange}
            label="Metric Name"
            tooltip="Graphed metric's name. If empty, a name is generated."
          />
        </div>
      </div>
    );
  }
}
