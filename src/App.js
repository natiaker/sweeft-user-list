import { useEffect, useState } from "react";
import ListComponent from "./components/ListComponent";
import MyAPIService from "./services/MyAPIService";

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
    <ListComponent
      isLoading={isLoading}
      noData={noData}
      list={userList}
    />
  );
}

export default App;
