export const success = (data: any, message: string = '操作成功') => {
  return {
    code: 200,
    data,
    message,
  };
};

export const fail = (message: string = '操作失败') => {
  return {
    code: -1,
    message,
  };
};

export function wrapperResponse(p, msg) {
  return p.then((data) => success(data, msg)).catch((err) => fail(err));
}
