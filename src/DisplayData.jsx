import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const DisplayData = ({ path }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, 'hackathon');  // Changer le chemin ici pour 'hackathon'
    onValue(dataRef, (snapshot) => {
      const rawData = snapshot.val();
      if (rawData) {
        const formattedData = Object.keys(rawData).map((key) => ({
          id: key,
          value: rawData[key].value || 'N/A',
        }));
        setData(formattedData);
      }
    });
  }, [path]);

  const columns = [
    {
      dataField: 'id',
      text: 'ID',
      filter: textFilter(),
    },
    {
      dataField: 'value',
      text: 'Value',
    },
  ];

  return (
    <div>
      <BootstrapTable
        keyField="id"
        data={data}
        columns={columns}
        pagination={paginationFactory()}
        filter={filterFactory()}
        striped
        hover
        condensed
      />
    </div>
  );
};

export default DisplayData;
