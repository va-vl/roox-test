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

export type SortStateProp = {
  [key: string]: SortState;
};

export type ProfileInput = Pick<
  UserData,
  | 'name'
  | 'username'
  | 'email'
  | 'city'
  | 'street'
  | 'zipcode'
  | 'phone'
  | 'website'
  | 'comment'
>;

export type InputTypes = 'text' | 'tel' | 'email';
