import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';

function DisplayMembers(props) {
  const [showConfirmDeleteMember, setShowConfirmDeleteMember] = useState(false);

  const DeleteMember = async (e) => {
    const url = "https://schedule-functions.azurewebsites.net/api/RemoveMember?code=2lgXACJVHNAdbLjC21iKPv-bfPsk336gPYnn0IUib4FpAzFuEH3Dww==";

    const data = {
        User_Id: props.user_Id
        , Member_Id: props.groupMember.member_Id
        , Group_Id: props.groupMember.group_Id}

    await fetch(url, {
        method: 'DELETE',
        headers: {  "Content-Type": "application/json"  },
        body: JSON.stringify(data)
    }).then(()=>{
        console.log('Updated')
    })

    props.fetchMembersData();
  }
    return (
      <>
        <Card className='border border-secondary h-25'>
          <Card.Body>
            <div className='row'>
              <div className='col-3 col-sm-2'>
                <img src="img/avatars/avatar.png" class="avatar img-fluid rounded-circle me-1" alt="Member" />
              </div>
              <div className='col-6 col-sm-7'>
                <h4>{props.groupMember.user_Name}</h4>
              </div>
              <div className='col-3'>
                <span>
                  <Button onClick={() => setShowConfirmDeleteMember(true)} variant='danger'>Remove</Button>
                </span>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Modal size="sm" backdrop="static" show={showConfirmDeleteMember} onHide={() => setShowConfirmDeleteMember(false)} animation={false} centered>
          <div style={{border: '1px solid black', borderRadius: '10px', backgroundColor: 'whitesmoke'}}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Removal</Modal.Title>
            </Modal.Header>
            <Modal.Body >
              <h3 style={{textAlign: "center"}}>Are you sure you want to remove the following member: <br></br> "{props.groupMember.user_Name}"?</h3>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowConfirmDeleteMember(false)}>
                Cancel
              </Button>
              <Button  onClick={() => DeleteMember() + setShowConfirmDeleteMember(false)} variant="danger">
                Delete
              </Button>         
            </Modal.Footer>
          </div>       
        </Modal>
      </>
      

    );
  }

export default DisplayMembers;