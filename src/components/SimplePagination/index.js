import React from 'react';

import { Container, PageButton } from './styles';

function SimplePagination({ show, currentPage, hasMore, onPageChange }) {
  const previousIsDisabled = currentPage <= 1;

  return show ? (
    <Container>
      <PageButton
        disabled={previousIsDisabled}
        onClick={() => onPageChange(-1)}
      >
        Previous
      </PageButton>
      <PageButton disabled={!hasMore} onClick={() => onPageChange(1)}>
        Next
      </PageButton>
    </Container>
  ) : null;
}

export default SimplePagination;
