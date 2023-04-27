import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

function UpdateUserSchedule(props) { 
    const [showConfirmDeleteSchedule, setShowConfirmDeleteSchedule] = useState(false);

    const SubmitUpdateUserScheduleForm = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData);    

        var isRecurring = "false";
        var updateRecurring = "false";

        if(payload.isRecurring === "true"){
            isRecurring = payload.isRecurring;
        }

        if(payload.updateRecurring === "true"){
            updateRecurring = payload.updateRecurring;
        }

        const url = "https://schedule-functions.azurewebsites.net/api/UpdateUserSchedule?code=fMcvQGfAU97cMbDFgD-V-8hCyUKFoSPGmlpZAGkhfK4KAzFuxDCaxw==";

        const data = {
            User_Id: props.user_Id
            , Timeslot_Id: props.timeSlot.timeslot_Id
            , UpdateRecurring: updateRecurring
            , Recurring_Id: props.timeSlot.recurring_Id
            , IsRecurring: isRecurring
            , StartTime: payload.startTime
            , EndTime: payload.endTime
        }

        await fetch(url, {
            method: 'POST',
            headers: {  "Content-Type": "application/json"  },
            body: JSON.stringify(data)
        }).then(()=>{
            console.log('Updated')
        })

        props.callFetch();
    }

    const DeleteUserSchedule = async (e) => {

        var updateRecurring = "false";

        const url = "https://schedule-functions.azurewebsites.net/api/RemoveUserSchedule?code=973ghZ3zHB5wbj8zXV-keaQ-tqJY1BQB6pUE0oggAMw2AzFuePyzHw==";

        const data = {
            User_Id: props.user_Id
            , Timeslot_Id: props.timeSlot.timeslot_Id
            , RemoveRecurring: updateRecurring
            , Recurring_Id: props.timeSlot.recurring_Id
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
                <Form id='UpdateUserScheduleForm' onSubmit={SubmitUpdateUserScheduleForm}>
                    <h3>Update Availability</h3>
                    <br></br>
                    <br></br>
                    <DateTimePickerComponent name="startTime" format='yyyy/MM/dd HH:mm:ss' value={new Date(props.timeSlot.startTime)} className="e-field"></DateTimePickerComponent>
                    <br></br>
                    <br></br>
                    <DateTimePickerComponent name="endTime" format='yyyy/MM/dd HH:mm:ss' value={new Date(props.timeSlot.endTime)} className="e-field"></DateTimePickerComponent>        
                    <br></br>
                    <br></br>   
                    <div className="row">   
                        <div hidden={!props.timeSlot.isRecurring} className="col">      
                            <span>Recurring weekly, check the box below if you wish to update or delete all instances of this time slot.</span>
                        </div>  
                    </div>  
                    <br></br> 
                    <div className="row">
                        <div className="col" hidden={!props.timeSlot.isRecurring}>   
                            <input className="mx-2" type="checkbox" id="updateRecurring" name="updateRecurring" disabled={!props.timeSlot.isRecurring} value="true"></input>                   
                            <label for="updateRecurring">Update for Recurring</label>
                        </div> 
                    </div>                                   
                </Form>
            </Card>
            <Card style={{ height: '20px' }}>
                <div className="row">
                    <div className="col-9">
                        <Button onClick={() => setShowConfirmDeleteSchedule(true)} variant="danger">
                            Delete
                        </Button>
                    </div>
                    <div className="col">
                        <Button type='submit' form='UpdateUserScheduleForm' variant="primary">
                            Save
                        </Button>
                    </div>
                </div>
            </Card>

            <Modal size="sm" backdrop="static" show={showConfirmDeleteSchedule} onHide={() => setShowConfirmDeleteSchedule(false)} animation={false} centered>
                <div style={{border: '1px solid black', borderRadius: '10px', backgroundColor: 'whitesmoke'}}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <h3 style={{textAlign: "center"}}>Are you sure you want to delete the following time slot: 
                        <br></br> "{props.timeSlot.startTimeString +  ' - ' + props.timeSlot.endTimeString}"?</h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmDeleteSchedule(false)}>
                    Cancel
                    </Button>
                    <Button  onClick={() => DeleteUserSchedule() + setShowConfirmDeleteSchedule(false)} variant="danger">
                    Delete
                    </Button>         
                </Modal.Footer>
                </div>       
            </Modal>
        </div>
    );
  }

export default UpdateUserSchedule;