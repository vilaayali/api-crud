import React, { useState, useEffect } from 'react'
// import Table from 'react-bootstrap/Table';
// import Container from "react-bootstrap/Container";
import { Button, Table, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import PopUp from './popUp';
import FormPopUp from './InputField';


function TableData({ Data, DeleteUser, EditUser, AddUser }) {
    const [Show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [userPop, setUserPop] = useState(false)
    const [selectedId, setSelectedId] = useState(null);
    const [formState, setFormState] = useState("")

    const formIsEmpty = !formState.name || !formState.email || !formState.username || !formState.city || !formState.website;




    //Handel Delete Function and Cancel btn
    const handelDelete = (id) => {
        setSelectedId(id)
        setShow(true);
    }

    const handelClick = () => {
        DeleteUser(selectedId);
        setShow(false);
    }

    const handelCancel = () => {
        setShow(false);//For Delete Popup
        setShowEdit(false)//For Edit Form Pop field
        setUserPop(false);//For userpop Remove
    }

    //Handel Add new User 
    const handelAddNewUder = () => {
        setUserPop(true)
    }

    // on Submit This Function will run and Add data into the User Table 
    const handleAddSubmit = () => {
        if (formIsEmpty) {
            alert("Please fill out all fields.");
            return;
        }
        const newUser = {
            name: formState.name,
            email: formState.email,
            username: formState.username,
            address: { city: formState.city },
            website: formState.website,
        };
        AddUser(newUser);
        setUserPop(false);
        setFormState({ name: "", email: "", username: "", city: "", website: "" });
    };


    //HnadelEdit Function
    const handleEdit = () => {
        setShowEdit(true);
    }

    const handleEditSubmit = () => {
        EditUser(selectedId);
        console.log("edit data",);

    }


    useEffect(() => {
        if (selectedId !== null) {
            console.log("Selected Id", selectedId);
        }
    }, [selectedId])


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    // console.log('New User Data', formState);
    // console.log('Main Data', Data);


    return (
        <>
            <Container className="mt-4">
                <h1 className='d-flex justify-content-center align-items-center'>Api Requests</h1>
                <Container className="mt-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="mb-4 text-center">User Data Table</h2>
                        <Button onClick={handelAddNewUder} variant="primary">
                            Add New User
                        </Button>
                    </div>
                </Container>
                <Table responsive="sm">
                    <thead className="table-dark">
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>City</th>
                            <th>Website</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Data.length > 0 ? (
                            Data.map((user, index) => (
                                <tr key={index}>
                                    {/* <td>{index + 1 ? index + 1 : "N/A"}</td>
                                    <td>{user.name ? user.name : "N/A"}</td>
                                    <td>{user.email ? user.email : "N/A"}</td>
                                    <td>{user.username ? user.username : "N/A"}</td>
                                    <td>{user.address?.city || "N/A"}</td>
                                    <td>{user.website ? user.website : "N/A"}</td>
                                    <td><FontAwesomeIcon onClick={() => handelDelete(user.id)} icon={faTrash} /></td>
                                    <span>|</span>
                                    <td><FontAwesomeIcon onClick={handleEdit} icon={faPenToSquare} /></td> */}
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.username}</td>
                                    <td>{user.address?.city || 'N/A'}</td>
                                    <td>{user.website}</td>
                                    <td><FontAwesomeIcon onClick={() => handelDelete(user.id)} icon={faTrash} /></td>
                                    <span>|</span>
                                    <td><FontAwesomeIcon onClick={handleEdit} icon={faPenToSquare} /></td>
                                </tr>
                            ))) :
                            <div>
                                <tb colSpan="7" className="text-center"
                                >Table Is Empty</tb>
                            </div>}

                    </tbody>
                </Table>
            </Container>

            {/* Pop for Conformation */}
            < PopUp
                message={`Are you sure you want to delete this data ${selectedId}?`}
                show={Show}
                onConform={handelClick}
                onCancel={handelCancel}
            />

            {/* Pop for Edit Input */}
            {Data && (
                <FormPopUp
                    onShow={showEdit}
                    onHide={handelCancel}
                    onSubmit={handleEditSubmit}
                    title="Fill Up the Form To Edit"
                    editBtnText={'Edit User'}
                    fields={[
                        { label: "Name", name: "name", value: Data.name, placeholder: "Name" },
                        { label: "Email", name: "email", value: Data.email, placeholder: "Email" },
                        { label: "Username", name: "username", value: Data.username, placeholder: "UserName" },
                        { label: "City", name: "city", value: Data.address?.city, placeholder: "City" },
                        { label: "Website", name: "website", value: Data.website, placeholder: "Website" },
                    ]}
                />
            )}


            {/* Add New User Data In Table */}
            {Data && (
                <FormPopUp
                    onChange={handleInputChange}
                    onShow={userPop}
                    onHide={handelCancel}
                    onSubmit={handleAddSubmit}
                    title="Add New User"
                    editBtnText={'Submit'}
                    fields={[
                        { label: "Name", name: "name", value: formState.name || "", placeholder: "Name" },
                        { label: "Email", name: "email", value: formState.email || "", placeholder: "Email" },
                        { label: "Username", name: "username", value: formState.username || "", placeholder: "Username" },
                        { label: "City", name: "city", value: formState.city || "", placeholder: "City" },
                        { label: "Website", name: "website", value: formState.website || "", placeholder: "Website" },
                    ]}
                />
            )}

        </>
    )
}

export default TableData
