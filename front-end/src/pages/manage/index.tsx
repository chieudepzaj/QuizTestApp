import * as React from "react";
import { Column, useTable } from "react-table";
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

  const columns = React.useMemo<Column<{col1: string;col2: string}>[]>(() => [
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
    <table {...getTableProps()} className="background">
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
  );
}
