import React, { useEffect, useState } from 'react';
import axios from "axios";
import Table from '../Components/Table';
import { faBehanceSquare } from '@fortawesome/free-brands-svg-icons';


function Api() {
    const [Data, setData] = useState([]);//Data Stored In local Storage 

    const baseUrl = "https://jsonplaceholder.typicode.com";

    //Functionality For First Api fetching 
    const fetchUsers = async () => {
        let apiUrl = baseUrl + "/users";
        console.log("url", apiUrl);

        try {
            const response = await axios.get(apiUrl);
            setData(response.data)
            localStorage.setItem('users', JSON.stringify(response.data))
        } catch (err) {
            console.log('Failed to get Userdata');
        }
    }




    //Functionallity for Store data in locall storage and updata data for there
    const DeleteUser = async (index) => {
        let delApiUser = `https://jsonplaceholder.typicode.com/users/${index}`;
        try {
            await axios.delete(delApiUser);
            const updateData = Data.filter((user) => user.id !== index);
            setData(updateData);
        }
        catch (err) {
            console.log("there is an error", err);
        }
    }




    //Add New User in the Table 
    const AddUser = async (userInfo) => {
        let editUsers = `https://jsonplaceholder.typicode.com/users`;
        try {
            const response = await axios.post(editUsers, userInfo);
            if (response.data) {
                setData((prevData) => [...prevData, response.data]);
            }
        } catch (err) {
            console.log('there is an error', err);

        }
    }




    // Edit function edit and Post items in locally 
    const EditUser = async (userInfo) => {
        try {
            const response = await axios.put(`${baseUrl}/users/${userInfo.id}`, userInfo);
            setData((prevData) =>
                prevData.map((user) => (user.id === userInfo.id ? response.data : user))
            );



        } catch (err) {
            console.log('there is an error', err);

        }
    }




    useEffect(() => {
        const storedData = localStorage.getItem('users');
        if (storedData) {
            setData(JSON.parse(storedData));
        } else {
            fetchUsers();
        }
    }, []);


    return <Table Data={Data} setData={setData} fetchUsers={fetchUsers} DeleteUser={DeleteUser} EditUser={EditUser} AddUser={AddUser} />;

}

export default Api






