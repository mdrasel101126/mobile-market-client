import { useEffect, useState } from "react";

const useUser = (email) => {
  const [isUser, setIsUser] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(
        `https://mobile-market-server-delta.vercel.app/users/user/${email}`,
        {
          authorization: `Bearer ${localStorage.getItem(
            "mobile-master-sectret"
          )}`,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setIsUser(data.isUser);
          setIsUserLoading(false);
        });
    }
  }, [email]);
  return [isUser, isUserLoading];
};
export default useUser;
