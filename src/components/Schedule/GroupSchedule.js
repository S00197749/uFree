import React from "react";
import { Inject,ScheduleComponent,Day,Week,Month,ViewsDirective, ViewDirective } from "@syncfusion/ej2-react-schedule";
import CreateGroupMeeting from "./CreateGroupMeeting";
import UpdateGroupMeeting from "./UpdateGroupMeeting";
import { useState } from "react";

function GroupSchedule(props) {

    const [groupSchedule, setGroupSchedule] = useState([]);

    const fetchGroupScheduleData = async () => {
        const url = "https://schedule-functions.azurewebsites.net/api/GetGroupAvailableTimes?code=1A0mlVR95wPp_w9rsqu2pTVu-4Zb_f5zC0yUDjcaXJE6AzFujcbqwQ==";

        const u = props.user_Id;
        const g = props.group.group_Id;

		const groupScheduleResult = await fetch(url + "&g=" + g + "&u=" + u);
		const groupScheduleJsonResult = await groupScheduleResult.json();

		setGroupSchedule(groupScheduleJsonResult);
	}

    const data = groupSchedule;

    React.useEffect(() => {

        fetchGroupScheduleData();
      },[]);

    function onEventRendered(args) {
        if(args.data.eventType === 'Available')
            args.element.style.backgroundColor = '#7fa900';
        else if((args.data.eventType !== 'Available'))
            args.element.style.backgroundColor = '#8e24aa';
    }

    function headerTemplate(timeSlotProp) {
        return (<div></div>);
    }
    function contentTemplate(timeSlotProp) {
        if(timeSlotProp.elementType !== 'cell'){
            return (<div>
                {timeSlotProp.eventType !== 'Available' ?
                    <UpdateGroupMeeting 
                        group_Id={props.group.group_Id} 
                        user_Id={props.user_Id} 
                        timeSlot={timeSlotProp} 
                        groupActivities={props.groupActivities}
                        callFetch={()=> fetchGroupScheduleData()}>
                    </UpdateGroupMeeting>
                :
                    <CreateGroupMeeting 
                        group_Id={props.group.group_Id} 
                        user_Id={props.user_Id} 
                        timeSlot={timeSlotProp} 
                        groupActivities={props.groupActivities}
                        callFetch={()=> fetchGroupScheduleData()}>
                    </CreateGroupMeeting>}
            </div>);
        }
        else{
            return(<div>Not Available</div>);
        }
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
            <ScheduleComponent
                height={"900px"}
                eventSettings={{
                    dataSource: data,
                    fields:{
                        id: 'timeslot_Id',
                        subject: { title: 'Subject', name: 'eventType' },
                        startTime: { title: 'From', name: 'startTime' },
                        endTime: { title: 'To', name: 'endTime' },
                        isReadonly: 'isReadonly'
                    }
                }}
                eventRendered={onEventRendered.bind(this)}
                popupOpen={onPopupOpen.bind(this)}
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
        </>
    );
}

export default GroupSchedule;