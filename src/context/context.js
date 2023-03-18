import React, { useContext, useState } from "react";
import MyAPIService from "../services/MyAPIService";
import { useParams } from "react-router-dom";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [friendsList, setFriendsList] = useState([]);
  const size = 12;
  const { userId } = useParams();

  function loadFriendsList(page) {
    setIsLoading(true);
    setTimeout(() => {
      MyAPIService.getList(page, `/user/${userId}/friends/${page}/${size}`)
        .then(res => {
          console.log("friendslist: ", friendsList);
          setPage(page + 1);
          console.log("res ", res);
          setFriendsList([...friendsList, ...res]);
          if (res.length === 0) setNoData(true);
        })
        .catch(error => {
          console.log("Error fetching data: ", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1500);
  }

  return (
    <AppContext.Provider
      value={{
        page,
        isLoading,
        noData,
        size,
        friendsList,
        userId,
        setFriendsList,
        setPage,
        setIsLoading,
        setNoData,
        loadFriendsList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
