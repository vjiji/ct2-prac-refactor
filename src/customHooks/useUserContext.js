import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({ nickname: '', userId: 0 });
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken').split(' ')[1] : '';
  useEffect(() => {
    setUser({ nickname: email ? email.split('@')[0] : '', userId: token ? jwtDecode(token).userId : 0, email });
  }, [email]);

  return (
    <UserContext.Provider
      value={useMemo(() => ({
        user,
      }))}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
