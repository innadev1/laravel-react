import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect, Provider } from 'react-redux'
import { store } from "../../state/store"
import { bindActionCreators } from "redux"
import ConfigurationsDataComponent from "./ConfigurationsData"
import { setBrands, setDomains, setLanguages, setProducts } from "../../actions"
import ConfigurationsService from "../../requests/configurationsRequests"
import '../../style/components/configurations.css'

export class ConfigurationsComponent extends Component{
    constructor(props) {
        super(props);
    }

    UNSAFE_componentWillMount() {
        const { setBrands, setDomains, setLanguages, setProducts } = this.props;
        ConfigurationsService
            .getBrand()
            .then((response) => {
                setBrands(response);
            })
        ConfigurationsService
            .getDomain()
            .then((response) => {
                setDomains(response);
            })
        ConfigurationsService
            .getLanguage()
            .then((response) => {
                setLanguages(response);
            })
        ConfigurationsService
            .getProduct()
            .then((response) => {
                setProducts(response);
            })
    }

    render() {
        const { brandsListReducer, domainsListReducer, languagesListReducer, productsListReducer } = this.props.state;

        return (
            <div className="container" id="configurations">
                <ConfigurationsDataComponent data={brandsListReducer} name="Brands" configRowName="brand_name" domains={domainsListReducer} languages={languagesListReducer} products={productsListReducer}/>
                <div className="d-flex justify-content-center" style={{marginTop: '50px'}}>
                    <ConfigurationsDataComponent data={domainsListReducer} name="Domains" configRowName="domain_name"/>
                    <ConfigurationsDataComponent data={languagesListReducer} name="Languages" configRowName="language_key"/>
                    <ConfigurationsDataComponent data={productsListReducer} name="Products"configRowName="product_name"/>
                </div>
            </div>
        )}
}

function mapStateToProps(state){ return { state } }
const mapDispatchToProps = dispatch => bindActionCreators({setBrands, setDomains, setLanguages, setProducts}, dispatch)
export const ConfigurationsContainer = connect(mapStateToProps, mapDispatchToProps)(ConfigurationsComponent);

class Configurations extends Component {
    render () {
        return (
            <Provider store={store}>
                <ConfigurationsContainer {...this.props}/>
            </Provider>
        );
    }
}
export default Configurations;

if (document.getElementById('Configurations')) {
    const element = document.getElementById('Configurations')
    const props = Object.assign({}, element.dataset)
    ReactDOM.render(<Configurations {...props}/>, element);
}
