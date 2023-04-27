import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns/src';

function UpdateGroupMeeting(props) { 
    const [showConfirmDeleteMeeting, setShowConfirmDeleteMeeting] = useState(false);

    const SubmitUpdateGroupMeetingForm = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData);    

        const url = "https://schedule-functions.azurewebsites.net/api/UpdateMeeting?code=_A-ACGmXT-s2yTG05tCevBFReggL7wMblzd25-GxLZ0SAzFuRCKGVg==";

        const data = {
            User_Id: props.user_Id
            , Meeting_Id: props.timeSlot.meeting_Id
            , Group_Id: props.group_Id
            , Activity_Id: payload.activity_Id
            , StartTime: payload.startTime
            , EndTime: payload.endTime}

        await fetch(url, {
            method: 'POST',
            headers: {  "Content-Type": "application/json"  },
            body: JSON.stringify(data)
        }).then(()=>{
            console.log('Updated')
        })

        props.callFetch();
    }

    const DeleteGroupMeeting = async (e) => {

        const url = "https://schedule-functions.azurewebsites.net/api/RemoveMeeting?code=qUAZO9DhN-zk-Xe2UgFwoGNNXiy5YfErUTXa3LL8gyCNAzFuyiz1pQ==";

        const data = {
            User_Id: props.user_Id
            , Meeting_Id: props.timeSlot.meeting_Id
            , Group_Id: props.timeSlot.group_Id
        }

        await fetch(url, {
            method: 'DELETE',
            headers: {  "Content-Type": "application/json"  },
            body: JSON.stringify(data)
        }).then(()=>{
            console.log('Updated')
        })

        props.callFetch();
    }

    return (
        <div>
            <Card body>
                <Form id='UpdateGroupMeetingForm' onSubmit={SubmitUpdateGroupMeetingForm}>
                    <h3>Update Meeting</h3>
                    <br></br>
                    <br></br>
                    <DateTimePickerComponent name="startTime" format='yyyy/MM/dd HH:mm:ss' value={new Date(props.timeSlot.startTime)} className="e-field"></DateTimePickerComponent>
                    <br></br>
                    <br></br>
                    <DateTimePickerComponent name="endTime" format='yyyy/MM/dd HH:mm:ss' value={new Date(props.timeSlot.endTime)} className="e-field"></DateTimePickerComponent>        
                    <br></br>
                    <br></br>   
                    <DropDownListComponent 
                        name="activity_Id" 
                        placeholder='Choose Activity' 
                        text={props.timeSlot.activity_Name} 
                        value={props.timeSlot.activity_Id} data-name='activity_Name' c
                        lassName="e-field" 
                        style={{ width: '100%' }}
                        dataSource={props.groupActivities}
                        fields={{text: 'activity_Name', value: 'activity_Id'}}>
                    </DropDownListComponent>                   
                </Form>
            </Card>
            <Card style={{ height: '20px' }}>
                <div className="row">
                    <div className="col-9">
                        <Button onClick={() => setShowConfirmDeleteMeeting(true)} variant="danger">
                            Delete
                        </Button>
                    </div>
                    <div className="col">
                        <Button type='submit' form='UpdateGroupMeetingForm' variant="primary">
                            Save
                        </Button>
                    </div>
                </div>
            </Card>

            <Modal size="sm" backdrop="static" show={showConfirmDeleteMeeting} onHide={() => setShowConfirmDeleteMeeting(false)} animation={false} centered>
                <div style={{border: '1px solid black', borderRadius: '10px', backgroundColor: 'whitesmoke'}}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <h3 style={{textAlign: "center"}}>Are you sure you want to delete the following meeting: 
                        <br></br> "{props.timeSlot.eventType}"?</h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmDeleteMeeting(false)}>
                    Cancel
                    </Button>
                    <Button  onClick={() => DeleteGroupMeeting() + setShowConfirmDeleteMeeting(false)} variant="danger">
                    Delete
                    </Button>         
                </Modal.Footer>
                </div>       
            </Modal>
        </div>
    );
  }

export default UpdateGroupMeeting;