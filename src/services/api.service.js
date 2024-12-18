const API_URL = import.meta.env.VITE_DATA_API_URL;

export const apiService = {
  async getKioskMenuData(currentMenuLastUpdateDateTime) {

    try {
      const response = await fetch(`${API_URL}/getKioskMenu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          currentMenuLastUpdateDateTime: currentMenuLastUpdateDateTime,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.d;
    } catch (error) {
      console.error("Menu fetch error:", error);
      throw error;
    }
  },
  async saveSaleOrder(orderData) {
    const response = await fetch(`${API_URL}/saveSaleOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ so: orderData }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.d;
  },
  async getOrderStatus(orderId) {
    const response = await fetch(`${API_URL}/getOrderStatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ orderId: orderId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.d;
  },
  async cancelOrder(orderId) {
    const response = await fetch(`${API_URL}/cancelOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ orderId: orderId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    await response.json();
  },
};
