import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { DbsName } from 'src/constants/db';
import { db } from 'src/firebase/firebase';
import { useAppSelector } from 'src/store/hooks';
import './index.scss';
import { useTable } from 'react-table';
import { updateDefaultClause } from 'typescript';

const EditTest: React.FC = () => {
  const [data, setData] = useState([
    {
      No: 1,
      Question: 'cau hoi 1 ?',
      Answer1: 'Male',
      Answer2: 'Male',
      Answer3: 'Male',
      Answer4: 'Male',
      CorrectAnswer: 'Male',
    },
  ]);
  useEffect(() => {
    const datas = [
      {
        No: 1,
        Question: 'cau hoi 1 ?',
        Answer1: 'Male',
        Answer2: 'Male',
        Answer3: 'Male',
        Answer4: 'Male',
        CorrectAnswer: 'Male',
      },
      {
        No: 1,
        Question: 'cau hoi 1 ?',
        Answer1: 'Male',
        Answer2: 'Male',
        Answer3: 'Male',
        Answer4: 'Male',
        CorrectAnswer: 'Male',
      },
      {
        No: 1,
        Question: 'cau hoi 1 ?',
        Answer1: 'Male',
        Answer2: 'Male',
        Answer3: 'Male',
        Answer4: 'Male',
        CorrectAnswer: 'Male',
      },
      {
        No: 1,
        Question: 'cau hoi 1 ?',
        Answer1: 'Male',
        Answer2: 'Male',
        Answer3: 'Male',
        Answer4: 'Male',
        CorrectAnswer: 'Male',
      },
      {
        No: 1,
        Question: 'cau hoi 1 ?',
        Answer1: 'Male',
        Answer2: 'Male',
        Answer3: 'Male',
        Answer4: 'Male',
        CorrectAnswer: 'Male',
      },
      {
        No: 1,
        Question: 'cau hoi 1 ?',
        Answer1: 'Male',
        Answer2: 'Male',
        Answer3: 'Male',
        Answer4: 'Male',
        CorrectAnswer: 'Male',
      },
    ];
    setData(datas);
  }, []);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th rowSpan={2} className="col-No">
              No.
            </th>
            <th rowSpan={2} className="col-Question">
              Questions
            </th>
            <th colSpan={4}>Answers</th>
            <th rowSpan={2} className="col-Answer">
              Correct Answer
            </th>
          </tr>
          <tr>
            <th className="col-Answer">1</th>
            <th className="col-Answer">2</th>
            <th className="col-Answer">3</th>
            <th className="col-Answer">4</th>
          </tr>
        </thead>
        <tbody>
          {data.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.No}</td>
                <td>
                  <input
                    className="td-input"
                    type="text"
                    name="question"
                    id=""
                    value={val.Question}
                    onChange={(e) => {
                    val.Question = e.target.value;
                    setData([...data]);
                    }}
                  />
                </td>
                <td>{val.Answer1}</td>
                <td>{val.Answer2}</td>
                <td>{val.Answer3}</td>
                <td>{val.Answer4}</td>
                <td>{val.CorrectAnswer}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default EditTest;
