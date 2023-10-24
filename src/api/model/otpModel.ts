export interface AddOtpParam {
  secret: string;
  code: string;
}

export interface GetOtpRes {
  secret: string;
  url: string;
}

export interface GetCheckOtpRes {
  isOpened: boolean;
  isSetted: boolean;
}

export interface StatusOtpParam {
  status: number;
}

export interface ValidateOtpParam {
  code: string;
  username: string;
}

export interface OtpCheckByUsernameParam {
  username: string;
}
