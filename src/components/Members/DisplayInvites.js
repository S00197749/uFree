import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';

function DisplayInvites(props) {
  const [showConfirmReject, setShowConfirmReject] = useState(false);
  const [showConfirmAccept, setShowConfirmAccept] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const UpdateInvite = async (e) => {
    const url = "https://schedule-functions.azurewebsites.net/api/UpdateInvite?code=F6yL-7rHpTPSPDS3W5hFuLT5rQ5Wg2cNDZKvZBmRripRAzFuL3ZRdw==";

    const data = {
        User_Id: props.user_Id
        , Invite_Id: props.invite.invite_Id
        , Invite_Code: props.invite.invite_Code
        , Accepted: accepted.toString()}

    await fetch(url, {
        method: 'POST',
        headers: {  "Content-Type": "application/json"  },
        body: JSON.stringify(data)
    }).then(()=>{
        console.log('Updated')
    })

    props.fetchInvitesData();
  }

  return (
    <>
      <Card className='border border-secondary h-25'>
        <Card.Body>
          <div className='row'>
            <div className='col-3 col-sm-2'>
              <img src="img/avatars/avatar.png" class="avatar img-fluid rounded-circle me-1" alt="Member" />
            </div>
            <div className='col-4 col-sm-6'>
              <h4>{props.invite.group_Name}</h4>
            </div>
            <div className='col-3 col-sm-2'>
              <span>
                <Button onClick={() => setAccepted(false) + setShowConfirmReject(true)} variant='danger'>Reject</Button>
              </span>
            </div>
            <div className='col-2 col-sm-2'>
              <span>
                <Button onClick={() => setAccepted(true) + setShowConfirmAccept(true)} variant='success'>Join</Button>
              </span>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Modal size="sm" backdrop="static" show={showConfirmReject} onHide={() => setShowConfirmReject(false)} animation={false} centered>
        <div style={{border: '1px solid black', borderRadius: '10px', backgroundColor: 'whitesmoke'}}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Removal</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <h3 style={{textAlign: "center"}}>Are you sure you want to reject invite to the following group: <br></br> "{props.invite.group_Name}"?</h3>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirmReject(false)}>
              Cancel
            </Button>
            <Button  onClick={() => UpdateInvite() + setShowConfirmReject(false)} variant="danger">
              Reject
            </Button>         
          </Modal.Footer>
        </div>       
      </Modal>

      <Modal size="sm" backdrop="static" show={showConfirmAccept} onHide={() => setShowConfirmAccept(false)} animation={false} centered>
        <div style={{border: '1px solid black', borderRadius: '10px', backgroundColor: 'whitesmoke'}}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Approval</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <h3 style={{textAlign: "center"}}>Are you sure you want to join the following group: <br></br> "{props.invite.group_Name}"?</h3>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirmAccept(false)}>
              Cancel
            </Button>
            <Button  onClick={() => UpdateInvite() + setShowConfirmAccept(false)} variant="success">
              Join
            </Button>         
          </Modal.Footer>
        </div>       
      </Modal>
    </>
    

  );
}

export default DisplayInvites;