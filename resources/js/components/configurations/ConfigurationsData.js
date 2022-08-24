import React from 'react'
import Modal from 'react-modal'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { FaTrash, FaPlusCircle, FaPen } from "react-icons/fa"
import ConfigurationsService from "../../requests/configurationsRequests"
import ReactTooltip from "react-tooltip"
import {Button, Form, Input} from "semantic-ui-react"

export default class ConfigurationsDataComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...this.props};
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
        this.changeBrands(nextProps);
    }

    UNSAFE_componentWillMount() {
        this.changeBrands(this.state);
    }

    changeBrands (data) {
        const { name, domains, languages, products } = data;

        if (name === 'Brands') {
            this.setState({
                domainList: domains.map((el) => {return {key: el.id, text: el.domain_name, value: el.domain_name}}),
                languageList: languages.map((el) => {return {key: el.id, text: el.language_key, value: el.language_key}}),
                productList: products.map((el) => {return {key: el.id, text: el.product_name, value: el.product_name}})
            })
        }
    }

    closeModal = () => {
        this.setState({modalIsOpen: false})
    }

    handleAddClick = () => {
        this.setState({
            modalIsOpen: true,
            id: this.state.data.length > 0 ? this.state.data.slice(-1)[0].id + 1 : 1,
            rowName: '',
            updating: false,
            selectedDomain: [],
            selectedLanguage: [],
            selectedProduct: []
        })
    }

    handleEditClick = (id, rowName, i) => {
        const {data, name} = this.state;

        this.setState({
            modalIsOpen: true,
            id,
            rowName,
            updating: true,
            selectedDomain: name === 'Brands' ? data[i].domains.map(domain => {return domain.domain_name}) : [],
            selectedLanguage: name === 'Brands' ? data[i].languages.map(language => {return language.language_key}) : [],
            selectedProduct: name === 'Brands' ? data[i].products.map(product => {return product.product_name}) : []
        })
    }

    handleInputChange = (event, {name, value}) => {
        this.setState({ [name]: value });
    }

    handleSelectChange = (event, {name, value}) => {
        this.setState({ [name]: value });
    }

    onSaveClick = e => {
        e.preventDefault();
        const { data, configRowName, name, id, rowName, updating, selectedDomain, selectedLanguage, selectedProduct, domains, languages, products} = this.state;
        let passData = { id, [configRowName]: rowName },
            domainArr = [],
            languageArr = [],
            productArr = [];

        if (name === 'Brands') {
            domains.map(opt => { if (selectedDomain.includes(opt.domain_name)) { domainArr.push({id: opt.id, domain_name: opt.domain_name}) } })
            languages.map(opt => { if (selectedLanguage.includes(opt.language_key)) { languageArr.push({id: opt.id, language_key: opt.language_key}) } })
            products.map(opt => { if (selectedProduct.includes(opt.product_name)) { productArr.push({id: opt.id, product_name: opt.product_name}) } })
        }

        if (updating) {
            if (name === 'Brands') {
                passData = { id, [configRowName]: rowName, domainArr, languageArr, productArr }
                ConfigurationsService
                    .updateBrand(passData)
                    .then(() => {})
            } else if (name === 'Domains') {
                ConfigurationsService
                    .updateDomain(passData)
                    .then(() => {})
            } else if (name === 'Languages') {
                ConfigurationsService
                    .updateLanguage(passData)
                    .then(() => {})
            } else if (name === 'Products') {
                ConfigurationsService
                    .updateProduct(passData)
                    .then(() => {})
            }
        } else {
            if (name === 'Brands') {
                passData = { id, [configRowName]: rowName, domainArr, languageArr, productArr }
                ConfigurationsService
                    .storeBrand(passData)
                    .then(() => {})
            } else if (name === 'Domains') {
                ConfigurationsService
                    .storeDomain(passData)
                    .then(() => {})
            } else if (name === 'Languages') {
                ConfigurationsService
                    .storeLanguage(passData)
                    .then(() => {})
            } else if (name === 'Products') {
                ConfigurationsService
                    .storeProduct(passData)
                    .then(() => {})
            }
        }

        if (data.filter(el => el.id === id).length !== 0) {
            let editableIndex = '';
            data.map((el, index) => {
                if (el.id === id) {
                    editableIndex = index;
                }
            })
            const list = [...this.state.data];
            list[editableIndex][configRowName] = rowName;

            if (name === 'Brands') {
                list[editableIndex].domains = domains.filter(opt => selectedDomain.includes(opt.domain_name));
                list[editableIndex].languages = languages.filter(opt => selectedLanguage.includes(opt.language_key));
                list[editableIndex].products = products.filter(opt => selectedProduct.includes(opt.product_name));
            }

            this.setState({ data: list })
        } else {
            this.setState({data:
                 [...this.state.data,
                     {
                        id,
                        [configRowName]: rowName,
                        domains: domains ? domains.filter(opt => selectedDomain.includes(opt.domain_name)) : [],
                        languages: languages ? languages.filter(opt => selectedLanguage.includes(opt.language_key)) : [],
                        products: products ? products.filter(opt => selectedProduct.includes(opt.product_name)) : []
                     }
                ]
            })
        }
        this.closeModal();
    }

    removeModal = (index, id) => {
        this.setState({
            modalDeleteOpen: true,
            modalDeleteIndex: index,
            modalDeleteId: id
        })
    }

    handleRemoveClick = (index, id) => {
        const list = [...this.state.data];
        const { name } = this.state;
        list.splice(index, 1);

        if (name === 'Brands') {
            ConfigurationsService
                .destroyBrand(id)
                .then(() => {})
        } else if (name === 'Domains') {
            ConfigurationsService
                .destroyDomain(id)
                .then(() => {})
        } else if (name === 'Languages') {
            ConfigurationsService
                .destroyLanguage(id)
                .then(() => {})
        } else if (name === 'Products') {
            ConfigurationsService
                .destroyProduct(id)
                .then(() => {})
        }
        this.setState({ data: list, modalDeleteOpen: false, modalDeleteIndex: null, modalDeleteId: null })
    }

    callModalAddEdit = (modalIsOpen, rowName, domainList, selectedDomain, languageList, selectedLanguage, productList, selectedProduct, id, name) => {
        return <Modal
            appElement={document.getElementById('configurations')}
            isOpen={modalIsOpen}
            style={{
                content : {
                    top                   : '50%',
                    left                  : '50%',
                    right                 : 'auto',
                    bottom                : 'auto',
                    width                 :  name === "Brands" ? '1000px' : '500px',
                    transform             : 'translate(-50%, -50%)',
                    overflow              : 'visible'
                }
            }}
        >
            <Form id="form-configurations">
                <Form.Group>
                    <Form.Field
                        control={Input}
                        label='id'
                        placeholder='id'
                        width={6}
                        name="id"
                        readOnly
                        value={id || ''}
                        className='span-input'
                    />
                    <Form.Field
                        control={Input}
                        label='Name'
                        placeholder='Name'
                        width={14}
                        name='rowName'
                        value={rowName || ''}
                        onChange={this.handleInputChange}
                    />
                    {name === "Brands" &&
                    <Form.Select
                        fluid
                        width={14}
                        multiple = {true}
                        label='Domains'
                        options={domainList}
                        placeholder='Domain'
                        name="selectedDomain"
                        value={selectedDomain || ''}
                        onChange={this.handleSelectChange}
                    />}
                    {name === "Brands" &&
                    <Form.Select
                        fluid
                        width={14}
                        multiple = {true}
                        label='Languages'
                        options={languageList}
                        placeholder='Language'
                        name="selectedLanguage"
                        value={selectedLanguage || ''}
                        onChange={this.handleSelectChange}
                    />}
                    {name === "Brands" &&
                    <Form.Select
                        fluid
                        width={14}
                        multiple = {true}
                        label='Products'
                        options={productList}
                        placeholder='Product'
                        name="selectedProduct"
                        value={selectedProduct || ''}
                        onChange={this.handleSelectChange}
                    />}
                </Form.Group>
                <Form.Group className="d-flex justify-content-between">
                    <Form.Field
                        control={Button}
                        content='Save'
                        onClick={this.onSaveClick}
                        style={{marginTop: 20}}
                    />
                    <Form.Field
                        control={Button}
                        content='Close'
                        onClick={this.closeModal}
                        style={{marginTop: 20}}
                    />
                </Form.Group>
            </Form>
        </Modal>
    }

    callModalRemove = (modalDeleteOpen, modalDeleteIndex, modalDeleteId) => {
        return <Modal
            appElement={document.getElementById('configurations')}
            isOpen={modalDeleteOpen}
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
                        onClick={() => this.handleRemoveClick(modalDeleteIndex, modalDeleteId)}
                        style={{marginTop: 20}}
                    />
                    <Form.Field
                        control={Button}
                        content='No'
                        onClick={() => this.setState({modalDeleteOpen: false, modalDeleteIndex: null, modalDeleteId: null})}
                        style={{marginTop: 20}}
                    />
                </Form.Group>
            </Form>
        </Modal>
    }

    render() {
        const { data, name, configRowName, modalIsOpen, id, rowName, domainList, languageList, productList, selectedDomain, selectedLanguage, selectedProduct, modalDeleteOpen, modalDeleteIndex, modalDeleteId } = this.state;

        return (
            <div className={name !== "Brands" ? "col-md-4" : ""}>
                <div className="card">
                    <div className="card-header d-flex justify-content-between">
                        <div>{name}</div>
                        <div>
                            <FaPlusCircle className="gray-icon" data-tip="Add new" style={{marginLeft: '10px'}} onClick={this.handleAddClick} />
                            <ReactTooltip />
                        </div>
                    </div>
                    <div className="card-body">
                        <TableContainer>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{width: '60px'}}><b>#</b></TableCell>
                                        <TableCell><b>{name}</b></TableCell>
                                        {name === "Brands" && <TableCell><b>Domains</b></TableCell> }
                                        {name === "Brands" && <TableCell><b>Languages</b></TableCell> }
                                        {name === "Brands" && <TableCell><b>Products</b></TableCell> }
                                        <TableCell><b>Actions</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((el, i) => {
                                        return <TableRow key={el.id}>
                                            <TableCell style={{width: '60px'}}>{el.id}</TableCell>
                                            <TableCell>
                                                {el[configRowName]}
                                            </TableCell>

                                            {name === "Brands" &&
                                            <TableCell>
                                                {el.domains.map(domain => {
                                                    return <span key={domain.id}>{domain.domain_name} </span>
                                                })}
                                            </TableCell>
                                            }
                                            {name === "Brands" &&
                                            <TableCell>
                                                {el.languages.map(language => {
                                                    return <span key={language.id}>{language.language_key} </span>
                                                })}
                                            </TableCell>
                                            }
                                            {name === "Brands" &&
                                            <TableCell>
                                                {el.products.map(product => {
                                                    return <span key={product.id}>{product.product_name} </span>
                                                })}
                                            </TableCell>
                                            }

                                            <TableCell>
                                                <FaPen className="gray-icon" data-tip="Edit row" onClick={() => this.handleEditClick(el.id, el[configRowName], i)}/>
                                                {data.length !== 1 &&
                                                    <FaTrash className="gray-icon" data-tip="Delete" style={{marginLeft: '10px'}} onClick={() => this.removeModal(i, el.id)} />
                                                }
                                                <ReactTooltip />
                                            </TableCell>
                                        </TableRow>
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {this.callModalAddEdit(modalIsOpen, rowName, domainList, selectedDomain, languageList, selectedLanguage, productList, selectedProduct, id, name)}
                        {this.callModalRemove(modalDeleteOpen, modalDeleteIndex, modalDeleteId)}
                    </div>
                </div>
            </div>
        );
    }
}
