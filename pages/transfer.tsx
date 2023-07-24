import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { MyTokenFunction } from "@/helpers/Contract/MyTokenFunction";

// 定義 AC 代幣購買紀錄的類型
interface BuyRecord {
  token: string;
  creationTime: string;
}

// 定義 AC 代幣銷售紀錄的類型
interface SellRecord {
  token: string;
  creationTime: string;
}

// 定義 AC 代幣轉帳紀錄的類型
interface TransferRecord {
  to: string;
  token: string;
  creationTime: string;
}

// 定義 AC 代幣領取紀錄的類型
interface TakeRecord {
  from: string;
  token: string;
  creationTime: string;
}

export default function MyTokenRecords() {
  const [buyRecords, setBuyRecords] = useState<BuyRecord[]>([]);
  const [sellRecords, setSellRecords] = useState<SellRecord[]>([]);
  const [transferRecords, setTransferRecords] = useState<TransferRecord[]>([]);
  const [takeRecords, setTakeRecords] = useState<TakeRecord[]>([]);

  useEffect(() => {
    const fetchRecords = async () => {
      const web3 = new Web3(window.ethereum);
      const MyTokenContractabi = MyTokenFunction();
      const MyTokenContract = new web3.eth.Contract(MyTokenContractabi, process.env.NEXT_PUBLIC_MyTokenContractAddress);

      try {
        // TODO: 拿取帳號
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const userAddress = accounts[0];

        // Fetch buy records
        const buyRecordResponse: BuyRecord[] = await MyTokenContract.methods.getBuyRecord().call({ from: userAddress });
        setBuyRecords(buyRecordResponse);

        const sellRecordResponse: SellRecord[] = await MyTokenContract.methods
          .getSellRecord()
          .call({ from: userAddress });
        setSellRecords(sellRecordResponse);

        const transferRecordResponse: TransferRecord[] = await MyTokenContract.methods
          .getTransferRecord()
          .call({ from: userAddress });
        setTransferRecords(transferRecordResponse);

        const takeRecordResponse: TakeRecord[] = await MyTokenContract.methods
          .getTakeRecord()
          .call({ from: userAddress });
        setTakeRecords(takeRecordResponse);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    fetchRecords();
  }, []);

  return (
    <div>
      {/* Display buy records */}
      <h2>AC代幣購買紀錄：</h2>
      <ul>
        {buyRecords.map((record, index) => (
          <li key={index}>
            購買數量：{record.token} AC，時間：{record.creationTime}
          </li>
        ))}
      </ul>

      {/* Display sell records */}
      <h2>AC代幣銷售紀錄：</h2>
      <ul>
        {sellRecords.map((record, index) => (
          <li key={index}>
            銷售數量：{record.token} AC，時間：{record.creationTime}
          </li>
        ))}
      </ul>

      {/* Display transfer records */}
      <h2>AC代幣轉帳紀錄：</h2>
      <ul>
        {transferRecords.map((record, index) => (
          <li key={index}>
            轉帳給：{record.to}，數量：{record.token} AC，時間：{record.creationTime}
          </li>
        ))}
      </ul>

      {/* Display take records */}
      <h2>AC代幣領取紀錄：</h2>
      <ul>
        {takeRecords.map((record, index) => (
          <li key={index}>
            來自：{record.from}，數量：{record.token} AC，時間：{record.creationTime}
          </li>
        ))}
      </ul>
    </div>
  );
}
