import React, {Component} from "react"
import {bindActionCreators} from "redux"
import {connect, Provider} from "react-redux"
import {store} from "../../state/store"
import ReactDOM from "react-dom"
import SegmentComponent from "./SegmentComponent"
import SegmentService from "../../requests/segmentRequests"
import {setSegments} from "../../actions"
import '../../style/components/segments.css'

export class SegmentsComponent extends Component {
    constructor(props) {
        super(props);
    }

    UNSAFE_componentWillMount() {
        const { setSegments } = this.props;

        SegmentService
            .get()
            .then((response) => {
                this.setState({segments: response});
                setSegments(response);
            })
    }

    render() {
        return (
            <div id="segments">
                <SegmentComponent data={this.props}/>
            </div>
        )}
}

function mapStateToProps(state){ return { state } }
const mapDispatchToProps = dispatch => bindActionCreators({ setSegments }, dispatch)
export const SegmentsContainer = connect(mapStateToProps, mapDispatchToProps)(SegmentsComponent);

class Segments extends Component {
    render () {
        return (
            <Provider store={store}>
                <SegmentsContainer {...this.props} />
            </Provider>
        );
    }
}
export default Segments;

if (document.getElementById('Segments')) {
    const element = document.getElementById('Segments')
    const props = Object.assign({}, element.dataset)
    ReactDOM.render(<Segments {...props}/>, element);
}
