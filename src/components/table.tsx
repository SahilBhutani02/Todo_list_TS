import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import "./Table.css";
import { ItemProps, TableProps } from "../utlis/utils";
import {Information} from "../constants/constants"

const Table: React.FC<TableProps> = ({
  itemData,
  setIsStatus,
  setItemData,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredData, setFilteredData] = useState<ItemProps[]>([]);

  useEffect(() => {
    setItemData(itemData);
  }, [itemData, setItemData]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchValue) {
        handleFilter(searchValue);
      } else {
        setFilteredData([]);
      }
    }, 1000);

    return () => clearTimeout(debounce);
  }, [searchValue, itemData]);


  // search the value from the table
  const handleFilter = (search: string) => {
    const filteredRecords = itemData.filter((row) =>
      row.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filteredRecords);
  };


// reset the value to the initial data
  const handleReset = () => {
    setItemData(itemData);
    setSearchValue("");
  };

  // delete the particular item from the table
  const deleteItem = (row: ItemProps) => {
    const updatedData = itemData.filter((item) => item !== row);
    setItemData(updatedData);
  };

  // add a checkbox in the table cell
  const customizedCell = (row: ItemProps) => {
    return (
      <input
        type="checkbox"
        checked={row.status}
        onChange={(e) => handleCheck(e, row)}
      />
    );
  };

  // check that the task is completed or not 
  const handleCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    row: ItemProps
  ) => {
    const updatedData = itemData.map((item) =>
      item === row ? { ...item, status: e.target.checked } : item
    );
    setItemData(updatedData);
    setIsStatus(e.target.checked);
    if (e.target.checked) {
      alert("Task Completed");
    } else {
      alert("Undo Completed Task");
    }
  };

  // create columns in the table
  const columns: TableColumn<ItemProps>[] = [
    {
      name: "",
      cell: customizedCell,
      width: "100px",
    },
    {
      name: "S.No.",
      selector: (row, rowIndex) => (rowIndex !== undefined ? rowIndex + 1 : 0),
    },
    {
      name: "Title",
      selector: (row) => row.name,
    },
    {
      name: "Description",
      selector: (row) => row.desc,
    },
    {
      name: "Action",
      cell: (row) => (
        <button onClick={() => deleteItem(row)} className="delete-btn">
          {Information.deleteBtn}
        </button>
      ),
    },
  ];


// add styling to the row after the task is completed
  const conditionalRowStyles = [
    {
      when: (row: ItemProps) => row.status,
      style: {
        backgroundColor: "lightgreen",
      },
    },
  ];

  return (
    <div className="table-container">
      <h1>{Information.tableHeading}</h1>
      {itemData.length > 0 && (
        <div className="table-input">
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button onClick={handleReset} className="reset-btn">
            {Information.resetBtn}
          </button>
        </div>
      )}
      <div className="data-table">
        <DataTable
          columns={columns}
          data={filteredData.length > 0 ? filteredData : itemData}
          fixedHeader
          pagination
          conditionalRowStyles={conditionalRowStyles}
        />
      </div>
    </div>
  );
};

export default Table;
