import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dataPreview.css';
import { Button } from '@chakra-ui/react';

const DataPreview = () => {
  const [data, setData] = useState();
  const getData = async () => {
    try {
      const { data } = await axios.get('http://localhost:3004/personalDetails');
      setData(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return <Button>ShowData</Button>;
};
export default DataPreview;
