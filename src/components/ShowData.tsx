import React from "react";
import { useEffect, useState } from "react";
import IDataList from "../model/IDataList ";
import { getDataFromServer } from "../service/menu";
import ExpenseTracker from "./ExpenseTracker";

const ShowData = () => {
  const [items, setItems] = useState<IDataList[]>([]);
  const [error, setError] = useState<any | null>(null);
  const [sum, setSum] = useState<number | null>(0);
  const [rahulSpent, setRahulSpent] = useState<number>(0);
  const [rameshSpent, setRameshSpent] = useState<number>(0);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getDataFromServer();
        setItems(data);
        calculateShares(data);
        // let newPurchase = {
        //       "payeeName": "Rahul",
        //       "product": "water",
        //       "price": 100,
        //       "setDate": "2022-10-30",
        //   }
        // const purchasedData = await pushDataFromUser(newPurchase);
        // console.log(purchasedData);
      } catch (err) {
        console.log(err);
        setError(err);
      }
    };
    getData();
  }, [showForm]);

  const calculateShares = (data: IDataList[]) => {
    let rahulSpent: number = 0;
    let rameshSpent: number = 0;
    data.map((item) =>
      item.payeeName === "Rahul"
        ? (rahulSpent = rahulSpent + item.price)
        : (rameshSpent = rameshSpent + item.price)
    );
    setRahulSpent(rahulSpent);
    setRameshSpent(rameshSpent);
    setSum(rahulSpent + rameshSpent);
  };

  const getTableHeaders = () => (
    <>
      <div className="use-inline date header-color">Date</div>
      <div className="use-inline header-color">Product Purchased</div>
      <div className="use-inline price header-color">Price</div>
      <div className="use-inline header-color" style={{ width: 112 }}>
        Payee
      </div>
    </>
  );

  const renderTableData = (idx: number, user: IDataList) => (
    <div key={idx}>
      <div className="use-inline date">{user.setDate}</div>
      <div className="use-inline">{user.product}</div>
      <div className="use-inline price">{user.price}</div>
      <div className={`use-inline ${user.payeeName}`}>{user.payeeName}</div>
    </div>
  );

  return (
    <>
      <header id="page-Header">Expense Tracker</header>
      <button id="Add-Button" onClick={() => setShowForm(true)}>
        Add
      </button>
      {showForm && (
        <div className="form">
          <ExpenseTracker onClose={() => setShowForm(false)}></ExpenseTracker>
        </div>
      )}
      {getTableHeaders()}
      {items && items.map((user, idx) => renderTableData(idx, user))}
      <hr />
      <div className="use-inline ">Total: </div>
      <span className="use-inline total">{sum}</span> <br />
      <div className="use-inline ">Rahul paid: </div>
      <span className="use-inline total Rahul">{rahulSpent}</span> <br />
      <div className="use-inline ">Ramesh paid: </div>
      <span className="use-inline total Ramesh">{rameshSpent}</span> <br />
      <span className="use-inline payable">
        {rahulSpent > rameshSpent ? "Pay Rahul " : "Pay Ramesh"}
      </span>
      <span className="use-inline payable price">
        {" "}
        {Math.abs((rahulSpent - rameshSpent) / 2)}
      </span>
      {error && <strong>{error?.message}</strong>}
    </>
  );
};

export default ShowData;
