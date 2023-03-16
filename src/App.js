import { useEffect, useState } from "react";
import axios from "axios";
import ListItem from "./components/ListItem";

const baseUrl = "http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com";

function App() {
  const [userList, setUserList] = useState(null);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [url, setUrl] = useState(`${baseUrl}/user/${page}/${size}/`);

  useEffect(() => {
    setIsLoading(true);
    try {
      axios.get(url).then(response => {
        setIsError(false);
        setUserList(response.data);
      });
    } catch (error) {
      console.log("Error fetching data: ", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  if (!userList) return null;

  isLoading && (
    <div className='container'>
      <h1>Loading...</h1>
    </div>
  );
  isError && (
    <div className='container'>
      <h1>error happend</h1>
    </div>
  );

  return (
    <div className='container'>
      <div className='users'>
        <div className='list'>
          {userList.list.map(listItem => {
            return (
              <ListItem
                key={listItem.id}
                {...listItem}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
