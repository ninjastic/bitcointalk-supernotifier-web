import React, { useEffect, useState, useCallback } from 'react';
import { Row, Col } from 'antd';
import { Container } from './styles';

import api from '../../services/api';

import Header from '../../components/Header';
import AddressesList from '../../components/AddressesList';
import AddressesSearch from '../../components/AddressesSearch';
import SimplePagination from '../../components/SimplePagination';

function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [addressesCount, setAddressesCount] = useState(0);
  const [searchAddress, setSearchAddress] = useState('');
  const [searchUsername, setSearchUsername] = useState('');
  const [showOnlyMultiples, setShowOnlyMultiples] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchAddresses = useCallback(
    async ({ multiAddresses, address, username, onlyMultiples, page }) => {
      const body = {};

      if (address) body.address = address;
      if (multiAddresses && multiAddresses.length)
        body.multiAddresses = multiAddresses;
      if (username) body.username = username;
      if (onlyMultiples) body.multiples = onlyMultiples;
      if (page) body.page = page;

      const response = await api.post('/addresses', body);

      return response.data;
    },
    []
  );

  const getAddresses = useCallback(
    async (search) => {
      const { address, username, onlyMultiples, page } = search || '';
      const { multiAddresses } = search || [];

      setLoading(true);

      const response = await fetchAddresses({
        multiAddresses,
        address,
        username,
        onlyMultiples,
        page: page || currentPage,
      });

      setAddresses(response.rows);
      setAddressesCount(response.count);
      setLoading(false);
    },
    [fetchAddresses, currentPage]
  );

  useEffect(() => {
    getAddresses();
  }, [getAddresses]);

  const getTaggedAddresses = ({ tags }) => {
    const taggedAdresses =
      JSON.parse(localStorage.getItem('@ninjastic/tags')) || [];

    const matched = taggedAdresses.filter((addr) =>
      tags.some((tag) => addr.tags.includes(tag))
    );

    const addressesToSearch = [];

    matched.forEach((addr) => {
      addressesToSearch.push(addr.id);
    });

    getAddresses({
      multiAddresses: addressesToSearch,
      username: searchUsername,
      onlyMultiples: showOnlyMultiples,
      page: 1,
    });
  };

  const handleSearch = () => {
    if (!selectedTags.length) {
      getAddresses({
        address: searchAddress,
        username: searchUsername,
        onlyMultiples: showOnlyMultiples,
        page: 1,
      });
    } else {
      getTaggedAddresses({
        address: searchAddress,
        username: searchUsername,
        onlyMultiples: showOnlyMultiples,
        page: 1,
        tags: selectedTags,
      });
    }
  };

  const handlePageChange = async (num) => {
    if (!loading) {
      setCurrentPage(currentPage + num);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <AddressesSearch
          selectedTags={selectedTags}
          searchAddress={searchAddress}
          searchUsername={searchUsername}
          onSearchAddress={setSearchAddress}
          onSearchUsername={setSearchUsername}
          onShowOnlyMultiples={setShowOnlyMultiples}
          onChangeTags={setSelectedTags}
          onHandleSearch={handleSearch}
          loading={loading}
        />
        <Row gutter={[16, 16]}>
          <AddressesList addresses={addresses} loading={loading} />
          <Col span={24}>
            <SimplePagination
              show={!loading && addresses.length}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              hasMore={addressesCount === 20}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Addresses;
