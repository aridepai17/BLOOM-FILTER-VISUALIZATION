import React, { useState } from 'react';
import { XCircle, RefreshCw } from 'lucide-react';

const BloomFilterVisualization = () => {
  const [bitArray, setBitArray] = useState(Array(20).fill(0));
  const [checkBitArray, setCheckBitArray] = useState(Array(20).fill(0));
  const [addInput, setAddInput] = useState('');
  const [checkInput, setCheckInput] = useState('');
  const [addedElements, setAddedElements] = useState([]);
  const [checkResult, setCheckResult] = useState(null);

  const hashFunctions = [
    (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
      }
      return Math.abs(hash % 20);
    },
    (str) => {
      let hash = 5381;
      for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) + str.charCodeAt(i);
      }
      return Math.abs(hash % 20);
    },
    (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return Math.abs(hash % 20);
    }
  ];

  const addElement = () => {
    if (addInput && !addedElements.includes(addInput)) {
      const newBitArray = [...bitArray];
      hashFunctions.forEach(hashFunc => {
        const index = hashFunc(addInput);
        newBitArray[index] = 1;
      });
      setBitArray(newBitArray);
      setAddedElements([...addedElements, addInput]);
      setAddInput('');
    }
  };

  const removeElement = (element) => {
    setAddedElements(addedElements.filter(e => e !== element));
  };

  const checkElement = () => {
    const newCheckBitArray = Array(20).fill(0);
    const result = hashFunctions.every(hashFunc => {
      const index = hashFunc(checkInput);
      newCheckBitArray[index] = 1;
      return bitArray[index] === 1;
    });
    setCheckBitArray(newCheckBitArray);
    setCheckResult(result ? "Possibly in set" : "Definitely not in set");
  };

  const clearFilter = () => {
    setBitArray(Array(20).fill(0));
    setCheckBitArray(Array(20).fill(0));
    setAddedElements([]);
    setCheckResult(null);
  };

  const BitArrayDisplay = ({ bits, title, compareBits }) => (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">{title}:</h3>
      <div className="flex flex-wrap">
        {bits.map((bit, index) => (
          <div
            key={index}
            className={`bit w-10 h-10 flex items-center justify-center text-white font-bold rounded-md m-1 ${
              bit
                ? (compareBits && compareBits[index] === 0 ? 'bg-red-500' : 'bg-green-500')
                : 'bg-gray-300'
            }`}
          >
            {bit}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="header text-3xl font-bold text-center mb-6 text-gray-800">Bloom Filter Visualization</h2>
      <div className="input-group flex items-center space-x-2 mb-6">
        <input
          type="text"
          value={addInput}
          onChange={(e) => setAddInput(e.target.value)}
          className="input flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter an element to add"
        />
        <button onClick={addElement} className="button button-add bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
          Add Element
        </button>
        <button onClick={clearFilter} className="button-clear bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
          <RefreshCw size={24} />
        </button>
      </div>
      <BitArrayDisplay bits={bitArray} title="Bloom Filter Bit Array" />
      <div className="element-list flex flex-col space-y-2 mb-6">
        <h3 className="text-xl font-semibold mb-2">Added Elements:</h3>
        {addedElements.map((element, index) => (
          <div key={index} className="element-item flex items-center justify-between bg-gray-100 p-2 rounded-md shadow-sm">
            <span>{element}</span>
            <button onClick={() => removeElement(element)} className="text-red-500">
              <XCircle size={16} />
            </button>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Check Element:</h3>
        <div className="input-group flex items-center space-x-2">
          <input
            type="text"
            value={checkInput}
            onChange={(e) => setCheckInput(e.target.value)}
            className="input flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter an element to check"
          />
          <button onClick={checkElement} className="button bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
            Check
          </button>
        </div>
        {checkResult && <p className="check-result mt-4 font-semibold text-lg text-center">{checkResult}</p>}
      </div>
      <BitArrayDisplay bits={checkBitArray} title="Check Operation Bit Array" compareBits={bitArray} />
    </div>
  );
};

export default BloomFilterVisualization;
