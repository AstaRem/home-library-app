  class DataHandleService {
    constructor() {
      this.data = [];
    }
  
    fetchData = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            const data = require("../data/Library.json");
            this.data = data;
            resolve(data);
          } catch (error) {
            reject(error);
          }
        }, 1000);
      });
    };
  
    getData = () => {
      return this.data;
    };
  
    setData = (newData) => {
      this.data = newData;
      console.log("updated data: " + JSON.stringify(this.data));
    };
  }
  
  export default DataHandleService;