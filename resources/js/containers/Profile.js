import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const Profile = ({ match }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get(`/api/users/${match.params.username}`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.response);
        setLoading(false);
      });
  }, []);

  if (loading) return null;
  if (error && error.status === 404) return <Redirect to="/404" />;
  return (
    <div>
      <h1>Profile - {data.username}</h1>
    </div>
  );
};

export default Profile;
