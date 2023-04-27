import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Button } from 'react-bootstrap';

function CreateGroupMeeting(props) { 

    const SubmitCreateGroupMeetingForm = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData);    

        const url = "https://schedule-functions.azurewebsites.net/api/CreateMeeting?code=6d0hX6veeQI0m1lUTpPxcKYwjelTm2YukrAD0M0klghRAzFu_eJFQQ==";

        const data = {
            User_Id: props.user_Id
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

    return (
        <div>
            <Card body>
                <Form id='CreateGroupMeetingForm' onSubmit={SubmitCreateGroupMeetingForm}>
                    <h3>Add Meeting</h3>
                    <br></br>
                    <br></br>
                    <DateTimePickerComponent name="startTime" format='yyyy/MM/dd HH:mm:ss' value={new Date(props.timeSlot.startTime)} className="e-field"></DateTimePickerComponent>
                    <br></br>
                    <br></br>
                    <DateTimePickerComponent name="endTime" format='yyyy/MM/dd HH:mm:ss' value={new Date(props.timeSlot.endTime)} className="e-field"></DateTimePickerComponent>        
                    <br></br>
                    <br></br>  
                    <DropDownListComponent name="activity_Id" placeholder='Choose Activity' data-name='activity_Name' className="e-field" style={{ width: '100%' }}
                        dataSource={props.groupActivities}
                        fields={{text: 'activity_Name', value: 'activity_Id'}}>
                    </DropDownListComponent> 
                    <div>
                        
                    </div>                     
                </Form>
            </Card>
            <Card style={{ height: '20px' }}>
                <div className="row">
                    <div className="col-9">
                    </div>
                    <div className="col">
                        <Button type='submit' form='CreateGroupMeetingForm' variant="primary">
                            Save
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
  }

export default CreateGroupMeeting;