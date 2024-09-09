import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface UserFilter {
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface UserState {
  users: User[];
  filters: UserFilter;
}

const initialState: UserState = {
  users: [],
  filters: {
    name: '',
    username: '',
    email: '',
    phone: '',
  },
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setFilter: (state, action: PayloadAction<UserFilter>) => {
      state.filters = action.payload;
    },
  },
});

export const selectFilteredUsers = (state: RootState) => {
  const { users, filters } = state.users;
  return users.filter((user) =>
    (filters.name === '' || user.name.toLowerCase().includes(filters.name.toLowerCase())) &&
    (filters.username === '' || user.username.toLowerCase().includes(filters.username.toLowerCase())) &&
    (filters.email === '' || user.email.toLowerCase().includes(filters.email.toLowerCase())) &&
    (filters.phone === '' || user.phone.includes(filters.phone))
  );
};

export const { setUsers, setFilter } = usersSlice.actions;

const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
