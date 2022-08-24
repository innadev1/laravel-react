export default {
    //formData
    id: '',
    name: '',
    slug: '',
    owner: '',
    owner_id: '',
    start: '',
    end: '',
    timeZone: {
        label: '',
        value: '',
        time: '',
        offset: '',
    },
    brand: '',
    product: '',
    domain: '',
    groups: [],
    banners: '',
    landingPage: '',

    phone: '',
    email_to: '',
    email_subject: '',
    email_body: '',
    sms_text: '',
    web_push_link: '',
    web_push_text: '',

    active: false,

    //settings
    activeIndex: 0,
    activeTab: 0,
    activeTabIndex: 0,
    editMode: false,

    //arrays with data
    ownerList: [],
    domains: [],
    languages: [{id: '', key: '', menuItem: '', description: '', terms: '', body: '', wysiwygFile: '', imageFile: ''}],
    products: [],
    optionsGroups: [
        { key: '1', text: 'Group 1', value: 'Group 1' },
        { key: '2', text: 'Group 2', value: 'Group 2' },
        { key: '3', text: 'Group 3', value: 'Group 3' },
    ],
    selectOption: [
        { key: '1', text: 'SMS', value: 'sms' },
        { key: '2', text: 'Email', value: 'email' },
        { key: '3', text: 'Web push', value: 'web_push' },
    ],
    selectedField: [],
}
