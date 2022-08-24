import React from "react"
import {} from "react-icons/fa"

export default class CustomToolbar extends React.Component {
    constructor(props) {
        super(props);
    }

    goToToday = () => {
        let mDate = new Date();
        let newDate = new Date(
            mDate.getFullYear(),
            mDate.getMonth(),
            1);
        this.props.onNavigate('next', newDate);
    }
    goToBack = () => {
        let mDate = this.props.date;
        let newDate = new Date(
            mDate.getFullYear(),
            mDate.getMonth() - 1,
            1);
        this.props.onNavigate('prev', newDate);
        this.getCalendarEvents(newDate);

    }
    goToNext = () => {
        let mDate = this.props.date;
        let newDate = new Date(
            mDate.getFullYear(),
            mDate.getMonth() + 1,
            1);
        this.props.onNavigate('next', newDate);
        this.getCalendarEvents(newDate);

    }

    goToDayView = () => {this.props.onView('day')}
    goToWeekView = () => {this.props.onView('week')}
    goToMonthView = () => {this.props.onView('month')}
    goToAgendaView = () => {this.props.onView('agenda')}

    getCalendarEvents = () => {}

    render()
    {
        const { label } = this.props;
        return (

            <div className="rbc-toolbar">
                <span className="rbc-btn-group">
                    <button type="button" onClick={this.goToToday}>Today</button>
                    <button type="button" onClick={this.goToBack}>Back</button>
                    <button type="button" onClick={this.goToNext}>Next</button>
                </span>
                <span className="rbc-toolbar-label">
                    {label}
                </span>
                <span className="rbc-btn-group">
                    <button type="button" className="rbc-active" onClick={this.goToMonthView}>Month</button>
                    <button type="button" className="" onClick={this.goToWeekView}>Week</button>
                    <button type="button" className="" onClick={this.goToDayView}>Day</button>
                    <button type="button" className="" onClick={this.goToAgendaView}>Agenda</button>
                </span>
            </div>
        );
    }
}
