
export enum Campus {
  SEOUL = '서울',
  GUMI = '구미',
  GWANGJU = '광주',
  DAEJEON = '대전',
  BUULGYEONG = '부울경',
}

export interface CookieConfig {
  skinColor: string;
  eyeType: number;
  mouthType: number;
  accessory: number;
  shirtColor: string;
}

export interface Letter {
  id: string;
  toName: string;
  toCampus: Campus;
  toClass: string;
  fromName: string; // Hidden until Xmas
  content: string;
  isLong: boolean;
  cookieConfig: CookieConfig;
  timestamp: number;
  isRead: boolean;
}

export interface User {
  id: string;
  name: string;
  campus: Campus;
  classNum: string;
  mmId: string;
  isVerified: boolean;
}

export type AppScreen = 
  | 'LANDING' 
  | 'LOGIN' 
  | 'AUTH_INFO' 
  | 'AUTH_CODE' 
  | 'AUTH_SUCCESS'
  | 'HOME' 
  | 'MAKER' 
  | 'MY_OVEN' 
  | 'SENT_COOKIES' 
  | 'FRIEND_OVEN'
  | 'MY_PAGE';
