class ApiResponse<T> {
    statusCode: number;
    data: T;
    message: string;
    success: boolean;
  
    constructor(statusCode: number, data: T, message = "Success") {
      this.statusCode = statusCode;
      this.data = data;
      this.message = message;
      this.success = statusCode < 400;
    }
  }
  
  export { ApiResponse };
  

// This class acts as an standardized wrapper for all of our api response 

// BENEFITS
// consistenct (every response will follow the same format)
// easier debugging (we always know what to expect in the response)
// scalability (when your API grows, having a consistent format makes client side code easier to manage)