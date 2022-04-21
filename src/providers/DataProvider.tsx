import * as React from 'react';
//
import { API_ENDPOINT } from '@/constants';
import { ApiUserData, UserData, APIRequestStatus, UserInput } from '@/types';

type DataStatus = {
  state: APIRequestStatus;
  error: null | string;
};

const DataStatusContext = React.createContext<DataStatus>({
  state: APIRequestStatus.Idle,
  error: null,
});

export const useDataStatusContext = () => {
  const context = React.useContext(DataStatusContext);
  if (context === undefined) {
    throw new Error('useDataStatusContext used outside of its Provider!');
  }
  return context;
};

type UsersData = UserData[];

const DataContext = React.createContext<UsersData>([]);

export const useDataContext = () => {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error('useDataContext used outside of its Provider!');
  }
  return context;
};

type UserId = UserData['id'];
type DataUpdater = {
  getUserById: (id: UserId) => UserData | undefined;
  updateUserById: (id: UserId, DTO: UserInput) => void;
};

const DataContextUpdater = React.createContext<DataUpdater>({
  getUserById(_id: UserId) {
    throw new Error('getUserById not implemented!');
  },
  updateUserById(_id: UserId, _input: UserInput) {
    throw new Error('updateUserById not implemented!');
  },
});

export const useDataContextUpdater = () => {
  const context = React.useContext(DataContextUpdater);
  if (context === undefined) {
    throw new Error('useDataContextUpdater used outside of its Provider!');
  }
  return context;
};

const mapResponseData = (user: ApiUserData): UserData => ({
  id: String(user.id),
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

  const getUserById = React.useCallback(
    (id: UserId) => {
      return data.filter((d) => d.id === id).pop();
    },
    [data],
  );

  const updateUserById = React.useCallback(
    (id: UserId, input: UserInput) => {
      const userIndex = data.findIndex((d) => d.id === id);
      if (userIndex === -1) {
        throw new Error('Trying to update a non-existing user');
      }
      const user = data[userIndex];
      setData([
        ...data.slice(0, userIndex),
        { ...user, ...input },
        ...data.slice(userIndex + 1),
      ]);
    },
    [data],
  );

  const statusContextValue = React.useMemo(
    () => ({ state, error }),
    [state, error],
  );

  const dataContextValue = React.useMemo(() => data, [data]);

  const updaterContextValue = React.useMemo(
    () => ({
      getUserById,
      updateUserById,
    }),
    [getUserById, updateUserById],
  );

  return (
    <DataStatusContext.Provider value={statusContextValue}>
      <DataContext.Provider value={dataContextValue}>
        <DataContextUpdater.Provider value={updaterContextValue}>
          {children}
        </DataContextUpdater.Provider>
      </DataContext.Provider>
    </DataStatusContext.Provider>
  );
};
