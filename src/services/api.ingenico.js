const API_URL = import.meta.env.VITE_INGENICO_API_URL;

export const apiIngenicoService = {
  async printReceipt(jsonBody) {
    const response = await fetch(`${API_URL}/Provider/provider`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(jsonBody)
    });

    const data = await response.json();
    return data;
  },
};
