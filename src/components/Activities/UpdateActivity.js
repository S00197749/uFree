import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function UpdateActivity(props) { 
    const [checked, setChecked] = useState(props.groupActivity.limit);
    const [text, setText] = useState(props.groupActivity.minimum_Members);

    const SubmitUpdateActivityForm = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData);    

        var limit = props.groupActivity.limit;
        var min_Members = props.groupActivity.minimum_Members;

        if(payload.limit === undefined){
            limit = "false";
            min_Members = 0;
        }
        else{
            limit = payload.limit;
            min_Members = payload.min_Members;
        }

        const url = "https://schedule-functions.azurewebsites.net/api/UpdateActivity?code=19CX3LQx4_96TRDEakEdm0m-62E0sbPE-2RF0VE_S6SVAzFuEzdqPQ==";

        const data = {
            User_Id: props.user_Id
            , Activity_Id: props.groupActivity.activity_Id
            , Group_Id: props.groupActivity.group_Id 
            , Activity_Name: payload.activity_Name
            , Activity_Description: payload.activity_Desc
            , Limit: limit
            , Minimum_Members: min_Members}

        await fetch(url, {
            method: 'POST',
            headers: {  "Content-Type": "application/json"  },
            body: JSON.stringify(data)
        }).then(()=>{
            console.log('Updated')
        })

        props.fetchActivitiesData();
        props.callHideUpdateActivities();
        props.callShowActivities();
    }

    return (
        <Card body>
            <Form id='UpdateActivityForm' onSubmit={SubmitUpdateActivityForm}>
                <Form.Group className="mb-3">
                    <Form.Label>Activity Name</Form.Label>
                    <Form.Control name="activity_Name" type="text" defaultValue={props.groupActivity.activity_Name} />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="activity_Desc" as='textarea' rows={4} maxlength="200" style={{resize:'none'}} type="text" defaultValue={props.groupActivity.activity_Description} />
                </Form.Group>

                <div className='row'>
                    <div class="form-group col-6 col-sm-4">
                        <Form.Check  
                            name="limit"
                            type="switch"
                            id="custom-switch"
                            label="Minimum Members"
                            checked={checked}
                            value={checked}
                            onChange={() => {
                                    if(checked){
                                    setText(props.groupActivity.minimum_Members)
                                    }                              
                                setChecked(!checked)
                                }
                            }
                        />
                    </div>
                    <div class="form-group col-6 col-sm-8">
                        <Form.Group className="mb-3 w-50" controlId="formBasicPassword">
                            <Form.Control
                                name="min_Members"
                                type="number"
                                min="0"
                                hidden={!checked}
                                disabled={!checked}
                                value={text}
                                onChange={e => setText(e.target.value)}
                             />
                        </Form.Group>
                    </div>
                </div>
               
            </Form>
        </Card>
    );
  }

export default UpdateActivity;