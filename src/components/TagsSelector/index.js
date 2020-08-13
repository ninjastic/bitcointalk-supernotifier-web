import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

function TagsSelector({ onChangeTags, allowClear }) {
  const addresses = JSON.parse(localStorage.getItem('@ninjastic/tags')) || [];

  const tags = [];

  addresses.forEach((address) => {
    address.tags.forEach((tag) => {
      if (tags.includes(tag)) {
        return;
      }

      tags.push(tag);
    });
  });

  return (
    <Select
      mode="multiple"
      placeholder="Tags"
      style={{ marginBottom: 10, width: '100%' }}
      size="large"
      allowClear
      onChange={onChangeTags}
    >
      {tags.map((tag) => (
        <Option key={tag}>{tag}</Option>
      ))}
    </Select>
  );
}

export default TagsSelector;
