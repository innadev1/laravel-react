import React from "react"
import Modal from "react-modal"
import {Button, Form} from "semantic-ui-react"
import SegmentService from "../../requests/segmentRequests";

export default class SegmentRemoveFolderGroupModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalRemoveOpen: false,
            categoryName: '',
            id: ''
        }
    }

    setData = (name, id) => {
        this.setState({
            modalRemoveOpen: true,
            categoryName: name,
            id
        })
    }

    handleRemoveClick = (categoryName, id) => {
        if (categoryName === 'folder') {
            SegmentService
                .destroyFolder(id)
                .then((response) => {this.props.updateSegments(response)})
        }
        if (categoryName === 'group') {
            SegmentService
                .destroyGroup(id)
                .then((response) => {this.props.updateSegments(response)})
        }

        //Send new state to main component
        this.setState({
            modalRemoveOpen: false,
        })
    }

    render() {
        const { modalRemoveOpen, categoryName, id } = this.state;

        return (
            <Modal
                appElement={document.getElementById('segments')}
                isOpen={modalRemoveOpen}
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
                <h3>Delete?</h3>
                <Form>
                    <Form.Group className="d-flex justify-content-between">
                        <Form.Field
                            control={Button}
                            content='Yes'
                            onClick={() => this.handleRemoveClick(categoryName, id)}
                            style={{marginTop: 20}}
                        />
                        <Form.Field
                            control={Button}
                            content='No'
                            onClick={() => this.setState({modalRemoveOpen: false})}
                            style={{marginTop: 20}}
                        />
                    </Form.Group>
                </Form>
            </Modal>
        )
    }
}
