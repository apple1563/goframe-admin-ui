import type { AddOtpParam, GetCheckOtpRes, GetOtpRes, StatusOtpParam, ValidateOtpParam } from '@/api/model/otpModel';
import { OtpCheckByUsernameParam } from '@/api/model/otpModel';
import { request } from '@/utils/request';

const Api = {
  Otp: '/otp',
  OtpStatus: '/otp/status',
  OtpCheck: '/otp/check',
  OtpCheckByUsername: '/otp/username',
  OtpValidate: '/otp/validate',
};

export function addOtp(data: AddOtpParam) {
  return request.post<null>({
    url: Api.Otp,
    data,
  });
}

export function updateOtp(data: AddOtpParam) {
  return request.put<null>({
    url: Api.Otp,
    data,
  });
}

export function getOtp() {
  return request.get<GetOtpRes>({
    url: Api.Otp,
  });
}

export function getOtpCheck() {
  return request.get<GetCheckOtpRes>({
    url: Api.OtpCheck,
  });
}

export function getOtpCheckByUsername(data: OtpCheckByUsernameParam) {
  return request.get<GetCheckOtpRes>({
    url: Api.OtpCheckByUsername,
    params: data,
  });
}

export function updateOtpStatus(data: StatusOtpParam) {
  return request.put<null>({
    url: Api.OtpStatus,
    data,
  });
}

export function otpValidate(data: ValidateOtpParam) {
  return request.post<null>({
    url: Api.OtpValidate,
    data,
  });
}
