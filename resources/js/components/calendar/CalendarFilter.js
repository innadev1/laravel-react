import React from "react"
import {Button, Form} from "semantic-ui-react"
import '../../style/components/calendar.css'

export default class CalendarFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            brand: [],
            product: []
        }
    }

    handleInputChanges = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }

    onButtonClick = e => {
        e.preventDefault();

        const { calendarReducer } = this.props.data.state;
        const { brand, product } = this.state;
        let returnArr = [];

        if (brand.length > 0 || product.length > 0) {
            calendarReducer.map(data => {
                brand.map(b => {
                    data.brands.map(dataBrand => {
                        if (dataBrand.value === b) {
                            returnArr.push(data)
                        }
                    })
                })
                product.map(p => {
                    data.products.map(dataProduct => {
                        if (dataProduct.value === p) {
                            returnArr.push(data)
                        }
                    })
                })
            })
            this.props.updateFilteredEvents(returnArr.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i));
        } else {
            this.props.updateFilteredEvents(calendarReducer);
        }
    }

    render() {
        const { brandsFullViewReducer, productsListReducer } = this.props.data.state;
        const brands = brandsFullViewReducer;
        let products = [];
        productsListReducer.map(data => {
            products.push({
                key: data.id,
                text: data.product_name,
                value: data.product_name,
            })
        })
        const { brand, product } = this.state;

        return (
            <div style={{marginBottom: 10}} >
                <h5>Filter by:</h5>
                <Form id="calendar-filter" className="d-flex">
                    <Form.Select
                        fluid
                        multiple = {true}
                        options={brands}
                        placeholder='Brand'
                        name="brand"
                        value={brand}
                        onChange={this.handleInputChanges}
                    />
                    <Form.Select
                        fluid
                        multiple = {true}
                        options={products}
                        placeholder='Product'
                        name="product"
                        value={product}
                        onChange={this.handleInputChanges}
                    />
                    <Form.Field
                        control={Button}
                        content='Filter'
                        onClick={this.onButtonClick}
                    />
                </Form>
            </div>
        )
    }
}
