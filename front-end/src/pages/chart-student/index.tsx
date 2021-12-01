import React, { useEffect, useState } from 'react';
import routePath from 'src/constants/routePath';
import Header from 'src/layouts/header';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { IQuizInfo, IQuizResult } from 'src/interfaces';
import { collection, DocumentData, getDocs, Query, query, where } from '@firebase/firestore';
import { db } from 'src/firebase/firebase';
import { DbsName } from 'src/constants/db';
import './styles.scss';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const state = {
  labels: ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5', 'Test 6'],
  datasets: [
    {
        label: "score on a scale of 100 points",
      fill: false,
      borderColor: 'red',
      borderWidth: 1,
      data: [65, 59, 80, 81, 56, 100],
    },
  ],
};

const ChartStudent: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container-chart">
        <h2>
          <strong>Overall Result Chart:</strong>
        </h2>
        <div className="info-user">
          <p>Name: Arto</p>
          <p>Class: A1</p>
        </div>
        <div className="chart">
          <Line data={state}></Line>
        </div>
      </div>
    </>
  );
};

export default ChartStudent;
