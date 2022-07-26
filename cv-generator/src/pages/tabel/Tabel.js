import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useEffect } from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import './tabel.css';

const Tabel = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const { data } = await axios.get('http://localhost:3004/personalDetails');
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    try {
      console.log(id);
      await axios.delete(`http://localhost:3004/personalDetails/${id}`);
      getData();
    } catch (err) {
      console.log(err);
    }
  };
  const columns = [
    { name: 'First Name', selector: (row) => row.firstName, sortable: true },
    { name: 'Last Name', selector: (row) => row.lastName, sortable: true },
    { name: 'Email', selector: (row) => row.email, sortable: true },
    { name: 'Job Title', selector: (row) => row.jobTitle, sortable: true },
    {
      name: 'Action',
      id: 'view',
      accessor: (str) => 'view',
      cell: (row, index) => (
        <Flex justify="space-evenly" w="200px">
          <Text className="tabel-action" onClick={() => navigate(`/data-preview`)}>
            View
          </Text>
          <Text className="tabel-action">Edit</Text>
          <Text className="tabel-action" onClick={() => handleDelete(data[index].id)}>
            Delete
          </Text>
        </Flex>
      ),
      sortable: false,
      style: { justifyContent: 'center' },
      center: true,
    },
  ];
  return (
    <>
      <div className="tabel__container">
        <div className="tabel__title">
          <p>CV List</p>
          <Button colorScheme="blue" onClick={() => navigate(`/add-data`)}>
            Add Data
          </Button>
        </div>
        <div className="tabel__content">
          <DataTable columns={columns} data={data} pagination />
        </div>
      </div>
    </>
  );
};

export default Tabel;
