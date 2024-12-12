// 错误码范围分配（模块化）
// 将错误码按模块分配范围，可以避免冲突，同时提升可读性。例如：
// 模块	错误码范围	描述
// 用户模块	1000-1999	用户相关的所有错误码
// 订单模块	2000-2999	订单相关的所有错误码
// 商品模块	3000-3999	商品相关的所有错误码
// 支付模块	4000-4999	支付相关的所有错误码
// 系统错误	5000-5999	系统级别的错误
// 特定错误 单独按照协议规定制定

// 错误码枚举
export enum ErrorCodes {
  // 1xx: 客户端错误
  USER_ALREADY_EXISTS = 1001, // 用户已存在
  INVALID_USERNAME = 1002, // 用户名格式不合法
  INVALID_PASSWORD = 1003, // 密码不符合要求
  LOGIN_ERROR = 1004, //登陆失败
  ROLE_IS_EXISTS = 1005, // 角色名重复

  // 4xx: 权限或资源问题
  PERMISSION_DENIED = 4001, // 权限不足
  RESOURCE_NOT_FOUND = 4002, // 资源未找到

  // 5xx: 服务端错误
  DATABASE_CONNECTION_FAILED = 5001, // 数据库连接失败
  SERVER_UNKNOWN_ERROR = 5002, // 未知服务器错误
}

// 错误码对应消息
export const ErrorMessages = {
  [ErrorCodes.USER_ALREADY_EXISTS]: "用户已存在",
  [ErrorCodes.INVALID_USERNAME]: "用户名格式不合法",
  [ErrorCodes.INVALID_PASSWORD]: "密码不符合要求",
  [ErrorCodes.LOGIN_ERROR]: "用户名或密码错误",
  [ErrorCodes.ROLE_IS_EXISTS]: "角色名重复",
  [ErrorCodes.PERMISSION_DENIED]: "权限不足",
  [ErrorCodes.RESOURCE_NOT_FOUND]: "资源未找到",
  [ErrorCodes.DATABASE_CONNECTION_FAILED]: "数据库连接失败",
  [ErrorCodes.SERVER_UNKNOWN_ERROR]: "未知服务器错误",
} as const;

// 获取错误消息
export const getErrorMessage = (code: ErrorCodes): string =>
  ErrorMessages[code] || "未知错误,请返回正确的code";
