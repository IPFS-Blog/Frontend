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
        const buyRecordResponse: BuyRecord[] = await MyTokenContract.methods
          .getBuyRecord()
          .call({ from: userAddress });
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

  //TODO: UI
  const [showBuyRecords, setShowBuyRecords] = useState<boolean>(false);
  const [showSellRecords, setShowSellRecords] = useState<boolean>(false);
  const [showTransferRecords, setShowTransferRecords] = useState<boolean>(false);
  const [showTakeRecords, setShowTakeRecords] = useState<boolean>(false);

  return (
    <div>
      <div className="m-5 p-5 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <button
          className="text-lg font-semibold text-gray-900 dark:text-white"
          onClick={() => setShowBuyRecords(!showBuyRecords)}
        >
          ETH換取AC紀錄
        </button>
        {showBuyRecords && (
          <ul className="mt-3 divide-y divide-gray-200 dark:divide-gray-700">
            {buyRecords.map((record, index) => (
              <li key={index}>
                {record.creationTime}：{record.token} AC
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="m-5 p-5 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <button
          className="text-lg font-semibold text-gray-900 dark:text-white"
          onClick={() => setShowSellRecords(!showSellRecords)}
        >
          AC換取ETH紀錄
        </button>
        {showSellRecords && (
          <ul className="mt-3 divide-y divide-gray-200 dark:divide-gray-700">
            {sellRecords.map((record, index) => (
              <li key={index}>
                {record.creationTime}：{record.token} ETH
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="m-5 p-5 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <button
          className="text-lg font-semibold text-gray-900 dark:text-white"
          onClick={() => setShowTransferRecords(!showTransferRecords)}
        >
          AC代幣支出紀錄
        </button>
        {showTransferRecords && (
          <ul className="mt-3 divide-y divide-gray-200 dark:divide-gray-700">
            {transferRecords.map((record, index) => (
              <li key={index}>
                <p>轉帳給：{record.to}</p>
                <p>- {record.token} AC</p>
                <p>{record.creationTime}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="m-5 p-5 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <button
          className="text-lg font-semibold text-gray-900 dark:text-white"
          onClick={() => setShowTakeRecords(!showTakeRecords)}
        >
          AC代幣收入紀錄
        </button>
        {showTakeRecords && (
          <ul className="mt-3 divide-y divide-gray-200 dark:divide-gray-700">
            {takeRecords.map((record, index) => (
              <li key={index}>
                來自：{record.from}，數量：{record.token} AC，時間：{record.creationTime}
              </li>
            ))}
            <li>
              <p>來自：0x3E745260690caDA43751DF0911b50EbC6d59B818</p>
              <p>+ 10 AC</p>
              <p>2023/07/20</p>
            </li>
            <li>
              <p>來自：0xCd49E7a7cCbC87AC631d52f63c34967744eD6dA7</p>
              <p>+ 10 AC</p>
              <p>2023/07/20</p>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
