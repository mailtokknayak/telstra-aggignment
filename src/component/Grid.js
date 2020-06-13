import React from 'react';
import {Container, Row, Col, DropdownButton, Dropdown} from 'react-bootstrap'
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Profile from "./Profile";
import Filter from "./Filters";
const baseUrl = "https://rickandmortyapi.com/api/character/"

class ProfileGrid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {rmCharList: [], selectedFilter: [], uniqueSpecies: [], uniqueOrigin: [], uniqueGender: []}
        this.handleChange = this.handleChange.bind(this)
        this.sortByIdAsc = this.sortByIdAsc.bind(this)
        this.sortByIdDesc = this.sortByIdDesc.bind(this)
        this.applyFilter = this.applyFilter.bind(this)
    }

    componentDidMount() {
        axios.get(baseUrl)
            .then((response) => {
                const uniqueSpecies = new Set(response.data.results.map(result => result.species));
                const uniqueOrigin = new Set(response.data.results.map(result => result.status));
                const uniqueGender = new Set(response.data.results.map(result => result.gender));
                this.setState({
                    rmCharList: response.data.results,
                    uniqueSpecies: uniqueSpecies,
                    uniqueOrigin: uniqueOrigin,
                    uniqueGender: uniqueGender
                })
            })
    }


    applyFilter() {
        let queryParam = "";
        const queryFilter = this.state.selectedFilter.length > 0 && this.state.selectedFilter.map((filter, index) => {
            return queryParam = queryParam.concat(filter.type + "=" + filter.value + "&")
        })
        const url = baseUrl+"?" + queryParam.substring(0, queryParam.length - 1);
        axios.get(url)
            .then((response) => {
                this.setState({rmCharList: response.data.results})
            })
    }

    handleChange = (e) => {
        let selectedFilter = this.state.selectedFilter
        if (e.target.checked) {
            selectedFilter.push({type: e.target.id.split('_')[0], value: e.target.value})
        } else {
            selectedFilter.splice(selectedFilter.indexOf(e.target.value), 1);
        }
        this.setState({selectedFilter: selectedFilter}, () => this.applyFilter())
    }

    sortByIdAsc() {
        let rmCharList = this.state.rmCharList.sort((a, b) => (a.id - b.id))
        this.setState({rmCharList: rmCharList});
    }

    sortByIdDesc() {
        let rmCharList = this.state.rmCharList.sort((a, b) => (b.id - a.id))
        this.setState({rmCharList: rmCharList});
    }

    render() {
        const divStyleForList = {
            "marginTop": '50px',
            "marginLeft": '100px'
        };
        const speciesList = this.state.uniqueSpecies.size > 0 && this.state.uniqueSpecies
        const originList = this.state.uniqueOrigin.size > 0 && this.state.uniqueOrigin
        const genderList = this.state.uniqueGender.size > 0 && this.state.uniqueGender
        const rmCharList = this.state.rmCharList.length > 0 && this.state.rmCharList.map((character) => {
                                return (
                                    <Col sm={4} key={character.id}>
                                        <div style={divStyleForList}>
                                            <Profile character={character}/>
                                        </div>
                                    </Col>
                                )
                            });
        const selectedFilter = this.state.selectedFilter.length > 0 && this.state.selectedFilter.map((filter) => {
            return (<Button variant="outlined" color="primary"> {filter.value} </Button>
            )
        })
        const orderDropdown =   <DropdownButton id="dropdown-item-button" title="Sort By Id">
                                    <Dropdown.Item as="button" id="Ascending" onClick={() => this.sortByIdAsc()}>Ascending
                                        Order</Dropdown.Item>
                                    <Dropdown.Item as="button" id="Descending" onClick={() => this.sortByIdDesc()}>Descending
                                        Order</Dropdown.Item>
                                </DropdownButton>

        return (
            <div style={divStyleForList}>
                <h4>Selected Filters</h4>
                <Container>
                    <Row>
                        <Col sm={8}>
                            {selectedFilter}
                        </Col>
                        <Col sm={4}>
                            {orderDropdown}
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col sm={1}>
                            <Filter list={speciesList} title="species" handleChange={this.handleChange}/>
                            <Filter list={genderList} title="gender" handleChange={this.handleChange}/>
                            <Filter list={originList} title="status" handleChange={this.handleChange}/>
                        </Col>
                        <Col sm={11}>
                            <Container>
                                <Row>
                                    {rmCharList}
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default ProfileGrid;