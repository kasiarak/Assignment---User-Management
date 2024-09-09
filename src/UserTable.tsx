import React, { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, setFilter, selectFilteredUsers } from './store';
import { RootState } from './store';
import { Poppins } from 'next/font/google';
import styles from './styles/UserTable.module.css';

const poppins = Poppins({ subsets: ['latin'], weight: ['500'] });

const UserTable: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectFilteredUsers); 
  const filters = useSelector((state: RootState) => state.users.filters);

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    dispatch(setFilter({ ...filters, [field]: value }));
  };

  useEffect(() => {
    getUsers();
  }, [dispatch]);

  async function getUsers() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      dispatch(setUsers(data));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.container}>
      <form>
        <div className={styles.inputContainer}>
          <input
            className={poppins.className}
            value={filters.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleFilterChange('name', e.target.value)}
            placeholder="Name"
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            className={poppins.className}
            value={filters.username}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleFilterChange('username', e.target.value)}
            placeholder="Username"
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            className={poppins.className}
            value={filters.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleFilterChange('email', e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            className={poppins.className}
            value={filters.phone}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleFilterChange('phone', e.target.value)}
            placeholder="Phone"
          />
        </div>
      </form>
      <div className={styles.tableContainer}>
        <table className={poppins.className}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
