import { useEffect, useState } from "react";
import axios from "axios";
import ListItem from "./components/ListItem";

const baseUrl = "http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com";

function App() {
  const [userList, setUserList] = useState(null);
  const [page, setPage] = useState(2);
  const size = 100;
  const [isLoading, setIsLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    try {
      axios.get(`${baseUrl}/user/1/${size}/`).then(response => {
        setIsError(false);
        setUserList(response.data.list);
      });
    } catch (error) {
      console.log("Error fetching data: ", error);
      setIsError(true);
    }
  }, []);

  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (!noData) {
        setIsLoading(true);
        try {
          axios.get(`${baseUrl}/user/${page}/${size}/`).then(response => {
            setIsError(false);
            const newPage = page + 1;
            setPage(newPage);
            const newList = userList.concat(response.data.list);
            setUserList(newList);
            console.log(newList);
            if (response.data.list.length === 0) setNoData(true);
          });
        } catch (error) {
          console.log("Error fetching data: ", error);
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  if (!userList) return null;

  isError && (
    <div className='container'>
      <h1>error happend</h1>
    </div>
  );

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
}

export default App;
