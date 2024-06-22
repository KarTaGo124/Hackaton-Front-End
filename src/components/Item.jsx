import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Item = ({data}) => {

  return (
    <div>
      {Object.keys(data).map(key => (
        <p key={key}>
          <strong>{key}:</strong> {data[key]}
        </p>
      ))}
    </div>
  );
}

export default Item;
