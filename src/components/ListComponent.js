import React from "react";
import ListItem from "./ListItem";
import Loading from "./Loading";
import { Container } from "../styles/Container.styled";

const ListComponent = ({ isLoading, list, noData }) => {
  return (
    <Container>
      <div className='list'>
        {list.map(listItem => {
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

export default ListComponent;
