import React from "react"
import {Form, Input} from "semantic-ui-react"

export default class SegmentFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputName: ''
        }
    }

    handleInputChange = (event, {name, value}) => {
        this.setState({ inputName: value });

        let segments = [];

        this.props.data.map(data => {
            data.groups.map(group => {
                if (data.folder_name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
                    group.group_name.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                    //NEED TO BE ADDED WHOLE LEVEL CHECK
                    segments.push(data);
                }
            })
        })

        if (value.length === 0) {
            this.props.updateSegments(this.props.data);
        } else {
            this.props.updateSegments(segments.filter((v,i,a)=>a.findIndex(t=>(t.id===v.id))===i));
        }
    }

    render() {
        const { inputName } = this.state;

        return (
            <Form id="segment-filter">
                <Form.Field
                    control={Input}
                    placeholder='Quick search'
                    name='inputName'
                    value={inputName || ''}
                    onChange={this.handleInputChange}
                    autoComplete="off"
                />
            </Form>
        )
    }
}
