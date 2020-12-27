import React from 'react';

import { Form, Field } from 'react-final-form';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';

import AForm from 'common/components/Form';
import Card from 'common/components/Card';
import { AText, ATitle } from 'common/components/Typography';
import Input from 'common/components/Input';
import Button from 'common/components/Button';
import { FirebaseContext } from 'common/firebase';
import * as appConstants from 'common/appConstants';

import { validateEmail } from 'utils/validations';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import reducer from '../reducer';
import saga from '../saga';
import * as selectors from '../selectors';
import { forgotPasswordRequest } from '../actions';

const key = 'auth';

const stateSelector = createStructuredSelector({
  loading: selectors.makeSelectLoading(),
  error: selectors.makeSelectError(),
});

export default function index() {
  return (
    <FirebaseContext.Consumer>
      {firebase => <ResetPassword firebase={firebase} />}
    </FirebaseContext.Consumer>
  );
}

function ResetPassword(props) {
  const dispatch = useDispatch();

  const { loading, error } = useSelector(stateSelector);

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  function onSubmit(values) {
    dispatch(
      forgotPasswordRequest({
        resetPassword: props.firebase.resetPassword,
        email: values.email.toLowerCase(),
      }),
    );
  }

  function onValidate(values) {
    const errors = {};
    if (!values.email) errors.email = 'Please Enter Email';
    else if (validateEmail(values.email))
      errors.email = 'Please Enter Valid Email';
    return errors;
  }

  return (
    <Form
      onSubmit={values => onSubmit(values)}
      validate={values => onValidate(values)}
      render={({ handleSubmit }) => (
        <AForm onFinish={handleSubmit}>
          <Row
            justify="center"
            style={{
              minHeight: '100vh',
              backgroundColor: appConstants.appColor,
            }}
          >
            <Col xs={18} sm={12} lg={8} xxl={6} style={{ margin: 'auto' }}>
              <Card>
                <ATitle align="center" style={{ margin: '60px 0px 20px' }}>
                  MHB
                </ATitle>
                <Row gutter={[0, 30]}>
                  <Col offset={2} span={20}>
                    {/* <ATitle type="secondary" align="center" level={4}>
                    Forgot Password
                  </ATitle> */}
                    <h2
                      style={{
                        textAlign: 'center',
                        color: 'rgba(0,0,0,0.5)',
                      }}
                    >
                      Forgot Password
                    </h2>
                  </Col>
                </Row>
                {error && (
                  <Row gutter={[0, 20]}>
                    <Col
                      offset={2}
                      span={20}
                      style={{
                        background: 'rgba(255,0,0,0.1)',
                        textAlign: 'center',
                        marginBottom: '1rem',
                      }}
                    >
                      <AText>{error}</AText>
                    </Col>
                  </Row>
                )}
                <Row gutter={[0, 20]}>
                  <Col offset={2} span={20}>
                    <Link to={appConstants.authRouts[0]}>
                      <ArrowLeftOutlined style={{ marginRight: '.4rem' }} />
                      <AText>Go Back</AText>
                    </Link>
                  </Col>
                  <Col offset={2} span={20}>
                    <Field
                      name="email"
                      component={Input}
                      size="large"
                      placeholder="Enter your email"
                      prefix={
                        <MailOutlined style={{ color: 'rgba(0,0,0,0.5)' }} />
                      }
                    />
                  </Col>
                  <Col offset={2} span={20}>
                    <Button loading={loading} htmlType="submit" block={true}>
                      Change Password
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </AForm>
      )}
    />
  );
}
