import { useState } from 'react';
import axios from 'axios';

const DataFormatter = () => {
  const [inputData, setInputData] = useState('');
  const [formattedData, setFormattedData] = useState([]);
  const [isTransferEnabled, setIsTransferEnabled] = useState(false);

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const formatData = () => {
    const lines = inputData.split('\n').slice(1);
    const formatted = lines.map(line => {
      const parts = line.split(',');
      const price = parseFloat(parts[0]) / 10000;
      return { price: parseFloat(price.toFixed(2)), name: parts[1].replace(/"/g, '') };
    });
    setFormattedData(formatted);
    setIsTransferEnabled(true);
  };

  const transferData = async () => {
    try {
      const response = await axios.post('/api/ajouterPrix', formattedData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFormattedData = (index) => {
    const newData = [...formattedData];
    newData.splice(index, 1);
    setFormattedData(newData);
  };

  return (
    <div>
      <textarea value={inputData} onChange={handleInputChange} />
      <button onClick={formatData}>Formatter les données</button>
      <button onClick={transferData} disabled={!isTransferEnabled}>Transférer dans la base de données</button>
      {formattedData.map((item, index) => (
        <div key={index}>
          {item.name} : {item.price}
          <button onClick={() => deleteFormattedData(index)}>Supprimer</button>
        </div>
      ))}
    </div>
  );
};

export default DataFormatter;