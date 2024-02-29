import md5 from "md5";

const API_BASE_URL = "https://api.valantis.store:41000/";
const API_PASSWORD = "Valantis";

export const getAuthorizationHeader = (password) => {
  const timestamp = new Date().toISOString().split("T")[0].replace(/-/g, "");
  const authorizationString = md5(`${password}_${timestamp}`);
  return { "X-Auth": authorizationString };
};

export const chunkArray = (array, chunkSize) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
};

export const fetchData = async (action, params) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthorizationHeader(API_PASSWORD),
      },
      body: JSON.stringify({ action, params }),
    });

    if (!response.ok) {
      console.warn(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.warn("Error fetching data:", error);
  }
};
