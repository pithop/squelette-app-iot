import React, { useEffect, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Table, Pagination } from 'react-bootstrap';
import { format } from 'date-fns';

const DisplayData = ({ path }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, path);
    onValue(dataRef, (snapshot) => {
      const rawData = snapshot.val();
      if (rawData) {
        const keys = Object.keys(rawData);
        const formattedData = keys.map((key) => ({
          experimentation: rawData[key]?.experimentation,
          scale: rawData[key]?.scale,
          sensor1: parseFloat(rawData[key]?.sensor1),
          sensor2: parseFloat(rawData[key]?.sensor2),
          sensor3: parseFloat(rawData[key]?.sensor3),
          sensor4: parseFloat(rawData[key]?.sensor4),
          time: rawData[key]?.time ? format(new Date(rawData[key].time), 'dd/MM/yyyy à HH:mm:ss') : '',
        }));
        setData(formattedData);
      }
    });
  }, [path]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Experimentation',
        accessor: 'experimentation',
      },
      {
        Header: 'Scale',
        accessor: 'scale',
      },
      {
        Header: 'Sensor 1',
        accessor: 'sensor1',
      },
      {
        Header: 'Sensor 2',
        accessor: 'sensor2',
      },
      {
        Header: 'Sensor 3',
        accessor: 'sensor3',
      },
      {
        Header: 'Sensor 4',
        accessor: 'sensor4',
      },
      {
        Header: 'Time',
        accessor: 'time',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  return (
    <div>
      <Table striped bordered hover {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage} />
        <Pagination.Item active>{pageIndex + 1}</Pagination.Item>
        <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
      </Pagination>
    </div>
  );
};

export default DisplayData;
