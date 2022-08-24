import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import CustomEvent from "./CustomEvent"
import CalendarFilter from "./CalendarFilter"
import '../../style/components/calendar.css'
import '../../style/semantic-ui.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { formatDate } from '../../utils/common.js'
import CalendarService from '../../requests/calendarRequests.js'
import ConfigurationsService from "../../requests/configurationsRequests";
import FormComponent from "../form/Form";
import { connect, Provider } from "react-redux";
import { store } from "../../state/store";
import { bindActionCreators } from "redux";
import { setCalendarEvents, setFullBrands } from "../../actions";
import moment from 'moment'

const DraggableCalendar = withDragAndDrop(Calendar)
moment.locale('en-GB');
const localizer = momentLocalizer(moment)

export class CalendarComponent extends Component{

    constructor(props) {
        super(props);
        this.state = { events: [], addNew: false };
        this.child = React.createRef();
    }

    UNSAFE_componentWillMount() {
        const { setFullBrands } = this.props;
        CalendarService
            .get()
            .then((response) => {
                if (response.length > 0) {
                    this.updateCalendarData(response)
                }
            })
        ConfigurationsService
            .getBrand()
            .then((response) => {
                let brandsArr = [];
                response.map((data, index) => {
                    brandsArr.push({
                        key: data.id,
                        text: data.brand_name,
                        value: data.brand_name,
                        languages: response[index].languages.map(data => {return {id: data.id, key: data.language_key, menuItem: data.language_key}}),
                        domains: response[index].domains.map(data => {return {key: data.id, text: data.domain_name, value: data.domain_name}}),
                        products: response[index].products.map(data => {return {key: data.id, text: data.product_name, value: data.product_name}})
                    })
                })
                setFullBrands(brandsArr)
            })
    }

    //Event resize
    onEventResize = (e) => {
        this.updateField(e);
    }

    //Event drop
    onEventDrop = (e) => {
        this.updateField(e);
    }

    onDoubleClickEvent = (e) => {
        this.editEvent(e.id)
    }

    //On event resize or drop changes dates
    updateField(e) {
        let changeEventIndex = null;
        let changeEventId = null;
        this.state.events.filter((data, index) => {
            if (data.id === e.event.id) {
                changeEventIndex =  index;
                changeEventId = data.id;
            }
        })
        this.state.events[changeEventIndex].start = e.start;
        this.state.events[changeEventIndex].end = e.end;
        this.forceUpdate();

        CalendarService
            .update({data: {start: formatDate(e.start.toString(), true), end: formatDate(e.end.toString(), true)}, id: changeEventId})
            .then(() => {})
    }

    //Open, Close form and reset form data
    openCloseNewEvent = e => {
        this.setState({
            addNew: !this.state.addNew
        });
        this.child.current.unsetEditMode();
    }

    //If selected some slots, will open new campaign form and pass to it dates
    selectSlot = (e) => {
        this.openCloseNewEvent(e);
        this.child.current.setSlotData(formatDate(e.start.toString(), false), formatDate(e.end.toString(), false));
    }

    //Data passing to edit mode and open form
    editEvent = (id) => {
        this.setState({addNew: true});
        this.child.current.setEditData(id);
    }

    //Passing some functions to event component
    CustomEventCapsule = (props) => {
        return class CustomEventInstance extends CustomEvent {
            static defaultProps = { ...props }
        }
    }

    eventStyleGetter (event) {
        if (!event.active) {
            let style = {
                opacity: 0.5,
            }
            return { style }
        }
    }

    updateFilteredEvents = (events) => {
        this.setState({ events });
    }

    updateCalendarData = (response) => {
        let newEvents = [];
        const { setCalendarEvents } = this.props;
        response.map((event, index) => {
            newEvents.push({
                ...event,
                start: moment(event.start_d)._d,
                end: moment(event.end_d)._d,
                brands: response[index].brands.map(data => {return {key: data.id, text: data.brand_name, value: data.brand_name}}),
                domains: response[index].domains.map(data => {return {key: data.id, text: data.domain_name, value: data.domain_name}}),
                products: response[index].products.map(data => {return {key: data.id, text: data.product_name, value: data.product_name}})
            })
        })
        this.setState({ events: newEvents, addNew: false });
        setCalendarEvents(newEvents);
    }

    render() {
        let formats = {
            dayFormat: 'dd',
            agendaDateFormat: 'MMM dd',
            dayHeaderFormat: 'MMM dd'
        }

        return (
            <div id="calendar-component">
                <CalendarFilter updateFilteredEvents={this.updateFilteredEvents} data={this.props}/>
                <DraggableCalendar
                    localizer={localizer}
                    events={this.state.events}
                    components={{
                        event: this.CustomEventCapsule({editEvent: this.editEvent, updateCalendarData: this.updateCalendarData}),
                    }}
                    onEventResize={this.onEventResize}
                    onEventDrop={this.onEventDrop}
                    onSelectSlot={this.selectSlot}
                    onDoubleClickEvent={this.onDoubleClickEvent}
                    resizable
                    selectable
                    editable
                    formats={formats}
                    eventPropGetter={this.eventStyleGetter}
                />
                <div className={this.state.addNew ? 'add-new visible' : 'add-new'}>
                    <div className="grey-background" onClick={this.openCloseNewEvent}></div>
                    <div id="form">
                        <h2>New Campaign</h2>
                        <FormComponent ref={this.child} data={this.props} updateCalendarData={this.updateCalendarData}/>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){ return { state } }
const mapDispatchToProps = dispatch => bindActionCreators({setCalendarEvents, setFullBrands}, dispatch)
export const CalendarContainer = connect(mapStateToProps, mapDispatchToProps)(CalendarComponent);

class MainCalendar extends Component {
    render () {
        return (
            <Provider store={store}>
                <CalendarContainer {...this.props}/>
            </Provider>
        );
    }
}
export default MainCalendar;

if (document.getElementById('MainCalendar')) {
    const element = document.getElementById('MainCalendar')
    const props = Object.assign({}, element.dataset)
    ReactDOM.render(<MainCalendar {...props}/>, element);
}
