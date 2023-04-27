import ManageGroup from "./Groups/ManageGroup";
import GroupMembers from "./Members/GroupMembers";
import React, { useState } from "react";
import GroupSchedule from "./Schedule/GroupSchedule";

function Main(props) {
  const [groupMembers, setGroupMembers] = useState([]);
  const [groupActivities, setGroupActivities] = useState([]);

  const getMembersUrl = "https://schedule-functions.azurewebsites.net/api/GetGroupMembers?code=ncp67DrFLYo3QOPXNMO-rn-C_XOJnxThhLZoiX6s8dLJAzFuOrq_YQ==";
	const getActivitiesUrl = "https://schedule-functions.azurewebsites.net/api/GetGroupActivities?code=DwwGHy69g92gFwXoOfBmimS9aaOmBjK1Y0HMc-O-DyyxAzFuDaQDpQ==";

  const u = 1;
  const g = props.group.group_Id;

  const fetchMembersData = async () => {
		const membersResult = await fetch(getMembersUrl + "&g=" + g + "&u=" + u)
		const membersJsonResult = await membersResult.json();

		setGroupMembers(membersJsonResult)
	}

  const fetchActivitiesData = async () => {
		const activitiesResult = await fetch(getActivitiesUrl + "&g=" + g + "&u=" + u)
		const activitiesJsonResult = await activitiesResult.json();

		setGroupActivities(activitiesJsonResult)
	}

  React.useEffect(() => {

    fetchMembersData();
    fetchActivitiesData();
  },[]);

  return (
      <div class="container-fluid p-0">
        <div class="row mb-2 mb-xl-3">
          <div class="col-auto d-none d-sm-block">
            <h3>Group Schedule: {props.group.group_Name}</h3>
          </div>
          <div class="row justify-content-end">
            <div class="col-auto">
              <GroupMembers 
              user_Id={props.user_Id} 
              group={props.group} 
              groupMembers={groupMembers}
              fetchMembersData={()=> fetchMembersData()}>

              </GroupMembers>

              <ManageGroup 
              fetchGroupsData={()=> props.fetchGroupsData()}
              fetchActivitiesData={()=> fetchActivitiesData()}
              user_Id={props.user_Id} 
              group={props.group} 
              groupActivities={groupActivities}>

              </ManageGroup>
            </div>
          </div>
        </div>
        <div class="row mb-2 mb-xl-3">
          <GroupSchedule 
          user_Id={props.user_Id} 
          group={props.group}
          groupActivities={groupActivities}>
            </GroupSchedule>		      
        </div>
      </div>
  );
}

export default Main;