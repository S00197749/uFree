import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

function UpdateGroup(props) {
    const [showConfirmDeleteGroup, setShowConfirmDeleteGroup] = useState(false);

    const SubmitUpdateGroupForm = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData);

        const url = "https://schedule-functions.azurewebsites.net/api/UpdateGroup?code=I85av-XCpOPQhAMW9u5XTfU9FD678b7XxpUlsX-o6zZjAzFuN560Bg==";

        const data = {
            User_Id: props.user_Id
            , Group_Id: props.group.group_Id
            , Group_Name: payload.groupName
            , Group_Description: payload.groupDesc}

        await fetch(url, {
            method: 'POST',
            headers: {  "Content-Type": "application/json"  },
            body: JSON.stringify(data)
        }).then(()=>{
            console.log('Updated')
        })

        props.fetchGroupsData();
    }

    const DeleteGroup = async (e) => {

        const url = "https://schedule-functions.azurewebsites.net/api/RemoveGroup?code=rrMlHcCgrlFiAt7KOO5lkPmy9xwmnEj4NhtsNbpaFt2kAzFui2b46g==";
    
        const data = {
            User_Id: props.user_Id
            , Group_Id: props.group.group_Id}
    
        await fetch(url, {
            method: 'DELETE',
            headers: {  "Content-Type": "application/json"  },
            body: JSON.stringify(data)
        }).then(()=>{
            console.log('Updated')
        })
    
        props.fetchGroupsData();
      }

    return (
        <>
            <Modal.Body>
                <Nav className="justify-content-center" fill  variant="pills" defaultActiveKey="1">
                <Nav.Item>
                    <Nav.Link onClick={() => props.callShowSettings()} eventKey="1">Settings</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => props.callShowActivities()} eventKey="2">Activities</Nav.Link>
                </Nav.Item>
                </Nav>
                <Card body className="h-75">
                    <Form id='UpdateGroupForm' onSubmit={SubmitUpdateGroupForm}>
                        <Form.Group className="mb-3">
                            <Form.Label>Group Name</Form.Label>
                            <Form.Control name="groupName" type="text" defaultValue={props.group.group_Name} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control name="groupDesc" as='textarea' rows={4} maxlength="200" style={{resize:'none'}} type="text" defaultValue={props.group.group_Description} />
                        </Form.Group>
                    </Form>
                </Card>
            </Modal.Body>
            <Modal.Footer className='justify-content-start'>
                <div className='me-auto'>
                    <Button variant="danger" onClick={() => setShowConfirmDeleteGroup(true)}>
                        Delete Group
                    </Button>
                </div>
                <Button type='submit' form='UpdateGroupForm' variant="primary">
                    Save Changes
                </Button>
            </Modal.Footer>

            <Modal size="sm" backdrop="static" show={showConfirmDeleteGroup} onHide={() => setShowConfirmDeleteGroup(false)} animation={false} centered>
                <div style={{border: '1px solid black', borderRadius: '10px', backgroundColor: 'whitesmoke'}}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <h3 style={{textAlign: "center"}}>Are you sure you want to delete the following group: <br></br> "{props.group.group_Name}"?</h3>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowConfirmDeleteGroup(false)}>
                        Cancel
                        </Button>
                        <Button  onClick={() => DeleteGroup() + setShowConfirmDeleteGroup(false)} variant="danger">
                        Delete
                        </Button>         
                    </Modal.Footer>
                </div>       
            </Modal>
        </>
    );
}

export default UpdateGroup;