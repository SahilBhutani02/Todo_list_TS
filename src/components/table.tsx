import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import "./Table.css";
import { ItemProps, TableProps } from "../utlis/utils";

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

  const handleFilter = (search: string) => {
    const filteredRecords = itemData.filter((row) =>
      row.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filteredRecords);
  };

  const handleReset = () => {
    setItemData(itemData);
    setSearchValue("");
  };

  const deleteItem = (row: ItemProps) => {
    const updatedData = itemData.filter((item) => item !== row);
    setItemData(updatedData);
  };

  const customizedCell = (row: ItemProps) => {
    return (
      <input
        type="checkbox"
        checked={row.status}
        onChange={(e) => handleCheck(e, row)}
      />
    );
  };

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
          Delete
        </button>
      ),
    },
  ];

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
      <h1>Todo List</h1>
      {itemData.length > 0 && (
        <div className="table-input">
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button onClick={handleReset} className="reset-btn">
            Reset
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
