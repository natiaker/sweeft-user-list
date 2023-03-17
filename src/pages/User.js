import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import FriendsList from "../components/FriendsList";

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
    <>
      <div style={{ display: "flex" }}>
        <img
          src={imageUrl}
          alt={`${name} ${lastName}`}
        />
        <div style={{ display: "flex" }}>
          <div className='info'>
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
            <h3>
              {company.name} {company.suffix}
            </h3>
            <p>City: {address.city}</p>
            <p>Country: {address.country}</p>
            <p>State: {address.state}</p>
            <p>Street Address: {address.streetAddress}</p>
            <p>ZIP: {address.zipCode}</p>
          </div>
        </div>
      </div>
      <h2>Friends:</h2>
      <FriendsList userId={userId} />
    </>
  );
};

export default User;
