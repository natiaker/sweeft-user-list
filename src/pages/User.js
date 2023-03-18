import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import FriendsList from "../components/FriendsList";
import { Container } from "../styles/Container.styled";
import { UserInfo } from "../styles/User.styled";

const baseUrl = "http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com";

const User = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    try {
      axios.get(`${baseUrl}/user/${userId}`).then(response => {
        setUser(response.data);
      });
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  }, [userId]);
  if (!user) return null;

  const {
    id,
    name,
    lastName,
    prefix,
    title,
    imageUrl,
    jobArea,
    jobType,
    email,
    ip,
    company,
    address,
  } = user;
  return (
    <Container>
      <UserInfo>
        <img
          src={`${imageUrl}?v${userId}`}
          alt={`${name} ${lastName}`}
        />
        <div className='info'>
          <h2>Info</h2>
          <h3>
            {prefix} {name} {lastName}
          </h3>
          <p>{title}</p>
          <p>Email: {email}</p>
          <p>Ip Address: {ip}</p>
          <p>Job Area: {jobArea}</p>
          <p>Job Type: {jobType}</p>
        </div>
        <div className='address'>
          <h2>Address</h2>
          <h3>
            {company.name} {company.suffix}
          </h3>
          <p>City: {address.city}</p>
          <p>Country: {address.country}</p>
          <p>State: {address.state}</p>
          <p>Street Address: {address.streetAddress}</p>
          <p>ZIP: {address.zipCode}</p>
        </div>
      </UserInfo>
      <h2 style={{ alignSelf: "flex-start" }}>Friends:</h2>
      <FriendsList userId={userId} />
    </Container>
  );
};

export default User;
