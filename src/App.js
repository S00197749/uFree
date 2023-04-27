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

function App() {	
	const [groups, setGroups] = useState([]);
	const [showGroup, setShowGroup] = useState(0);
	const [invites, setInvites] = useState([]);
	const [showInvites, setShowInvites] = useState(false);

	const u = 1;
	
	const fetchGroupsData = async () => {
		const url = 'https://schedule-functions.azurewebsites.net/api/GetGroups?code=TiTW1hY4v3MoXwWStwX1CffVdyoP0pQqFXD9iCUdocCmAzFu9aFojA=='

		const result = await fetch(url + "&u=" + u)
		const jsonResult = await result.json();

		setGroups(jsonResult)
	}

	const fetchInvitesData = async () => {
		const url = 'https://schedule-functions.azurewebsites.net/api/GetInvites?code=ajrDFkpGyJs6pyJjid8oxUYDtnq6tZqfESiEUDv8MGuEAzFug1oDWQ=='

		const result = await fetch(url + "&u=" + u)
		const jsonResult = await result.json();

		setInvites(jsonResult)
	}

	React.useEffect(() => {

		fetchGroupsData();
		fetchInvitesData();
	  },[]);

	return (
	<div class="wrapper">
		<div class="main">
			{[false].map((expand) => (
			<Navbar style={{backgroundColor:"lightgrey"}} expand={expand} className="mb-3 p-0 d-flex flex-row" height="20px">
				<Container fluid>
					<Navbar.Brand href="#">
						<Navbar.Toggle className="p-1" style={{borderColor:"black"}}/>
					</Navbar.Brand>
					<NavDropdown 
					drop="start"
					title={<img src="img/avatars/avatar.png" class="avatar rounded-circle " alt="Profile" />}>							
							<NavDropdown.Item href="#" onClick={() => setShowGroup(0)}>
								My Schedule
							</NavDropdown.Item>
							<NavDropdown.Item href="#" onClick={() => setShowInvites(true)}>
								Invites
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#">
								Logout
							</NavDropdown.Item>
					</NavDropdown>
					<Navbar.Offcanvas bg="dark" placement="start" style={{width:'110px', backgroundColor:"grey"}}>	
						<Offcanvas.Header closeButton placement="start">
							<Offcanvas.Title>
							uFree?
							</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body>
							<Nav className="justify-content-end flex-grow-1 pe-3">
								<div className="mb-3 ms-1"><CreateGroup fetchGroupsData={()=> fetchGroupsData()} user_Id={u}></CreateGroup></div>
								<div className="border-top my-3"></div>
								<GroupSidebar callSetShowGroup={(group_Id)=> setShowGroup(group_Id)} groups={groups}></GroupSidebar>
							</Nav>
						</Offcanvas.Body>
					</Navbar.Offcanvas>
				</Container>
			</Navbar>
			))}

			<main class="content">
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
								user_Id={u} 
								invite={invite}
								fetchInvitesData={()=> fetchInvitesData()}></DisplayInvites>
							)}

						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={() => setShowInvites(false)}>
							Close
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
				<div>
					{(() => {
						if(showGroup === 0) {
						return (
							<UserSchedule user_Id={u}/>
						)
						}
					})()}
				</div>

				{groups.map(group =>{
					if(showGroup === group.group_Id)
						return <Main 
						group={group} 
						user_Id={u}
						fetchGroupsData={()=> fetchGroupsData()}>
							
						</Main>					
					}							
				)}
			</main>

			<footer class="footer">
			</footer>
		</div>
	</div>
	);
}

export default App;
