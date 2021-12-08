import * as React from "react";
import routePath from 'src/constants/routePath';
import { useNavigate } from 'react-router-dom';

import { Column, useTable } from "react-table";
import Header from 'src/layouts/header';
import { collection, DocumentData, getDocs, Query, query, where } from '@firebase/firestore';
import { db } from 'src/firebase/firebase';
import { DbsName } from 'src/constants/db';

import "./styles.scss";

export default function Table() {
    const data = React.useMemo(
        () => [
            {
                col1: "Nguyen Van A",

                col2: "8"
            },

            {
                col1: "Nguyen Van B",

                col2: "9"
            },

            {
                col1: "Nguyen Van C",

                col2: "7"
            },
            {
                col1: "Nguyen Van D",

                col2: "10"
            }
        ],

        []
    );

    const columns = React.useMemo<Column<{ col1: string; col2: string }>[]>(() => [
        {
            Header: "Name",

            accessor: "col1" // accessor is the "key" in the data
        },

        {
            Header: "Score",

            accessor: "col2"
        }
    ],

        []
    );

    const {
        getTableProps,

        getTableBodyProps,

        headerGroups,

        rows,

        prepareRow
    } = useTable({ columns, data });

    return (
        <>

            <div className="background">
                <Header />
                <div className="table-container">
                    <table className="table-content" {...getTableProps()} >
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th
                                            {...column.getHeaderProps()}
                                            style={{
                                                borderBottom: "solid 1px white",

                                                background: "gray",

                                                color: "white",

                                                fontWeight: "bold"
                                            }}
                                        >
                                            {column.render("Header")}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>

                        <tbody {...getTableBodyProps()}>
                            {rows.map((row) => {
                                prepareRow(row);

                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => {
                                            return (
                                                <td
                                                    {...cell.getCellProps()}
                                                    style={{
                                                        padding: "10px",
                                                        borderBottom: "solid 1px white",

                                                        border: "solid 1px white",

                                                        background: "gray"
                                                    }}
                                                >
                                                    <a href="/chart-studdent"> {cell.render("Cell")} </a>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
}
