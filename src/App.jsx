import { useState, useEffect } from "react";

const API_BASE_URL = "https://api.valantis.store:40000/";
const API_PASSWORD = "Valantis";

const getAuthorizationHeader = () => {
  const timestamp = new Date().toISOString().split("T")[0].replace(/-/g, "");
  const authorizationString = `md5(${API_PASSWORD}_${timestamp})`;
  console.log(authorizationString);
  return { "X-Auth": authorizationString };
};

const fetchData = async (action, params) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthorizationHeader(),
      },
      body: JSON.stringify({ action, params }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data.result;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchIds = async () => {
      const ids = await fetchData("get_ids", { offset: 0, limit: 5 });
      console.log(ids);
    };

    const fetchFilteredData = async () => {
      const filteredData = await fetchData("filter", { price: 17500.0 });
      console.log(filteredData);
      setData(filteredData);
    };

    fetchIds();
    fetchFilteredData();
  }, []);

  return (
    <div>
      <h1> API Data: </h1>
      <ul>
        {data.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
