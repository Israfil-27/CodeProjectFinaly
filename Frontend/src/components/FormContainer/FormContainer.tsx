import React from 'react'
import { Layout ,Row,Col} from "antd"
const { Content } = Layout
import "./fromContainer.scss"
const FormContainer = ({children}:any) => {
  return (
    <Content>
        <Row className='row'>
            <Col>
                {children}
            </Col>
        </Row>
    </Content>
  ) 
}

export default FormContainer
