import React, { useState } from "react";
import { Inject,ScheduleComponent,Day,Week,Month,ViewsDirective, ViewDirective } from "@syncfusion/ej2-react-schedule";
import CreateUserSchedule from "./CreateUserSchedule";
import UpdateUserSchedule from "./UpdateUserSchedule";

function GroupSchedule(props) {
    const [userSchedule, setUserSchedule] = useState([]);

    const fetchUserScheduleData = async () => {
        const url = "https://schedule-functions.azurewebsites.net/api/GetUserSchedule?code=5ZyIAL7d-IMLSqAo4J2vwkwK5IMYmZoxgOZTpuH9WeYiAzFurM3cbQ==";

        const u = props.user_Id;
		const userScheduleResult = await fetch(url + "&u=" + u);
		const userScheduleJsonResult = await userScheduleResult.json();

		setUserSchedule(userScheduleJsonResult);
	}

    const data = userSchedule;

    React.useEffect(() => {

        fetchUserScheduleData();
      },[]);

    function onEventRendered(args) {
        args.element.style.backgroundColor = '#7fa900';
    }

    function headerTemplate(timeSlotProp) {
        return (<div></div>);
    }
    function contentTemplate(timeSlotProp) {
        return (<div>
                    {timeSlotProp.elementType === 'cell' ?
                        <CreateUserSchedule 
                        callFetch={()=> fetchUserScheduleData()}
                        user_Id={props.user_Id} 
                        timeSlot={timeSlotProp}></CreateUserSchedule>
                    :                       
                        <UpdateUserSchedule 
                        callFetch={()=> fetchUserScheduleData()}
                        user_Id={props.user_Id} 
                        timeSlot={timeSlotProp}></UpdateUserSchedule>
                    }
                </div>);
    }
    function footerTemplate(timeSlotProp) {
        return (<div></div>);
    }

    function onPopupOpen(args) { 
        if(args.type === 'Editor')
            args.cancel = true; 
    } 
    
    return(
        <>
        <div class="container-fluid p-0">
            <div class="row mb-2 mb-xl-3">
                <div class="col-auto d-none d-sm-block">
                    <h3>My Schedule</h3>
                </div>
                <div class="row justify-content-end">
                    <div class="col-auto">
                        
                    </div>
                </div>
            </div>
            <div class="row mb-2 mb-xl-3">
                <ScheduleComponent
                height={"900px"}
                eventSettings={{
                    dataSource: data,
                    fields:{
                        id: 'timeslot_Id',
                        subject: { title: 'Subject', name: 'title' },
                        startTime: { title: 'From', name: 'startTime' },
                        endTime: { title: 'To', name: 'endTime' },
                        isReadonly: 'isReadonly'
                    }
                }}
                popupOpen={onPopupOpen.bind(this)}
                eventRendered={onEventRendered.bind(this)}
                quickInfoTemplates={{
                    header: headerTemplate.bind(this),
                    content: contentTemplate.bind(this),
                    footer: footerTemplate.bind(this)
                }}>
                    <ViewsDirective>
                        <ViewDirective option='Day' />
                        <ViewDirective option='Week' />
                        <ViewDirective option='Month' />
                    </ViewsDirective>
                    <Inject services={[Day, Week, Month]}/>
                </ScheduleComponent>	      
            </div>
        </div>
            
        </>
    );
}

export default GroupSchedule;