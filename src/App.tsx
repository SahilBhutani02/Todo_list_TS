import React, { useState } from "react";
import "./App.css";
import Table from "./components/table";
import InputForm from "./components/inputForm";

const App: React.FC = () => {
  const [isStatus, setIsStatus] = useState<boolean>(false);
  const [itemData, setItemData] = useState<
    Array<{ name: string; desc: string; status: boolean }>
  >([]);

  return (
    <div className="App">
      <InputForm isStatus={isStatus} setItemData={setItemData} />
      <Table
        itemData={itemData}
        setItemData={setItemData}
        setIsStatus={setIsStatus}
      />
    </div>
  );
};

export default App;
