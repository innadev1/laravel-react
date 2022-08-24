import React from "react"
import {Form, Input} from "semantic-ui-react"

export default class SegmentComplexSelection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Form style={{marginTop: "20px"}} id="segment-complex-selection">
                <Form.Field
                    control={Input}
                    placeholder='Complex selection'
                    name="complexSelection"
                    value={'' || ''}
                    onChange={this.handleInputChanges}
                />
            </Form>
        )
    }
}
