import React from "react"
import {AddIcon, Pane, SidebarTab, Tablist} from "evergreen-ui"
import {Accordion} from "semantic-ui-react"
import {FaAngleDown, FaAngleUp, FaFile, FaPen, FaPlusCircle, FaTrash, FaBars, FaFolder} from "react-icons/fa"
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import ReactTooltip from "react-tooltip"
import SegmentFilter from "./SegmentsFilter"
import SegmentComplexSelection from "./SegmentComplexSelection"
import SegmentRemoveFolderGroupModal from "./SegmentRemoveFolderGroupModal"
import SegmentFolderGroupModal from "./SegmentFolderGroupModal"
import SegmentCustomerModal from "./SegmentCustomerModal"
import SegmentRemoveCustomersModal from "./SegmentsRemoveCustomersModal";

export default class SegmentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            segments: [],
            selectedIndex: 0,
            activeId: [],
            pickedSelectedIndex: -1,
            pickedActiveIndex: -1,
            selectedLevel: 1,
            parentId: 0
        }
        this.addEditModal = React.createRef();
        this.removeFolderModal = React.createRef();
        this.removeCustomerModal = React.createRef();
        this.addEditCustomerModal = React.createRef();
    }

    UNSAFE_componentWillMount() {
        if (this.props.data) {
            this.setState({segments: this.props.data.state.segmentsListReducer})
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({segments: nextProps.data.state.segmentsListReducer})
    }

    updateSegments = (data) => {
        this.setState({segments: data})
    }

    //Handle accordion click
    handleAccordionClick = (e, id, index) => {
        e.preventDefault();
        const newId = id;
        const newIndex = index;
        let newIds = this.state.activeId;

        if (this.state.activeId.includes(newId)) {
            const index = newIds.indexOf(newId);
            if (index > -1) {
                newIds.splice(index, 1);
            }
        } else {
            newIds.push(newId);
        }

        this.setState({ activeId: newIds, pickedActiveIndex: newIndex, pickedSelectedIndex: 0 })
    }

    moveFolderOrGroup = (e, name) => {
        e.stopPropagation();
    }

    addFolderOrGroup = (e, name, inputName, id, parent_id, level, folder_id) => {
        e.stopPropagation();
        this.addEditModal.current.setData(name, 'add', inputName, id, parent_id, level, folder_id);
    }

    renameFolderOrGroup = (e, name, inputName, id) => {
        e.stopPropagation();
        this.addEditModal.current.setData(name, 'edit', inputName, id);
    }

    removeFolderOrGroup = (e, name, id) => {
        e.stopPropagation();
        this.removeFolderModal.current.setData(name, id);
    }

    addCustomer = (e, groupId) => {
        e.stopPropagation();
        this.addEditCustomerModal.current.setData('add', groupId);
    }

    editCustomer = (e, groupId, customerName, customerCriteria, customerType, id) => {
        e.stopPropagation();
        this.addEditCustomerModal.current.setData('edit', groupId, customerName, customerCriteria, customerType, id);
    }

    removeCustomer = (e, groupId, id) => {
        e.stopPropagation();
        this.removeCustomerModal.current.setData(groupId, id);
    }

    createContent = (segments, pickedSelectedIndex, pickedActiveIndex, activeId, selectedIndex, selectedLevel, parentId, currentLevel = 1) => {
        let levelsArr = [];
        segments.map(data => {
            levelsArr.push(data.level);
        })
        let data = [];

        data.push(
            segments.map((segment, index1) => {
                if (segment.level === currentLevel && parentId === segment.parent_id) {
                    return <Accordion key={segment.id}>
                        <Accordion.Title
                            index={index1}
                            onClick={(event) => this.handleAccordionClick(event, segment.id, index1)}
                        >
                            <div className="move-folder"><FaBars onClick={(event) => this.moveFolderOrGroup(event, 'folder')} className="gray-icon"/></div>
                            <div>{activeId.includes(segment.id) ? <FaAngleUp/> : <FaAngleDown/>} <FaFolder className="gray-icon"/>{segment.folder_name}</div>
                            <div className="settings-icons">
                                <FaPlusCircle onClick={(event) => this.addFolderOrGroup(event, 'folder', '', null, segment.id, segment.level+1)} data-tip="Add folder"/>
                                <FaFile onClick={(event) => this.addFolderOrGroup(event, 'group', '', null, null, null, segment.id)} data-tip="Add group"/>
                                <FaPen onClick={(event) => this.renameFolderOrGroup(event, 'folder', segment.folder_name, segment.id)} data-tip="Add edit"/>
                                <FaTrash onClick={(event) => this.removeFolderOrGroup(event, 'folder', segment.id)} data-tip="Add delete"/>
                                <ReactTooltip />
                            </div>
                        </Accordion.Title>
                        <Accordion.Content active={activeId.includes(segment.id)} className="folder">
                            {segment.groups.map((folder, index2) => (
                                <SidebarTab
                                    key={folder.id}
                                    id={folder.id}
                                    onSelect={() => this.setState({selectedIndex: folder.id, pickedSelectedIndex: index2, pickedActiveIndex: index1})}
                                    isSelected={index1 === pickedActiveIndex && index2 === pickedSelectedIndex}
                                    aria-controls={`panel-${folder.group_name}`}
                                >
                                    <div className="folder-settings">
                                        <div className="move-folder"><FaBars onClick={(event) => this.moveFolderOrGroup(event, 'group')} className="gray-icon"/></div>
                                        <div><FaFile className="gray-icon"/>{folder.group_name}</div>
                                        <div className="settings-icons">
                                            <FaPen onClick={(event) => this.renameFolderOrGroup(event, 'group', folder.group_name, folder.id)} data-tip="Add edit"/>
                                            <FaTrash onClick={(event) => this.removeFolderOrGroup(event, 'group', folder.id)} data-tip="Add delete"/>
                                            <ReactTooltip />
                                        </div>
                                    </div>
                                </SidebarTab>
                            ))}
                            { levelsArr.includes(currentLevel) ? this.createContent(segments, pickedSelectedIndex, pickedActiveIndex, activeId, selectedIndex, selectedLevel, segment.id, currentLevel+1) : '' }
                        </Accordion.Content>
                    </Accordion>
                }
            })
        )

        return data;
    }

    render() {
        const { selectedIndex, activeId, pickedSelectedIndex, pickedActiveIndex, segments, selectedLevel, parentId } = this.state;

        return (
            <div className="card">
                <div className="card-header">Segments</div>
                <div className="card-body">
                    <Pane display="flex">
                        <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
                            <SegmentFilter data={this.props.data.state.segmentsListReducer} updateSegments={this.updateSegments}/>
                            {this.createContent(segments, pickedSelectedIndex, pickedActiveIndex, activeId, selectedIndex, selectedLevel, parentId)}
                            <div><AddIcon className="gray-icon" onClick={(event) => this.addFolderOrGroup(event, 'folder', '', null, 0, 1)}/> Add new folder</div>
                        </Tablist>
                        <Pane padding={16} background="tint1" flex="1">
                            {(segments[pickedActiveIndex] && segments[pickedActiveIndex].groups.length > 0) ?
                                <div>
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <span>{segments[pickedActiveIndex].groups.length > 0 ? segments[pickedActiveIndex].groups[pickedSelectedIndex].group_name : ''}</span>
                                                <AddIcon onClick={(event) => this.addCustomer(event, segments[pickedActiveIndex].groups[pickedSelectedIndex].id)} className="gray-icon" />
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <Table aria-label="customized table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell style={{width: '60px'}}><b>#</b></TableCell>
                                                        <TableCell>Customer name</TableCell>
                                                        <TableCell>Customer criteria</TableCell>
                                                        <TableCell>Customer type</TableCell>
                                                        <TableCell></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {(segments[pickedActiveIndex] && segments[pickedActiveIndex].groups.length > 0) ? segments[pickedActiveIndex].groups[pickedSelectedIndex].customers.map(el => {
                                                            return <TableRow key={el.id}>
                                                                <TableCell style={{width: '60px'}}>{el.id}</TableCell>
                                                                <TableCell>{el.customer_name}</TableCell>
                                                                <TableCell>{el.customer_criteria} </TableCell>
                                                                <TableCell>{el.customer_type}</TableCell>
                                                                <TableCell>
                                                                    <FaPen onClick={(event) => this.editCustomer(event, segments[pickedActiveIndex].groups[pickedSelectedIndex].id, el.customer_name, el.customer_criteria, el.customer_type, el.id)} className="gray-icon"/>
                                                                    <FaTrash onClick={(event) => this.removeCustomer(event, segments[pickedActiveIndex].groups[pickedSelectedIndex].id, el.id)} className="gray-icon"/>
                                                                </TableCell>
                                                            </TableRow>
                                                        }) :
                                                        <TableRow></TableRow>
                                                    }
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                    <SegmentComplexSelection/>
                                </div>
                                :
                                ''
                            }
                        </Pane>
                    </Pane>
                </div>
                <SegmentRemoveFolderGroupModal ref={this.removeFolderModal} updateSegments={this.updateSegments}/>
                <SegmentRemoveCustomersModal ref={this.removeCustomerModal} updateSegments={this.updateSegments}/>
                <SegmentFolderGroupModal ref={this.addEditModal} updateSegments={this.updateSegments}/>
                <SegmentCustomerModal ref={this.addEditCustomerModal} updateSegments={this.updateSegments}/>
            </div>
        )
    }
}
