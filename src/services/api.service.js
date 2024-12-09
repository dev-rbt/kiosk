const API_URL = "https://srv7.robotpos.com/kiosk2025/kioskService.asmx";
//const API_URL = "http://localhost:65147/kioskService.asmx";
//const API_URL = 'http://localhost/tabletservice/kioskService.asmx';
//const API_URL = 'http://192.168.2.148/tabletservice/kioskService.asmx';

export const apiService = {
  async getKioskMenuData() {
    try {
      const response = await fetch(`${API_URL}/getKioskMenu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
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
    try {

      
      const response = await fetch(`${API_URL}/saveSaleOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({so: orderData})
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
};
