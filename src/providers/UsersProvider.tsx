import * as React from 'react';
//
import { API_ENDPOINT } from '@/constants';
import { ApiUserData, UserData, APIRequestStatus } from '@/types';

type UserId = UserData['id'];

type UsersData = {
  data: UserData[];
  state: APIRequestStatus;
  error: null | string;
};

const UsersContextState = React.createContext<UsersData>({
  data: [],
  state: APIRequestStatus.Idle,
  error: null,
});

export const useUsersContextState = () => {
  const context = React.useContext(UsersContextState);
  if (context === undefined) {
    throw new Error('useUsersDataContextState used outside of its Provider!');
  }
  return context;
};

type UserUpdateDTO = Omit<UserData, 'id'>;
type UsersDataUpdater = (id: UserData['id'], DTO: UserUpdateDTO) => void;

const UsersContextUpdater = React.createContext<UsersDataUpdater>(
  (_id: UserId, _updateDTO: UserUpdateDTO) => {
    throw new Error('updateUserById not implemented!');
  },
);

export const useUsersUpdateContext = () => {
  const context = React.useContext(UsersContextUpdater);
  if (context === undefined) {
    throw new Error('useUsersDataContext used outside of its Provider!');
  }
  return context;
};

const mapResponseData = (user: ApiUserData): UserData => ({
  id: user.id,
  name: user.name,
  username: user.username,
  email: user.email,
  city: user.address.city,
  street: user.address.street,
  zipcode: user.address.zipcode,
  phone: user.phone,
  website: user.website,
  company: user.company.name,
  comment: '',
});

export const UsersDataProvider: React.FunctionComponent = ({ children }) => {
  const [data, setData] = React.useState<UserData[]>([]);
  const [state, setState] = React.useState<APIRequestStatus>(
    APIRequestStatus.Idle,
  );
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchUsers = () => {
      setState(APIRequestStatus.Loading);
      fetch(API_ENDPOINT)
        .then((res) => res.json())
        .then((json: ApiUserData[]) => {
          const usersData = json.map(mapResponseData);
          setData(usersData);
          setState(APIRequestStatus.Success);
          setError(null);
        })
        .catch((err) => {
          setData([]);
          setError(err);
          setState(APIRequestStatus.Error);
        });
    };
    fetchUsers();
  }, []);

  const updateUserById = React.useCallback(
    (id: UserId, updateDTO: UserUpdateDTO) => {
      const userIndex = data.findIndex((d) => d.id === id);
      if (userIndex === -1) {
        throw new Error('Trying to update a non-existing user');
      }
      const user = data[userIndex];
      setData([
        ...data.slice(0, userIndex),
        { ...user, ...updateDTO },
        ...data.slice(userIndex + 1),
      ]);
    },
    [data],
  );

  const contextValue = React.useMemo(
    () => ({ data, state, error }),
    [data, state, error],
  );

  return (
    <UsersContextState.Provider value={contextValue}>
      <UsersContextUpdater.Provider value={updateUserById}>
        {children}
      </UsersContextUpdater.Provider>
    </UsersContextState.Provider>
  );
};
