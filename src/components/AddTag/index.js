import React, { useState, useRef, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';

import { DashTag, InputTag } from './styles';

function AddTag({ onAdd, id }) {
  const [inputIsVisible, setInputIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  function handleInputConfirm() {
    setInputIsVisible(false);
    setInputValue('');
    onAdd({ value: inputValue, id });
  }

  function showInput() {
    setInputIsVisible(true);
  }

  useEffect(() => {
    if (inputIsVisible) {
      inputRef.current.focus();
    }
  }, [inputIsVisible]);

  return inputIsVisible ? (
    <InputTag
      size="small"
      ref={inputRef}
      value={inputValue}
      onChange={handleInputChange}
      onBlur={handleInputConfirm}
      onPressEnter={handleInputConfirm}
    />
  ) : (
    <DashTag onClick={showInput}>
      <PlusOutlined /> Add Tag
    </DashTag>
  );
}

export default AddTag;
