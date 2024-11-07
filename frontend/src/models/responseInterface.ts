interface SuccessResponse<T> {
    statusCode: number;
    data: T;
  }
  
  interface ErrorResponse {
    statusCode: number;
    message: string;
  }

  interface PostResponse {
    statusCode: number;
    message: string;
  }
  interface QRResponse {
    statusCode: number;
    data: object;
  }
  
  type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;


  export type {ApiResponse,PostResponse,QRResponse}