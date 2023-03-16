import React from "react";

const ListItem = ({ name, lastName, prefix, title, imageUrl }) => {
  return (
    <div className='user-container'>
      <img
        src={imageUrl}
        alt={`${name} ${lastName}`}
      />
      <div>
        <h1>
          {prefix} {name} {lastName}
        </h1>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default ListItem;
