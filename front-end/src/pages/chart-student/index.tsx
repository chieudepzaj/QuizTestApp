import React, { useEffect, useState } from 'react';
import Header from 'src/layouts/header';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { collection, DocumentData, getDocs, Query, query, where, doc, getDoc } from '@firebase/firestore';
import { classesRef, db } from 'src/firebase/firebase';
import { DbsName } from 'src/constants/db';
import './styles.scss';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { async } from '@firebase/util';
Chart.register(...registerables);

const ChartStudent: React.FC = () => {
  const user = useAppSelector((state) => state.account.user);
  const [classes, setClasses] = useState<{ label: string; value: string }[]>([]);
  const [allResult, setAllResult] = useState<{ label: string; value: string }[]>([]);
  const [quizs, setQuizs] = useState<{ label: string; value: string }[]>([]);
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'score on a scale of 100 points',
        fill: false,
        borderColor: 'red',
        borderWidth: 1,
        data: [],
      },
    ],
  });

  const getClasses = async () => {
    const docSnap = await getDocs(classesRef);
    const classesData: any[] = [];
    docSnap.forEach((doc) => {
      classesData.push({
        label: doc.data().name,
        value: doc.id,
      });
    });
    setClasses(classesData);
    console.log(classes);

  };

  const getQuizs = async () => {
    const quizsCollection = await getDocs(collection(db, DbsName.QUIZ));
    const quizsData: any[] = [];
    quizsCollection.forEach((doc) => {
      quizsData.push({
        label: doc.data().name,
        value: doc.id,
      });
    });
    setQuizs(quizsData);
    console.log(quizs);
  };

  const getAllResult = async () => {
    // const resultSnap = await getDocs(query(collection(db, DbsName.RESULT), where('userID', '==', "${user.uid}")));
    const resultSnap = await getDocs(query(collection(db, DbsName.RESULT), where("userID", "==", "9MVFgQ6FhUQQBFv14A0QT1SC3yI2")));
    const resultData: any[] = [];
    resultSnap.forEach((doc) => {
      const score = doc.data().score;
      const totalScore = doc.data().totalScore;
      console.log(totalScore);
      const score100 = (score / totalScore) * 100;
      console.log(score100);

      resultData.push({
        label: quizs.find((quizArr) => quizArr.value === doc.data().quizID)?.label,
        value: score100,
      });
    });
    setAllResult(resultData);
    console.log(allResult);
  };

  useEffect(() => {
    getClasses();
    console.log(classes);

  }, []);

  useEffect(() => {
    getQuizs();
    getAllResult();
  }, []);


  const state = {
    labels: ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5', 'Test 6'],
    datasets: [
      {
        label: 'score on a scale of 100 points',
        fill: false,
        borderColor: 'red',
        borderWidth: 1,
        data: [65, 59, 80, 81, 56, 100],
      },
    ],
  };

  return (
    <>
      <Header />
      <div className="container-chart">
        <h2>
          <strong>Overall Result Chart:</strong>
        </h2>
        <div className="info-user">
          <p>Name:  {user.fullname}</p>
          <p>Class:{classes.find((classInfo) => classInfo.value === user.classID)?.label}
          </p>
        </div>
        <div className="chart">
          <Line data={state}></Line>
        </div>
      </div>
    </>
  );
};

export default ChartStudent;
