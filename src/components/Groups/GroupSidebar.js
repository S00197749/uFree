import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function GroupSidebar(props) {

  return (
    <>
      {props.groups.map(group =>
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip>{group.group_Name}</Tooltip>}>

          <li class="sidebar-item my-2 mx-2">
            <a onClick={() => props.callSetShowGroup(group.group_Id)} href='#'>
              <img src="img/avatars/group-icon2.jpg" class="img-fluid rounded-circle" alt={group.group_Name} />
            </a>
          </li>
        </OverlayTrigger>
      )}
    </>
  );
}

export default GroupSidebar;