import * as React from 'react';

const Day1 = () => {
  const [inputString, setInputString] = React.useState('');
  const [apidata, setApiData] = React.useState([]);
  const [filterData, setFilterData] = React.useState([]);
  const fetchdata = async () => {
    try {
      const response = await fetch(
        'https://66e471b2d2405277ed1453ba.mockapi.io/api/name-email/users',
      );
      const data = await response.json();
      setApiData(data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (inputString === '') {
      setFilterData([]);
    } else {
      const filtered = apidata.filter(user =>
        user.name.toLowerCase().includes(inputString.toLowerCase()),
      );
      setFilterData(filtered);
    }
  }, [apidata, inputString]);

  React.useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div>
      <h1>Search Data</h1>
      <input type="text" onChange={e => setInputString(e.target.value)} value={inputString} />
      <ul>
        {filterData.length && (
          <div>
            {filterData.map(user => {
              return <li>{`${user.name},${user.email} `}</li>;
            })}
          </div>
        )}
      </ul>
    </div>
  );
};
export default Day1;
