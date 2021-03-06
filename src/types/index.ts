export enum APIRequestStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

export type ApiUserData = {
  id: string;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type UserData = {
  id: string;
  name: string;
  username: string;
  email: string;
  city: string;
  zipcode: string;
  street: string;
  phone: string;
  website: string;
  company: string;
  comment: string;
};

export type SortState = 'company' | 'city';

export type UserInput = Omit<UserData, 'id' | 'company'>;

export type InputTypes = 'text' | 'tel' | 'email';
