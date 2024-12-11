import { ErrorCodes, getErrorMessage } from 'src/constants/error-messages';

export const fail = (code: ErrorCodes) => {
  return {
    code,
    message: getErrorMessage(code),
  };
};

// 如果需要成功的结构，也可以在这里定义
export const success = (data?: any, message?: string) => {
  return {
    code: 200,
    data,
    message,
  };
};
export function wrapperResponse(p, msg) {
  return p.then((data) => success(data, msg)).catch((err) => fail(err));
}
