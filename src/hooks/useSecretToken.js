import { useEffect, useState } from "react";

const useSecretToken = (email) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/jwt?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.token) {
            console.log(data);
            const sectretToken = data.token;
            localStorage.setItem("mobile-market-sectret", sectretToken);
            setToken(sectretToken);
          }
        });
    }
  }, [email]);
  return [token];
};

export default useSecretToken;
