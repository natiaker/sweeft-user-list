import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const baseUrl = "http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com";

const User = () => {
  const [user, setUser] = useState(null);
  const [isError, setIsError] = useState(false);
  const { userId } = useParams();
  console.log(useParams());

  useEffect(() => {
    try {
      axios.get(`${baseUrl}/user/${userId}`).then(response => {
        setIsError(false);
        setUser(response.data);
        console.log(response.data);
      });
    } catch (error) {
      console.log("Error fetching data: ", error);
      setIsError(true);
    }
  }, [userId]);
  if (!user) return null;

  isError && (
    <div className='container'>
      <h1>error happend</h1>
    </div>
  );

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
    <div>
      <img
        src={imageUrl}
        alt={`${name} ${lastName}`}
      />
      <div>
        <div className='info'>
          <h2>
            {prefix} {name} {lastName}
          </h2>
          <p>{title}</p>
          <p>Email: {email}</p>
          <p>Ip Address: {ip}</p>
          <p>Job Area: {jobArea}</p>
          <p>Job Type: {jobType}</p>
        </div>
        <div className='address'>
          <h2>
            {company.name} {company.suffix}
          </h2>
          <p>City: {address.city}</p>
          <p>Country: {address.country}</p>
          <p>State: {address.state}</p>
          <p>Street Address: {address.streetAddress}</p>
          <p>ZIP: {address.zipCode}</p>
        </div>
      </div>
    </div>
  );
};

export default User;
