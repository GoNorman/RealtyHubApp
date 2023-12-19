import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from "react-router-dom";
import Image from '../Image';
import Cookies from "js-cookie";


const BuildsList = () => {
    const [data, setData] = useState(null);
    const [hasResponse, setDataResponse] = useState(false);
    const [editBuildId, setEditBuildId] = useState(null);
    const API_URL = "http://localhost:8090/private";
    

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8090/public/home');
          setData(response.data);
          setDataResponse(true);
        } catch (error) {
          console.error("Error getting data:", error);
        }
      };
  
      if (!hasResponse) {
        fetchData();
      }
  
    }, [hasResponse, data]);

    const handleIditClick = (buildId) => {
        setEditBuildId(buildId);
    }

    const handleDeleteByIdClick = (buildId) => {
        try {
            const token = Cookies.get('token');
            axios.get(API_URL+"/delete_build/"+buildId,  {
                headers : {
                    'Authorization': `Bearer ${token}` 
                }
            });
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }
  
  
    if (data !== null && data !== undefined) {
      return (
        <div>
          <div className='header'>
            <a href="/partner_page">back</a>
          </div>
          {data.map(item => (
            <div key={item.id}>
              <p>component</p>
              <Link to={`/details/${item.id}`}>
                {item.title}
              </Link>
              <br />
              <br />
              <div className='data-builds-block'>
              <p>{item.title} {item.floor} {item.manager}</p>
              </div>
              <br />
              <div>
                  <Image build={item.imageList}/>
              </div>
              <br />
              <div className='change_button_build'>
                <button onClick={() => handleIditClick(item.id)}>Изменить</button>
                <br />
                <button onClick={() => handleDeleteByIdClick(item.id)}>Удалить объект</button>
              </div>
            </div>
          ))}
          {editBuildId && <Navigate to = {`/create_build/${editBuildId}`}/>}
        </div>
      );
    }
  
    return (
      <div className='general'>
        <div>
          <p>Loading...</p>
        </div>
      </div>);
}

export default BuildsList;