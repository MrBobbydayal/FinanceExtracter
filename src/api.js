import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const uploadFiles = async (files) => {
  const formData = new FormData();

  for (let file of files) {
    formData.append("files", file);
  }

  const response = await axios.post(
    `${BASE_URL}/api/extract`,
    formData,
    {
      responseType: "blob",
    }
  );

  return response.data;
};
