import React from 'react';
import {Form, Card} from 'react-bootstrap'

function Filter(props) {
    const list =
        props.list && Array.from(props.list).map((type) => {
            return <div key={`default-checkbox`+type} className="mb-3">
                <Form.Check
                    type={'checkbox'}
                    id={props.title + "_" + type}
                    label={type}
                    onChange={e => props.handleChange(e)}
                    value={type.toLowerCase()}
                />
            </div>
        })

    return (
        <Card style={{width: '10rem'}}>
            <Form>
                <Form.Label>{props.title}</Form.Label>
                {list}
            </Form>
        </Card>
    )
}

export default Filter