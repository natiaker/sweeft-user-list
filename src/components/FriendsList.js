import React, { useState, useEffect } from "react";
import MyAPIService from "../services/MyAPIService";
import { Container } from "../styles/Container.styled";
import ListItem from "./ListItem";
import Loading from "./Loading";

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

  function loadFriendsList(page) {
    setIsLoading(true);
    setTimeout(() => {
      MyAPIService.getList(page, `/user/${userId}/friends/${page}/${size}`)
        .then(res => {
          console.log("linkn: ", `/user/${userId}/friends/${page}/${size}`);
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
    <Container>
      <div
        className='list'
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {friendsList.map(listItem => {
          return (
            <ListItem
              key={listItem.id}
              {...listItem}
            />
          );
        })}
      </div>
      {isLoading && (
        <Loading
          type={"bars"}
          color={"blue"}
        />
      )}
      {noData && <h1>No more data</h1>}
    </Container>
  );
};

export default FriendsList;
