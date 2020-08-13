import React from 'react';
import { Tag } from 'antd';

function TagsList({ tags, id, onDeleteTag }) {
  const foundTag = tags.find((tag) => tag.id === id);

  return (
    <>
      {foundTag &&
        foundTag.tags.map((tag) => (
          <Tag
            key={tag}
            closable
            onClose={() => onDeleteTag({ id, value: tag })}
          >
            {tag}
          </Tag>
        ))}
    </>
  );
}

export default TagsList;
