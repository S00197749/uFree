import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import DisplayMembers from './DisplayMembers';

function GroupMembers(props) {
    const [showMembers, setShowMembers] = useState(false);
    const [showAddMember, setShowAddMember] = useState(false);
  
    const SubmitInviteMemberForm = async (e) => {
      e.preventDefault()
      const formData = new FormData(e.target);
      const payload = Object.fromEntries(formData);    

      const url = "https://schedule-functions.azurewebsites.net/api/CreateInvite?code=SqXH1aM9I-tnz2TueNCp9FJHpoPW5dZc9XnZIMIDWNk4AzFubV2fZg==";

      const data = {
          User_Id: props.user_Id
          , Group_Id: props.group.group_Id 
          , Email: payload.email}


      await fetch(url, {
          method: 'POST',
          headers: {  "Content-Type": "application/json"  },
          body: JSON.stringify(data)
      }).then(()=>{
          console.log('Updated')
      })

      setShowMembers(true);
      setShowAddMember(false);
    }

    return (
      <>
        <Button variant="primary" onClick={() => setShowMembers(true)}>
            Group Members
        </Button>
  
        <Modal 
        style={{
          maxHeight: '580px',
          margin: 0,
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)'
        }}
        scrollable={true} 
        backdrop="static" 
        show={showMembers} 
        onHide={() => setShowMembers(false)} 
        animation={false} 
        >
          <Modal.Header closeButton>
            <Modal.Title>Group Members</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            {props.groupMembers.map(groupMember =>
              <DisplayMembers
               user_Id={props.user_Id} 
               groupMember={groupMember}
               fetchMembersData={()=> props.fetchMembersData()}></DisplayMembers>
            )}

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowMembers(false)}>
              Close
            </Button>
            <Button variant="success" onClick={() => setShowAddMember(true) + setShowMembers(false)}>
              Add Member
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal backdrop="static" show={showAddMember} onHide={() => setShowAddMember(false)} animation={false} centered>
          <Modal.Header closeButton>
            <Modal.Title>Group Members</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card body className="h-75">
                <Form id='InviteMemberForm' onSubmit={SubmitInviteMemberForm}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>User Email</Form.Label>
                        <Form.Control name='email' type="text" required placeholder="User Email" />
                    </Form.Group>
                </Form>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowMembers(true) + setShowAddMember(false)}>
              Cancel
            </Button>
            <Button variant="primary" type='submit' form='InviteMemberForm'>
              Send Invite
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default GroupMembers;