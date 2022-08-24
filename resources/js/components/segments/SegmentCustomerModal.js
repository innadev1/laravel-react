import React from "react";
import Modal from "react-modal";
import {Button, Form, Input} from "semantic-ui-react";
import SegmentService from "../../requests/segmentRequests";

export default class SegmentCustomerModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalAddEditCustomerOpen: false,
            action: '',
            customerName: '',
            customerCriteria: '',
            customerType: '',
            groupId: '',
            id: '',
        }
    }

    setData = (action, groupId, customerName, customerCriteria, customerType, id) => {
        this.setState({
            modalAddEditCustomerOpen: true,
            action,
            customerName,
            customerCriteria,
            customerType,
            groupId,
            id
        })
    }

    handleSaveClick = (action, customerName, customerCriteria, customerType, groupId, id) => {
        if (action === 'add') {
            SegmentService
                .storeCustomer({customer_name: customerName, customer_criteria: customerCriteria, customer_type: customerType, group_id: groupId})
                .then((response) => {this.props.updateSegments(response)})
        }
        if (action === 'edit') {
            SegmentService
                .editCustomer({data: {customer_name: customerName, customer_criteria: customerCriteria, customer_type: customerType, group_id: groupId}, id})
                .then((response) => {this.props.updateSegments(response)})
        }

        this.setState({
            modalAddEditCustomerOpen: false
        })
    }

    handleInputChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }

    render() {
        const { modalAddEditCustomerOpen, action, customerName, customerCriteria, customerType, groupId, id } = this.state;

        return (
            <Modal
                appElement={document.getElementById('segments')}
                isOpen={modalAddEditCustomerOpen}
                style={{
                    content : {
                        top                   : '50%',
                        left                  : '50%',
                        right                 : 'auto',
                        bottom                : 'auto',
                        width                 : '700px',
                        transform             : 'translate(-50%, -50%)',
                        overflow              : 'visible'
                    }
                }}
            >
                <Form>
                    <Form.Group className="d-flex justify-content-between">
                        <Form.Field
                            control={Input}
                            label='Customer name'
                            placeholder='Customer name'
                            name='customerName'
                            value={customerName || ''}
                            onChange={this.handleInputChange}
                        />
                        <Form.Field
                            control={Input}
                            label='Customer criteria'
                            placeholder='Customer criteria'
                            name='customerCriteria'
                            value={customerCriteria || ''}
                            onChange={this.handleInputChange}
                        />
                        <Form.Field
                            control={Input}
                            label='Customer type'
                            placeholder='Customer type'
                            name='customerType'
                            value={customerType || ''}
                            onChange={this.handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-between">
                        <Form.Field
                            control={Button}
                            content='Save'
                            onClick={() => this.handleSaveClick(action, customerName, customerCriteria, customerType, groupId, id)}
                            style={{marginTop: 20}}
                        />
                        <Form.Field
                            control={Button}
                            content='Close'
                            onClick={() => this.setState({modalAddEditCustomerOpen: false})}
                            style={{marginTop: 20}}
                        />
                    </Form.Group>
                </Form>
            </Modal>
        )
    }
}
