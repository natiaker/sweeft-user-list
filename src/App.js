import { useEffect, useState } from "react";
import ListItem from "./components/ListItem";
import Loading from "./components/Loading";
import MyAPIService from "./services/MyAPIService";
import { Container } from "./styles/Container.styled";

function App() {
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
      MyAPIService.getList(page, `/user/${page}/${size}/`)
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
    <Container>
      <div className='list'>
        {userList.map(listItem => {
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
}

export default App;
