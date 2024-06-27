import React, { useEffect, useState, useRef } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from './firebase'; // Assurez-vous que vous importez correctement la base de données initialisée
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { Modal } from 'react-bootstrap';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const DisplayData = ({ path }) => {
  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const poidsChartRef = useRef(null);
  const capacitance1ChartRef = useRef(null);
  const capacitance2ChartRef = useRef(null);

  useEffect(() => {
    const dataRef = ref(database, path);
    onValue(dataRef, (snapshot) => {
      const rawData = snapshot.val();
      if (rawData) {
        const formattedData = Object.keys(rawData).map((key) => ({
          id: key,
          ...rawData[key]
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
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          setModalData(row);
          setShowModal(true);
        },
      },
    },
    {
      dataField: 'poids',
      text: 'Poids',
    },
    {
      dataField: 'capacitance1',
      text: 'Capacitance 1',
    },
    {
      dataField: 'capacitance2',
      text: 'Capacitance 2',
    },
  ];

  const createChart = (ref, label, data, yLabel) => {
    const ctx = ref.current.getContext('2d');
    if (ref.current.chartInstance) {
      ref.current.chartInstance.destroy();
    }
    ref.current.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Value'],
        datasets: [{
          label: label,
          data: [data],
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: yLabel
            }
          }
        }
      }
    });
  };

  useEffect(() => {
    if (modalData) {
      createChart(poidsChartRef, 'Poids', modalData.poids, 'Poids (g)');
      createChart(capacitance1ChartRef, 'Capacitance 1', modalData.capacitance1, 'Capacitance 1');
      createChart(capacitance2ChartRef, 'Capacitance 2', modalData.capacitance2, 'Capacitance 2');
    }
  }, [modalData]);

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
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Details for {modalData ? modalData.id : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h5>Poids</h5>
            <canvas ref={poidsChartRef}></canvas>
          </div>
          <div>
            <h5>Capacitance 1</h5>
            <canvas ref={capacitance1ChartRef}></canvas>
          </div>
          <div>
            <h5>Capacitance 2</h5>
            <canvas ref={capacitance2ChartRef}></canvas>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DisplayData;
