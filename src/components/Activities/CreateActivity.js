import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import {Button} from 'react-bootstrap';

function CreateActivity(props) { 
    const [checked, setChecked] = useState(false);
    const [text, setText] = useState(0);

    const SubmitCreateActivityForm = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData);    

        var limit;
        var min_Members;

        if(payload.limit === undefined){
            limit = "false";
            min_Members = 0;
        }
        else{
            limit = payload.limit;
            min_Members = payload.min_Members;
        }

        const url = "https://schedule-functions.azurewebsites.net/api/CreateActivity?code=jUDV5hSKYEBQ81GUkCWQCFKuRXfazH5iCWvcvLFbEeqsAzFuUv6KjQ==";

        const data = {
            User_Id: 1
            , Group_Id: props.group.group_Id 
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
        props.callShowActivities();
    }

    return (
        <>
        <Modal.Body>
            <Nav className="justify-content-center" fill  variant="pills" defaultActiveKey="2">
              <Nav.Item>
                <Nav.Link onClick={() => props.callShowSettings()} eventKey="1">Settings</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => props.callShowActivities()} eventKey="2">Activities</Nav.Link>
              </Nav.Item>
            </Nav>

            <Card body>
                <Form id='CreateActivityForm' onSubmit={SubmitCreateActivityForm}>
                    <Form.Group className="mb-3">
                        <Form.Label>Activity Name</Form.Label>
                        <Form.Control name="activity_Name" type="text" required placeholder='Activity Name' />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="activity_Desc" as='textarea' rows={4} maxlength="200" style={{resize:'none'}} type="text" placeholder='Activity Description' />
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
                                        setText(0)
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

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => props.callShowActivities()}>
              Cancel
            </Button>
            <Button type='submit' form='CreateActivityForm' variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
        </>
    );
    
  }

export default CreateActivity;