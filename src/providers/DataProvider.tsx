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

const DataContextState = React.createContext<UsersData>({
  data: [],
  state: APIRequestStatus.Idle,
  error: null,
});

export const useDataContextState = () => {
  const context = React.useContext(DataContextState);
  if (context === undefined) {
    throw new Error('useDataContextState used outside of its Provider!');
  }
  return context;
};

type UserUpdateDTO = Omit<UserData, 'id'>;
type DataUpdater = (id: UserData['id'], DTO: UserUpdateDTO) => void;

const DataContextUpdater = React.createContext<DataUpdater>(
  (_id: UserId, _updateDTO: UserUpdateDTO) => {
    throw new Error('DataContextUpdater not implemented!');
  },
);

export const useDataContextUpdater = () => {
  const context = React.useContext(DataContextUpdater);
  if (context === undefined) {
    throw new Error('useDataContextUpdater used outside of its Provider!');
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

export const DataProvider: React.FunctionComponent = ({ children }) => {
  const [data, setData] = React.useState<UserData[]>([]);
  const [state, setState] = React.useState<APIRequestStatus>(
    APIRequestStatus.Idle,
  );
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchUsers = () => {
      setState(APIRequestStatus.Loading);
      fetch(API_ENDPOINT)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
          throw new Error(res.statusText);
        })
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
    <DataContextState.Provider value={contextValue}>
      <DataContextUpdater.Provider value={updateUserById}>
        {children}
      </DataContextUpdater.Provider>
    </DataContextState.Provider>
  );
};
