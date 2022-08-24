import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Form, Input, Button, Accordion, Menu } from 'semantic-ui-react'
import { DateTimeInput } from 'semantic-ui-calendar-react'
import ReactSummernote from 'react-summernote'
import 'react-summernote/dist/react-summernote.css'
import { FaAngleDown, FaAngleUp, FaPlusCircle, FaTrash } from "react-icons/fa"
import '../../style/components/form.css'
import '../../style/semantic-ui.css'
import { formatDate } from '../../utils/common.js'
import CalendarService from '../../requests/calendarRequests.js'
import FileUploadService from "../../requests/fileUploadRequests";
import UserService from '../../requests/userRequests.js'
import formState from "./formState"
import moment from 'moment'
import SelectTimezone, { getTimezoneProps } from '@capaj/react-select-timezone'
import { strEncodeUTF16 } from "../../utils/common"

export default class FormComponent extends Component{
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = formState;
    }
    wysiwygFileInputRef = React.createRef();
    imageFileInputRef = React.createRef();

    componentDidMount() {
        this._isMounted = true;

        if (this.props) {
            this.setState({
                id: this.props.data.state.calendarReducer.length > 0 ? this.props.data.state.calendarReducer.slice(-1)[0].id + 1 : 1,
                owner: this.props.data.name,
            });
        }
        let allUsers = [];
        UserService
            .get()
            .then((response) => {
                response.map(event => {
                    allUsers.push({
                        key: event.id,
                        text: event.name,
                        value: event.name,
                    })
                })
                if (this._isMounted) {
                    this.setState({
                        ownerList: allUsers
                    });
                }
            })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    //Handle input changes
    handleInputChanges = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }

        if (name === 'brand') {
            this.setState({
                domains: this.getBrandData(value, 'domains'),
                products: this.getBrandData(value, 'products'),
                languages: this.getBrandData(value, 'languages'),
            });
        }
        if (name === 'domain') {
            this.setState({ activeTab: this.state.languages[0].menuItem })
        }

        if (name === 'selectedField') {
            if (!value.includes('email')) {
                this.setState({ email_to: '', email_subject: '', email_body: '' });
            }
            if (!value.includes('sms')) {
                this.setState({ sms_text: ''});
            }
            if (!value.includes('web_push')) {
                this.setState({ web_push_link: '', web_push_text: '' });
            }
        }
    }

    //Insert image in react-summernote components
    onImageUpload = (fileList, insertImage, name) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            insertImage(reader.result);
        }
        reader.readAsDataURL(fileList[0]);

        if (name === "email_body_files") {
            let fileData = [];
            if (this.state[name]) {
                fileData.push(...this.state[name], fileList[0].name)
            } else {
                fileData.push(fileList[0].name)
            }
            this.uploadFile(fileList[0])
            this.setState({[name]: fileData})
        } else {
            this.handleTranslationContentChange(fileList, name, this.state.activeTabIndex)
        }
    }

    // Translations content
    handleTranslationContentChange = (data, name, activeTabIndex = null) => {
        let setData = [];
        if (name === 'wysiwygFile' || name === 'imageFile' || name === 'description_files' || name === 'body_files') {
            const fileName = data.target ? data.target.files[0].name : data[0].name;
            if (this.state.languages[activeTabIndex][name]) {
                setData.push(...this.state.languages[activeTabIndex][name], fileName)
            } else {
                setData.push(fileName)
            }
            this.uploadFile(data.target ? data.target.files[0] : data[0])
        } else {
            setData = data;
        }

        this.setState(prevState => ({
            languages: prevState.languages.map(
                (el, index) => index === this.state.activeTabIndex ? { ...el, [name]: setData }: el
            )
        }))
    }

    uploadFile = (file) => {
        const formData = new FormData();
        formData.append('file', file);
        FileUploadService
            .uploadFile(formData)
            .then(() => {})
    }

    removeFileFromList = (array, file, activeTabIndex) => {
        this.state.languages[activeTabIndex][array].map(data => {
            if (data === file) {
                const index = array.indexOf(data);
                this.state.languages[activeTabIndex][array].splice(index, 1);
                this.forceUpdate();
            }
        })
    }

    //Handle time zone
    setSelectedTimezone = (tz) => {
        this.setState({ timeZone: tz });
    }

    //Handle accordion click
    handleAccordionClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    //Handle tab click
    handleTabClick = (name, index) => {
        this.setState({ activeTab: name, activeTabIndex: index })
    }

    //Set dates when opening new campaign form
    setSlotData(start, end) { this.setState({ start, end}) }

    //Get domains, languages, products depending on brand
    getBrandData(param, name, edit = false) {
        let returnArr = [],
            currentItemVal = param;

        if (edit) {
            currentItemVal = [];
            param.map(data => { currentItemVal.push(data.value) })
        }

        this.props.data.state.brandsFullViewReducer.map(data => {
            if (currentItemVal.includes(data.value)) {
                if (name === 'domains') {
                    data.domains.map(a => {
                        returnArr.push(a)
                    })
                } else if (name === 'products') {
                    data.products.map(a => {
                        returnArr.push(a)
                    })
                } else if (name === 'languages') {
                    data.languages.map(a => {
                        returnArr.push({id: a.id, key: a.key, menuItem: a.menuItem, description: a.description || '', body: a.body || '', terms: a.terms || '', imageFile: a.imageFile || [], wysiwygFile: a.wysiwygFile || []})
                    })
                }
            }
        })

        if (name === 'languages') {
            return returnArr.filter((v,i,a)=>a.findIndex(t=>(t.key === v.key && t.menuItem===v.menuItem))===i);
        } else {
            return returnArr.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id && t.key===v.key))===i);
        }
    }

    setEditData(id) {
        this.props.data.state.calendarReducer.map(data => {
            if (data.id === id) {
                const { email_to, email_subject, email_body, sms_text, web_push_link, web_push_text } = data;
                const languageList = this.getBrandData(data.brands, 'languages', true);
                let brandValues = [],
                    productValues = [];

                data.brands.map(data => { brandValues.push(data.value) })
                data.products.map(data => { productValues.push(data.value) })

                data.translations.map(translation => {
                    languageList.map((lang, index) => {
                        if (translation.language_id === lang.id) {
                            languageList[index].description = translation.description;
                            languageList[index].body = translation.body;
                            languageList[index].terms = translation.terms;
                            let images = [],
                                wysiwygs = [];
                            translation.image.map(image => {images.push(image.image_name)})
                            translation.wysiwyg.map(wysiwyg => {wysiwygs.push(wysiwyg.wysiwyg_name)})
                            languageList[index].imageFile = images;
                            languageList[index].wysiwygFile = wysiwygs;
                        }
                    })
                })

                this.setState({
                    editMode: true,
                    ...data,
                    start: formatDate(data.start.toString(), false),
                    end: formatDate(data.end.toString(), false),
                    products: this.getBrandData(data.brands, 'products', true),
                    domains: this.getBrandData(data.brands, 'domains', true),
                    brand: brandValues,
                    product: productValues,
                    domain: data.domains[0] ? data.domains[0].value : '',
                    languages: languageList,
                    activeTab: languageList.length > 0 ? languageList[0].menuItem : [],
                    selectedField: [sms_text && 'sms', (email_to || email_subject || email_body) && 'email', (web_push_link || web_push_text) && 'web_push']
                })
            }
        })
    }

    unsetEditMode() {
        this.setState({
            ...formState,
            timeZone: {
                label: '',
                value: '',
                time: '',
                offset: '',
            },
            editMode: false,
            id: this.props.data.state.calendarReducer.length > 0 ? this.props.data.state.calendarReducer.slice(-1)[0].id + 1 : 1,
            owner: this.props.data.name,
            ownerList: this.state.ownerList,
        });
    }

    //Set data to database
    onSaveClick = e => {
        e.preventDefault();
        const { editMode, id, name, slug, owner, ownerList, start, end, timeZone, brand, product, products, domain, domains, languages, groups, banners, landingPage, phone, email_to, email_subject, email_body, sms_text, web_push_link, web_push_text } = this.state;

        const data = {  id,
                        name,
                        slug,
                        owner,
                        owner_id: ownerList.filter(data => data.value === owner )[0].key,
                        start_d: moment(new Date(start)).utcOffset(timeZone.offset).format(),
                        end_d: moment(new Date(end)).utcOffset(timeZone.offset).format(),
                        brands_arr: this.props.data.state.brandsFullViewReducer.filter(data => brand.includes(data.value)),
                        products_arr: products.filter(data => product.includes(data.value)),
                        domains_arr: domains.filter(data => domain === data.value),
                        languages_arr: languages,
                        groups: groups ? groups.toString() : '',
                        banners,
                        landingPage,
                        phone,
                        email_to,
                        email_subject,
                        email_body,
                        sms_text,
                        web_push_link,
                        web_push_text,
                        active: true };

        if (!editMode) {
            CalendarService
                .store(data)
                .then((response) => {
                    this.props.updateCalendarData(response)
                })
        } else {
            CalendarService
                .edit({data, id})
                .then((response) => {
                    this.props.updateCalendarData(response)
                })
        }
    }

    render() {
        const { id, name, slug, owner, start, end, timeZone, brand, product, domain, groups, banners, landingPage, phone, email_to, email_subject, email_body, email_body_files, sms_text, web_push_link, web_push_text, ownerList, activeIndex, activeTab, activeTabIndex, optionsGroups, products, domains, languages, selectOption, selectedField } = this.state;
        const brands = this.props.data.state.brandsFullViewReducer;
        const isCompletedFirstStep = ( name && name.length > 0 && slug && slug.length > 0 && start && start.length > 0 && end && end.length > 0 && brand && brand.length > 0 && product && product.length > 0);
        let brandArr = [],
            productsArr = [],
            groupsArr = [];

        if (brand) { brands.map(opt => { if (brand.includes(opt.value)) { brandArr.push(opt.value) } })}
        if (product) { products.map(prod => { if (product.includes(prod.value)) { productsArr.push(prod.value) } }) }
        if (groups) { optionsGroups.map(opt => { if (groups.includes(opt.value)) { groupsArr.push(opt.value) } }) }

        return (
            <div className="container">
                    <Form id="form-campaign">
                        <Form.Group>
                            <Form.Field
                                id='form-input-control-campaign-number'
                                control={Input}
                                label='Campaign number'
                                placeholder='Campaign number'
                                width={6}
                                name="campaignNumber"
                                readOnly
                                value={id}
                            />
                            <Form.Field
                                id='form-input-control-first-name'
                                control={Input}
                                label='Name'
                                placeholder='Name'
                                width={14}
                                name="name"
                                value={name || ''}
                                onChange={this.handleInputChanges}
                            />
                        </Form.Group>
                        <Form.Field
                            id='form-input-control-slug'
                            control={Input}
                            label='Slug'
                            placeholder='Slug'
                            name="slug"
                            value={slug || ''}
                            onChange={this.handleInputChanges}
                        />
                        <Form.Dropdown
                            placeholder="Owner"
                            name="owner"
                            label="Owner"
                            selection
                            options={ownerList}
                            value={owner || ''}
                            onChange={this.handleInputChanges}
                        />
                        <Form.Group>
                            <DateTimeInput
                                name="start"
                                label="Start date"
                                placeholder="Start date"
                                iconPosition="left"
                                dateFormat='YYYY-MM-DD'
                                autoComplete="off"
                                maxDate={end}
                                value={start || ''}
                                onChange={this.handleInputChanges}
                                width={16}
                            />
                            <DateTimeInput
                                name="end"
                                label="End date"
                                placeholder="End date"
                                iconPosition="left"
                                dateFormat='YYYY-MM-DD'
                                autoComplete="off"
                                minDate={start}
                                value={end || ''}
                                onChange={this.handleInputChanges}
                                width={16}
                            />
                            <div className="time-zone-field">
                                <label>Time zone</label>
                                <SelectTimezone
                                    value={timeZone || ''}
                                    guess
                                    onChange={(val) => { this.setSelectedTimezone(getTimezoneProps(val)) }}
                                />
                            </div>
                        </Form.Group>
                        { (start && end) ? <label>Duration {Math.ceil(Math.abs((moment(end)._d).getTime() - (moment(start)._d).getTime()) / (1000 * 3600 * 24))} days</label> : ''}
                        <Form.Select
                            fluid
                            multiple = {true}
                            label='Brand'
                            options={brands}
                            placeholder='Brand'
                            name="brand"
                            value={brandArr || ''}
                            onChange={this.handleInputChanges}
                        />
                        <Form.Select
                            fluid
                            multiple = {true}
                            label='Product verticals'
                            options={products}
                            placeholder='Product verticals'
                            name="product"
                            value={productsArr || ''}
                            onChange={this.handleInputChanges}
                        />
                        <div className={isCompletedFirstStep ? "visible": "hidden"}>
                            <Form.Dropdown
                                placeholder="Domain"
                                name="domain"
                                label="Domain"
                                selection
                                options={domains}
                                value={domain || ''}
                                onChange={this.handleInputChanges}
                            />
                        </div>
                        <div id="second-step" className={ domain ? (domain.length > 0 ? "visible": "hidden") : "hidden"}>
                            <Menu secondary>
                                {languages ? languages.map((data, index) => {
                                    return <Menu.Item
                                        key={data.key}
                                        name={data.menuItem}
                                        active={activeTab === data.menuItem}
                                        onClick={this.handleTabClick.bind(this, data.menuItem, index)}
                                    >
                                        {data.menuItem}
                                    </Menu.Item>
                                }) : ''}
                            </Menu>
                            <div>
                                <label>Description {activeTab}</label>
                                <ReactSummernote
                                    id="description_files"
                                    value={(languages.length > 0 && languages[activeTabIndex].description) ? languages[activeTabIndex].description : ''}
                                    options={{
                                        height: 100,
                                        dialogsInBody: true,
                                        toolbar: [
                                            ['font', ['bold', 'italic', 'underline']],
                                            ['fontname', ['fontname']],
                                            ['para', ['ul', 'ol', 'paragraph']],
                                            ['table', ['table']],
                                            ['insert', ['picture']],
                                            ['view', ['fullscreen']]
                                        ]
                                    }}
                                    onChange={(content) => {
                                        this.handleTranslationContentChange(content, 'description');
                                    }}
                                    onImageUpload={(fileList, insertImage) => {
                                        this.onImageUpload(fileList, insertImage, 'description_files')
                                    }}
                                    onInit={(note) => {
                                        if (languages.length > 0 && languages[activeTabIndex].description) {
                                            note.summernote('pasteHTML', languages[activeTabIndex].description)
                                        }
                                    }}
                                />
                                <label>Terms {activeTab}</label>
                                <ReactSummernote
                                    value={(languages.length > 0 && languages[activeTabIndex].terms) ? languages[activeTabIndex].terms : ''}
                                    options={{
                                        height: 100,
                                        dialogsInBody: true,
                                        toolbar: [
                                            ['font', ['bold', 'italic']],
                                            ['para', ['ul']],
                                            ['table', ['table']],
                                            ['view', ['fullscreen']]
                                        ]
                                    }}
                                    onChange={(content) => {
                                        this.handleTranslationContentChange(content, 'terms');
                                    }}
                                    onInit={(note) => {
                                        if (languages.length > 0 && languages[activeTabIndex].terms) {
                                            note.summernote('pasteHTML', languages[activeTabIndex].terms)
                                        }
                                    }}
                                />
                                <label>Body {activeTab}</label>
                                <ReactSummernote
                                    id="body_files"
                                    value={(languages.length > 0 && languages[activeTabIndex].body) ? languages[activeTabIndex].body : ''}
                                    options={{
                                        height: 100,
                                        dialogsInBody: true,
                                        toolbar: [
                                            ['font', ['bold', 'italic', 'underline']],
                                            ['para', ['ul', 'ol', 'paragraph']],
                                            ['table', ['table']],
                                            ['insert', ['picture']],
                                            ['view', ['fullscreen']]
                                        ]
                                    }}
                                    onChange={(content) => {
                                        this.handleTranslationContentChange(content, 'body');
                                    }}
                                    onImageUpload={(fileList, insertImage) => {
                                        this.onImageUpload(fileList, insertImage, 'body_files')
                                    }}
                                    onInit={(note) => {
                                        if (languages.length > 0 && languages[activeTabIndex].body) {
                                            note.summernote('pasteHTML', languages[activeTabIndex].body)
                                        }
                                    }}
                                />
                                <label>Design considerations</label>
                                <Form.Field>
                                    <Button
                                        content="Wysiwyg upload"
                                        labelPosition="left"
                                        icon="file"
                                        onClick={() => this.wysiwygFileInputRef.current.click()}
                                    />
                                    <input
                                        id="wysiwygFile"
                                        ref={this.wysiwygFileInputRef}
                                        type="file"
                                        multiple
                                        hidden
                                        onChange={(event) => {
                                            this.handleTranslationContentChange(event, 'wysiwygFile', activeTabIndex);
                                        }}
                                    />
                                    <Button
                                        content="Image upload"
                                        labelPosition="left"
                                        icon="image"
                                        onClick={() => this.imageFileInputRef.current.click()}
                                    />
                                    <input
                                        id="imageFile"
                                        ref={this.imageFileInputRef}
                                        type="file"
                                        multiple
                                        hidden
                                        onChange={(event) => {
                                            this.handleTranslationContentChange(event, 'imageFile', activeTabIndex);
                                        }}
                                    />
                                </Form.Field>
                                {(languages.length > 0 && languages[activeTabIndex].wysiwygFile.length > 0) ? <h5>Wysiwyg files : </h5> : null}
                                {(languages.length > 0 && languages[activeTabIndex].wysiwygFile) ? languages[activeTabIndex].wysiwygFile.map((data, index) => {
                                    return <div key={index}>{data} <FaTrash onClick={() => {this.removeFileFromList('wysiwygFile', data, activeTabIndex)}}/></div>
                                }) : null}
                                {(languages.length > 0 && languages[activeTabIndex].imageFile.length > 0) ? <h5>Image files: </h5> : null}
                                {(languages.length > 0 && languages[activeTabIndex].imageFile) ? languages[activeTabIndex].imageFile.map((data, index) => {
                                    return <div key={index}>{data} <FaTrash onClick={() => {this.removeFileFromList('imageFile', data, activeTabIndex)}}/></div>
                                }) : null}
                                <div className="card">
                                    <div className="card-header">
                                        <Form.Select
                                            fluid
                                            multiple = {true}
                                            label='Select campaign'
                                            options={selectOption}
                                            placeholder='Select'
                                            name="selectedField"
                                            value={selectedField || ''}
                                            onChange={this.handleInputChanges}
                                        />
                                    </div>
                                    <div className="card-body">
                                    {/*EMAIL*/}
                                    {selectedField.includes('email') &&
                                        <div>
                                            <div className="alert alert-info mb-3">Email</div>
                                            <Form.Field
                                                control={Input}
                                                label='To'
                                                placeholder='To'
                                                name="email_to"
                                                value={email_to || ''}
                                                onChange={this.handleInputChanges}
                                            />
                                            <Form.Field
                                                control={Input}
                                                label='Subject'
                                                placeholder='Subject'
                                                name="email_subject"
                                                value={email_subject || ''}
                                                onChange={this.handleInputChanges}
                                            />
                                            <label>Body</label>
                                            <ReactSummernote
                                                id="email_body_files"
                                                value={email_body || ''}
                                                options={{
                                                    height: 100,
                                                    dialogsInBody: true,
                                                    toolbar: [
                                                        ['font', ['bold', 'italic', 'underline']],
                                                        ['para', ['ul', 'ol', 'paragraph']],
                                                        ['insert', ['picture']],
                                                        ['view', ['fullscreen']]
                                                    ],
                                                }}
                                                onChange={(event) => {
                                                    this.setState({email_body: event})
                                                }}
                                                onImageUpload={(fileList, insertImage) => {
                                                    this.onImageUpload(fileList, insertImage, 'email_body_files')
                                                }}
                                                onInit={(note) => {
                                                    if (email_body) {
                                                        note.summernote('pasteHTML', email_body)
                                                    }
                                                }}
                                            />
                                        </div>
                                    }
                                    {/*SMS*/}
                                    {selectedField.includes('sms') &&
                                        <div>
                                            <div className="alert alert-info mb-3 mt-3">SMS</div>
                                            <Form.TextArea
                                                label='Text'
                                                placeholder='Text'
                                                name="sms_text"
                                                value={sms_text || ''}
                                                onChange={this.handleInputChanges}
                                            />
                                            <h5>Symbol count: {sms_text ? strEncodeUTF16(sms_text).length : null}</h5>
                                        </div>
                                    }
                                    {/*WEB PUSH*/}
                                    {selectedField.includes('web_push') &&
                                        <div>
                                            <div className="alert alert-info mb-3 mt-3">Web push</div>
                                            <Form.Field
                                                control={Input}
                                                label='Link'
                                                placeholder='Link'
                                                name="web_push_link"
                                                value={web_push_link || ''}
                                                onChange={this.handleInputChanges}
                                            />
                                            <Form.TextArea
                                                label='Web push text'
                                                placeholder='Web push text'
                                                name="web_push_text"
                                                value={web_push_text || ''}
                                                onChange={this.handleInputChanges}
                                            />
                                        </div>
                                    }
                                </div>
                            </div>
                            <Accordion>
                                <Accordion.Title
                                    active={activeIndex === 1}
                                    index={1}
                                    onClick={this.handleAccordionClick}
                                >
                                    {activeIndex === 1 ? <FaAngleUp /> : <FaAngleDown />} Select groups
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === 1}>
                                    <Form.Select
                                        fluid
                                        multiple = {true}
                                        label='Groups'
                                        options={optionsGroups}
                                        placeholder='Groups'
                                        name="groups"
                                        value={groupsArr || ''}
                                        onChange={this.handleInputChanges}
                                    />
                                </Accordion.Content>
                            </Accordion>
                            <Accordion>
                                <Accordion.Title
                                    active={activeIndex === 2}
                                    index={2}
                                    onClick={this.handleAccordionClick}
                                >
                                    {activeIndex === 2 ? <FaAngleUp /> : <FaAngleDown />} Add site banners
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === 2}>
                                    <Form.Field
                                        id='form-input-control-banners'
                                        control={Input}
                                        label='Banners'
                                        placeholder='Banners'
                                        name="banners"
                                        value={banners || ''}
                                        onChange={this.handleInputChanges}
                                    />
                                    <FaPlusCircle />
                                </Accordion.Content>
                            </Accordion>
                            <Accordion>
                                <Accordion.Title
                                    active={activeIndex === 3}
                                    index={3}
                                    onClick={this.handleAccordionClick}
                                >
                                    {activeIndex === 3 ? <FaAngleUp /> : <FaAngleDown />} Add a landing page
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === 3}>
                                    <Form.Field
                                        id='form-input-control-landing-page'
                                        control={Input}
                                        label='Landing page'
                                        placeholder='Landing page'
                                        name="landingPage"
                                        value={landingPage || ''}
                                        onChange={this.handleInputChanges}
                                    />
                                </Accordion.Content>
                            </Accordion>
                            <Accordion>
                                <Accordion.Title
                                    active={activeIndex === 4}
                                    index={4}
                                    onClick={this.handleAccordionClick}
                                >
                                    {activeIndex === 4 ? <FaAngleUp /> : <FaAngleDown />} Phone
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === 4}>
                                    <Form.Field
                                        control={Input}
                                        label='Phone'
                                        placeholder='Phone'
                                        name="phone"
                                        value={phone || ''}
                                        onChange={this.handleInputChanges}
                                    />
                                </Accordion.Content>
                            </Accordion>
                        </div>
                    </div>
                    <Form.Group>
                        <Form.Field
                            id='form-button-control-public'
                            control={Button}
                            content='Save'
                            label=''
                            onClick={this.onSaveClick}
                            style={{marginTop: 20}}
                        />
                    </Form.Group>
                </Form>
        </div>
    );
}
}

if (document.getElementById('FormComponent')) {
    const element = document.getElementById('FormComponent')
    const props = Object.assign({}, element.dataset)
    ReactDOM.render(<FormComponent {...props}/>, element);
}
