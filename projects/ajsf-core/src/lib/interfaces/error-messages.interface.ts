export interface ErrorMessage {
  message: string | Function | Object;
  code: string;
}

export interface ErrorMessages {
  [control_name: string]: ErrorMessage[];
}
