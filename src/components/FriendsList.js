import React, { useState, useEffect } from "react";
import MyAPIService from "../services/MyAPIService";
import ListComponent from "./ListComponent";

const FriendsList = ({ userId }) => {
  const [friendsList, setFriendsList] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const size = 12;

  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (!noData) {
        loadFriendsList(page);
      }
    }
  };

  useEffect(() => {
    loadFriendsList(page);
  }, []);

  useEffect(() => {
    setFriendsList([]);
  }, [userId]);

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

  if (!friendsList) return null;

  return (
    <ListComponent
      isLoading={isLoading}
      noData={noData}
      list={friendsList}
    />
  );
};

export default FriendsList;
