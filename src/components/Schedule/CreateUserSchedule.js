import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { Button } from 'react-bootstrap';

function CreateUserSchedule(props) { 

    const SubmitCreateUserScheduleForm = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData);    

        var isRecurring = "false";

        if(payload.isRecurring === "true"){
            isRecurring = payload.isRecurring;
        }

        const url = "https://schedule-functions.azurewebsites.net/api/CreateUserSchedule?code=NF2IUGWzYTbg8EfThB37wIe5Odh6Q1INWvteWlidD77fAzFuhzc3bg==";

        const data = {
            User_Id: props.user_Id
            , IsRecurring: isRecurring
            , StartTime: payload.startTime
            , EndTime: payload.endTime}

        await fetch(url, {
            method: 'POST',
            headers: {  "Content-Type": "application/json"  },
            body: JSON.stringify(data)
        }).then(()=>{
            console.log('Updated')
        })

        window.location.reload(false);
    }

    return (
        <div>
            <Card body>
                <Form id='CreateUserScheduleForm' onSubmit={SubmitCreateUserScheduleForm}>
                    <h3>Add Availability</h3>
                    <br></br>
                    <br></br>
                    <DateTimePickerComponent name="startTime" format='yyyy/MM/dd HH:mm:ss' value={new Date(props.timeSlot.startTime)} className="e-field"></DateTimePickerComponent>
                    <br></br>
                    <br></br>
                    <DateTimePickerComponent name="endTime" format='yyyy/MM/dd HH:mm:ss' value={new Date(props.timeSlot.endTime)} className="e-field"></DateTimePickerComponent>        
                    <br></br>
                    <br></br>   
                    <div>
                        <label for="isRecurring">Recurring Weekly</label>
                        <input className="mx-2" type="checkbox" name="isRecurring" value="true"></input>
                    </div>                     
                </Form>
            </Card>
            <Card style={{ height: '20px' }}>
                <div className="row">
                    <div className="col-9">
                    </div>
                    <div className="col">
                        <Button type='submit' form='CreateUserScheduleForm' variant="primary">
                            Save
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
  }

export default CreateUserSchedule;