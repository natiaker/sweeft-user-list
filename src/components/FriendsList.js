import React, { useState, useEffect } from "react";
import MyAPIService from "../services/MyAPIService";
import ListItem from "./ListItem";

const FriendsList = ({ userId }) => {
  const [userList, setUserList] = useState([]);
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
        loadUserList(page);
      }
    }
  };

  useEffect(() => {
    loadUserList(page);
  }, []);

  function loadUserList(page) {
    setIsLoading(true);
    setTimeout(() => {
      MyAPIService.getList(page, `/user/${userId}/friends/${page}/${size}`)
        .then(res => {
          setPage(page + 1);
          setUserList([...userList, ...res]);
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

  if (!userList) return null;

  return (
    <div
      className='container'
      style={{ width: "1000px" }}
    >
      <div className='users'>
        <div
          className='list'
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {userList.map(listItem => {
            return (
              <ListItem
                key={listItem.id}
                {...listItem}
              />
            );
          })}
        </div>
      </div>
      {isLoading && <h1>Loading...</h1>}
      {noData && <h1>No more data</h1>}
    </div>
  );
};

export default FriendsList;
