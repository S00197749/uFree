import React, {useState} from "react";
import CreateGroup from "./components/Groups/CreateGroup";
import GroupSidebar from "./components/Groups/GroupSidebar";
import Main from "./components/Main";
import UserSchedule from "./components/Schedule/UserSchedule"
import DisplayInvites from "./components/Members/DisplayInvites";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import jwtDecode from "jwt-decode";

function App() {	
	const [groups, setGroups] = useState([]);
	const [showGroup, setShowGroup] = useState(0);
	const [invites, setInvites] = useState([]);
	const [showInvites, setShowInvites] = useState(false);
	const [user, setUser] = useState({});
	const [userInfo, setUserInfo] = useState({});
	
	async function GetUserInfo(props) {
        const url = "https://schedule-functions.azurewebsites.net/api/GetUser?code=2YOpLvNggyuRPR3e1oJlCFwHVbpTG24lPZ5WPwcU4kG1AzFud_7vKQ==";

		var user_Id = "";
        const data = {
            User_Email: props.email
            , FirstName: props.given_name
            , LastName: props.family_name}

        await fetch(url, {
            method: 'POST',
            headers: {  "Content-Type": "application/json"  },
            body: JSON.stringify(data)
        }).then(function(response) {
			return response.json();
		  })
		  .then(function(response) {
			setUserInfo(response);
			user_Id = response.user_Id;
		  });
		  
		return user_Id;
    }

	async function handleSignOut(event){
		setUser({});
		setUserInfo({});
		document.getElementById("signInDiv").hidden = false;
	}

	async function handleCallbackResponse(response){
		var userObject = jwtDecode(response.credential);
		setUser(userObject);
		const user_Id = await GetUserInfo(userObject);
		await fetchGroupsData(user_Id);
		setShowGroup(0);
		document.getElementById("signInDiv").hidden = true;
	}

	async function fetchGroupsData(user_Id) {
		const url = 'https://schedule-functions.azurewebsites.net/api/GetGroups?code=TiTW1hY4v3MoXwWStwX1CffVdyoP0pQqFXD9iCUdocCmAzFu9aFojA=='

		const result = await fetch(url + "&u=" + user_Id)
		const jsonResult = await result.json();

		setGroups(jsonResult)
		return;
	}

	async function fetchInvitesData(user_Id) {
		const url = 'https://schedule-functions.azurewebsites.net/api/GetInvites?code=ajrDFkpGyJs6pyJjid8oxUYDtnq6tZqfESiEUDv8MGuEAzFug1oDWQ=='

		const result = await fetch(url + "&u=" + user_Id)
		const jsonResult = await result.json();

		setInvites(jsonResult)
		return;
	}

	React.useEffect(() => {
		/* global google */
		google.accounts.id.initialize({
			client_id: "300769982061-k9b8doe3kk8lhmthshtp6pmsahdqu7jf.apps.googleusercontent.com",
			callback: handleCallbackResponse
		});

		google.accounts.id.renderButton(
			document.getElementById("signInDiv"),
			{theme: "outline", size: "large"}
		);

	  });

	return (
	<div class="wrapper p-0">
		<main>
			{[false].map((expand) => (
			<Navbar style={{backgroundColor:"lightgrey", width:"100vw"}} expand={expand} className="mb-3 p-0 d-flex flex-row" height="20px">
				<Container fluid>
					<Navbar.Brand href="#">
						<Navbar.Toggle className="p-1" style={{borderColor:"black"}}/>							
					</Navbar.Brand>
					{ Object.keys(user).length !== 0 ?
						<NavDropdown 
						drop="start"
						title={<img src={user.picture} id="userProfilePic" class="avatar rounded-circle " alt="Profile" />}>							
								<NavDropdown.Item href="#" onClick={() => setShowGroup(0)}>
									My Schedule
								</NavDropdown.Item>
								<NavDropdown.Item href="#" onClick={() => setShowInvites(true) + fetchInvitesData(userInfo.user_Id)}>
									Invites
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#" onClick={(e) => handleSignOut(e)}>
									Logout
								</NavDropdown.Item>
						</NavDropdown>
						:

						<div id="signInDiv"></div>
					}
					<Navbar.Offcanvas bg="dark" placement="start" style={{width:'110px', backgroundColor:"grey"}}>	
						<Offcanvas.Header closeButton placement="start">
							<Offcanvas.Title>
							uFree?
							</Offcanvas.Title>
						</Offcanvas.Header>
						{ Object.keys(user).length !== 0 ?

							<Offcanvas.Body>
								<Nav className="justify-content-end flex-grow-1 pe-3">
									<div className="mb-3 ms-1"><CreateGroup fetchGroupsData={()=> fetchGroupsData(userInfo.user_Id)} user_Id={userInfo.user_Id}></CreateGroup></div>
									<div className="border-top my-3"></div>
									<GroupSidebar callSetShowGroup={(group_Id)=> setShowGroup(group_Id)} groups={groups}></GroupSidebar>
								</Nav>
							</Offcanvas.Body>
							:
							<Offcanvas.Body>
								<Nav className="justify-content-end flex-grow-1 pe-3">
									<div className="mt-6 ms-1">
										<h3 className="mt-6">Login</h3>
									</div>
								</Nav>
							</Offcanvas.Body>
						}
					</Navbar.Offcanvas>
				</Container>
			</Navbar>
			))}

			<div>
				<Modal 
				style={{
				maxHeight: '580px',
				margin: 0,
				position: 'absolute',
				top: '50%',
				transform: 'translateY(-50%)'
				}}
				scrollable={true} 
				backdrop="static" 
				show={showInvites} 
				onHide={() => setShowInvites(false)} 
				animation={false} 
				>
					<Modal.Header closeButton>
						<Modal.Title>My Invites</Modal.Title>
					</Modal.Header>
					<Modal.Body>

						{invites.map(invite =>
							<DisplayInvites 
							user_Id={userInfo.user_Id} 
							invite={invite}
							fetchInvitesData={()=> fetchInvitesData(userInfo.user_Id)}
							fetchGroupsData={()=> fetchGroupsData(userInfo.user_Id)}></DisplayInvites>
						)}

					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={() => setShowInvites(false)}>
						Close
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
			<div className="px-2">
				{ Object.keys(userInfo).length !== 0 ?
					<>
						{(() => {
							if(showGroup === 0) {
								return (
									<UserSchedule user_Id={userInfo.user_Id}/>
							)					
							}
						})()}

						{groups.map(group =>{
							if(showGroup === group.group_Id)
								return <Main 
								group={group} 
								user_Id={userInfo.user_Id}
								fetchGroupsData={()=> fetchGroupsData(userInfo.user_Id)}>
									
								</Main>					
							}							
						)}
					</>
				:
					<div className="center-screen">
						<h4>Login with a google account to use uFree</h4>
					</div>
				}

				
			</div>
		</main>
	</div>
	);
}

export default App;
