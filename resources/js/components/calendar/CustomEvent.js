import React from "react"
import ReactTooltip from "react-tooltip"
import { FaUserAlt, FaRegEnvelope, FaMobileAlt, FaRegSun, FaTrash, FaEdit, FaEye, FaEyeSlash, FaClock } from "react-icons/fa"
import '../../style/components/customEvent.css'
import CalendarService from "../../requests/calendarRequests"
import moment from "moment"

export default class CustomEvent extends React.Component {
    constructor(props) {
        super(props);
    }

    //Event editing
    editingEvent = (id) => {
        this.props.editEvent(id)
    }

    //Event delete
    deleteEvent = (id) => {
        CalendarService
            .destroy(id)
            .then((response) => {
                this.props.updateCalendarData(response)
            })
    }

    //Event activate/inactivate
    activateEvent = (id, active) => {
        const data = { active: !active };

        CalendarService
            .updateStatus({ data, id })
            .then((response) => {
                this.props.updateCalendarData(response)
            })
    }

    render() {
        const {event} = this.props;
        const {id, name, owner, email, phone, start, end, active} = event;
        const today = moment()._d;
        const zoneName = start.toLocaleString('en', {timeZoneName:'short'}).split(' ').pop();

        return (
            <div id="custom-event">
                <div className="actions d-flex">
                    {((start < today) && (today < end)) ? <div className="icon in-progress" data-tip="Event in progress now"><FaRegSun/></div> : ''}
                    <div className="icon edit-event" data-tip="Edit event" onClick={() => this.editingEvent(id)}><FaEdit/></div>
                    <div className="icon activate-event" data-tip={active ? "Move to inactive" : "Move to active"} onClick={() => this.activateEvent(id, active)}>
                        {active ? <div><FaEyeSlash/></div> : <div><FaEye/></div>}
                    </div>
                    <div className="icon remove-event" data-tip="Remove event" onClick={() => this.deleteEvent(id)}><FaTrash/></div>
                    <ReactTooltip />
                </div>
                <div className="event-information">
                    <div className="event-name">{name ? name : null}</div>
                    <div>{owner ? <div><FaUserAlt /> {owner}</div> : null}</div>
                    <div className="d-flex event-data">{email ? <div style={{marginRight: '5px'}}><FaRegEnvelope /> {email}</div> : null} {phone ? <div><FaMobileAlt /> {phone}</div> : null}</div>
                    <div className="d-flex align-items-center time-zone-data"><FaClock style={{marginRight: '5px'}}/>{zoneName}</div>
                </div>
            </div>
        );
    }
}
