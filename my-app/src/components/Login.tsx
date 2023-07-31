import React, { useState } from "react";

type User = {
  name: string;
  email: string;
};

const Login = () => {
  const [user, setUser] = useState<User>({} as User);

  const handleLogin = () => {
    return setUser({
      name: `Harshil`,
      email: `abc@xyz.com`,
    });
  };

  return (
    <>
      <div>User is {user.name}</div>
      <button onClick={handleLogin}>Login</button>
      <br />
    </>
  );
};

export default Login;
