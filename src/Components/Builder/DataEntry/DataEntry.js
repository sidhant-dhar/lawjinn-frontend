import React from 'react';
import testimage from '../../../assets/images/testimage.png';
import testimage2 from '../../../assets/images/testimage2.png';

const DataEntry = () => {
  return (
    <div>
      <img src={testimage} alt='testimage' className='img-fluid' />
      <img src={testimage2} alt='testimage' className='img-fluid' />
    </div>
  );
};

export default DataEntry;
