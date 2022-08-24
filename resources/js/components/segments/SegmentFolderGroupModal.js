import React from "react"
import Modal from "react-modal"
import {Button, Form, Input} from "semantic-ui-react"
import SegmentService from "../../requests/segmentRequests"

export default class SegmentFolderGroupModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalAddEditOpen: false,
            name: '',
            action: '',
            inputName: '',
            id: '',
            parent_id: '',
            level: '',
            folder_id: ''
        }
    }

    setData = (name, action, inputName = '', id = null, parent_id = null, level = null, folder_id = null) => {
        this.setState({
            modalAddEditOpen: true,
            name,
            action,
            inputName,
            id,
            parent_id,
            level,
            folder_id
        })
    }

    handleSaveClick = (name, action, inputName, id, parent_id, level, folder_id) => {
        if (name === 'folder') {
          if (action === 'add') {
              SegmentService
                  .storeFolder({folder_name: inputName, parent_id, level})
                  .then((response) => {this.props.updateSegments(response)})
          }
          if (action === 'edit') {
              SegmentService
                  .editFolder({data: {folder_name: inputName}, id})
                  .then((response) => {this.props.updateSegments(response)})
          }
        }

        if (name === 'group') {
            if (action === 'add') {
                SegmentService
                    .storeGroup({group_name: inputName, folder_id})
                    .then((response) => {this.props.updateSegments(response)})
            }
            if (action === 'edit') {
                SegmentService
                    .editGroup({data: {group_name: inputName}, id})
                    .then((response) => {this.props.updateSegments(response)})
            }
        }

        this.setState({
            modalAddEditOpen: false
        })
    }

    handleInputChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }

    render() {
        const { modalAddEditOpen, inputName, action, name, id, parent_id, level, folder_id } = this.state;

        return (
            <Modal
                appElement={document.getElementById('segments')}
                isOpen={modalAddEditOpen}
                style={{
                    content : {
                        top                   : '50%',
                        left                  : '50%',
                        right                 : 'auto',
                        bottom                : 'auto',
                        width                 : '500px',
                        transform             : 'translate(-50%, -50%)',
                        overflow              : 'visible'
                    }
                }}
            >
                <Form>
                    <Form.Field
                        control={Input}
                        label='Name'
                        placeholder='Name'
                        name='inputName'
                        value={inputName || ''}
                        onChange={this.handleInputChange}
                    />
                    <Form.Group className="d-flex justify-content-between">
                        <Form.Field
                            control={Button}
                            content='Save'
                            onClick={() => this.handleSaveClick(name, action, inputName, id, parent_id, level, folder_id)}
                            style={{marginTop: 20}}
                        />
                        <Form.Field
                            control={Button}
                            content='Close'
                            onClick={() => this.setState({modalAddEditOpen: false})}
                            style={{marginTop: 20}}
                        />
                    </Form.Group>
                </Form>
            </Modal>
        )
    }
}
