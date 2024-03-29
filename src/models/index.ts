export interface CommonResponse<DataType> {
  statusCode: number;
  data: DataType;
  message: string;
}

export interface IdResponse {
  _id: string;
}
