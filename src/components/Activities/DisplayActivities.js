import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import { useState } from 'react';
import UpdateActivity from './UpdateActivity';

function DisplayActivities(props) {
  const [showUpdateActivity, setShowUpdateActivity] = useState(false);
  const [showConfirmDeleteActivity, setShowConfirmDeleteActivity] = useState(false);

  const DeleteActivity = async (e) => {

    const url = "https://schedule-functions.azurewebsites.net/api/RemoveActivity?code=j-1uYeaLSGUs4uLjIB-mGZU876Xob495wM5lJdvoqt3tAzFuLB9Now==";

    const data = {
        User_Id: props.user_Id
        , Activity_Id: props.groupActivity.activity_Id
        , Group_Id: props.groupActivity.group_Id}

    await fetch(url, {
        method: 'DELETE',
        headers: {  "Content-Type": "application/json"  },
        body: JSON.stringify(data)
    }).then(()=>{
        console.log('Updated')
    })

    props.fetchActivitiesData();
  }

  return (
    <>
      <Card className='border border-secondary h-25 mt-2'>
        <Card.Body>
          <div className='row'>
            <div className='col-4 col-sm-6'>
              <h5>{props.groupActivity.activity_Name}</h5>
            </div>
            <div className='col-2'>
              <h5>{props.groupActivity.limit}</h5>
            </div>
            <div className='col-6 col-sm-4'>
              <span>
                <Button onClick={() => setShowUpdateActivity(true)} variant='success' className='mr-2'>Edit</Button>
                <Button onClick={() => setShowConfirmDeleteActivity(true)} variant='danger' className='mx-2'>Remove</Button>
              </span>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Modal 
        backdrop="static" 
        show={showUpdateActivity} onHide={() => setShowUpdateActivity(false)} 
        animation={false} 
        centered>
          <Modal.Header closeButton>
            <Modal.Title>Manage Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Nav className="justify-content-center" fill  variant="pills" defaultActiveKey="2">
              <Nav.Item>
                <Nav.Link onClick={() => props.callShowSettings()} eventKey="1">Settings</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => props.callShowActivities()} eventKey="2">Activities</Nav.Link>
              </Nav.Item>
            </Nav>

            <UpdateActivity 
            user_Id={props.user_Id} 
            groupActivity={props.groupActivity} 
            fetchActivitiesData={()=> props.fetchActivitiesData()}
            callShowActivities={()=> props.callShowActivities()}
            callHideUpdateActivities={()=> setShowUpdateActivity(false)}></UpdateActivity>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowUpdateActivity(false) + props.callShowActivities()}>
              Cancel
            </Button>
            <Button type='submit' form='UpdateActivityForm' variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
      </Modal>

      <Modal size="sm" backdrop="static" show={showConfirmDeleteActivity} onHide={() => setShowConfirmDeleteActivity(false)} animation={false} centered>
        <div style={{border: '1px solid black', borderRadius: '10px', backgroundColor: 'whitesmoke'}}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <h3 style={{textAlign: "center"}}>Are you sure you want to delete the following activity: <br></br> "{props.groupActivity.activity_Name}"?</h3>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirmDeleteActivity(false)}>
              Cancel
            </Button>
            <Button  onClick={() => DeleteActivity() + setShowConfirmDeleteActivity(false)} variant="danger">
              Delete
            </Button>         
          </Modal.Footer>
        </div>       
      </Modal>
    </>
  ) 
}

export default DisplayActivities;