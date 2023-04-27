import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

function CreateGroup(props) {
    const [showCreateGroup, setShowCreateGroup] = useState(false);
  
    const SubmitCreateGroupForm = async (e) => {
      e.preventDefault()
      const formData = new FormData(e.target);
      const payload = Object.fromEntries(formData);

      const url = "https://schedule-functions.azurewebsites.net/api/CreateGroup?code=RXJtbqPSpGBSBXrpLXzEvMpkE56T9HDGn7r5OsdJuR0AAzFuLjS-iQ==";

      const data = {
        User_Id: props.user_Id
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
      setShowCreateGroup(false)
    }

    return (
      <>
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip className='mt-2'>Create a Group</Tooltip>}>
          <a onClick={() => setShowCreateGroup(true)} href='#'>
            <img src="img/avatars/add-icon.png" class="mt-1 img-fluid rounded-circle" alt="User" />
          </a>
        </OverlayTrigger>
        
        <Modal backdrop="static" show={showCreateGroup} onHide={() => setShowCreateGroup(false)} animation={false} centered>
          <Modal.Header closeButton>
            <Modal.Title>Create Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                <Card body className="h-75">
                    <Form id='CreateGroupForm' onSubmit={SubmitCreateGroupForm}>
                        <Form.Group className="mb-3">
                            <Form.Label>Group Name</Form.Label>
                            <Form.Control name="groupName" type="text" placeholder='Group Name' required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control name="groupDesc" placeholder='Group Description' as='textarea' rows={4} maxlength="200" style={{resize:'none'}} type="text"/>
                        </Form.Group>
                    </Form>
                </Card>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCreateGroup(false)}>
                Close
            </Button>
            <Button type='submit' form='CreateGroupForm' variant="primary">
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
      </>
    );
  }

export default CreateGroup;