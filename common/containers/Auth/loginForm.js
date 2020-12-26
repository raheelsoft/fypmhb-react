import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Form, Field } from 'react-final-form';
import { Link } from 'react-router-dom';
import { Row, Col, Image } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

// import logo from 'common/images/logo.png';

import AForm from 'common/components/Form';
import Card from 'common/components/Card';
import { ATitle, AText } from 'common/components/Typography';
import Input from 'common/components/Input';
import InputPassword from 'common/components/InputPassword';
import Button from 'common/components/Button';
import Checkbox from 'common/components/Checkbox';
import { FirebaseContext } from 'common/firebase';
import * as routes from 'common/appConstants';

import { validateEmail, validatePassword } from 'utils/validations';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import { loginRequest } from './actions';
import * as selectors from './selectors';

const key = 'auth';

const stateSelector = createStructuredSelector({
  loading: selectors.makeSelectLoading(),
  error: selectors.makeSelectError(),
});

export default function index() {
  return (
    <FirebaseContext.Consumer>
      {firebase => <LoginForm firebase={firebase} />}
    </FirebaseContext.Consumer>
  );
}
function LoginForm(props) {
  const dispatch = useDispatch();

  const { loading, error } = useSelector(stateSelector);

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  function onSubmit(values) {
    dispatch(
      loginRequest({
        loginUser: props.firebase.loginUser,
        user: { email: values.email.toLowerCase(), password: values.password },
        remember: values.remember,
      }),
    );
  }

  function onValidate(values) {
    const errors = {};
    if (!values.email) errors.email = 'Please Enter Email';
    else if (validateEmail(values.email))
      errors.email = 'Please Enter Valid Email';
    if (!values.password) errors.password = 'Please Enter Password';
    else if (validatePassword(values.password))
      errors.password =
        'Password Must Contain 8 Number, Small And Capital Characters';
    return errors;
  }

  return (
    <>
      {/* <Image src={logo} width="80px" height="80px" alt="Logo" /> */}
      <Form
        onSubmit={values => onSubmit(values)}
        validate={values => onValidate(values)}
        render={({ handleSubmit }) => (
          <Row justify="center" style={{ minHeight: '100vh' }}>
            <Col xs={18} md={14} lg={10} xxl={8} style={{ margin: 'auto' }}>
              <AForm onFinish={handleSubmit}>
                <Card
                  style={{
                    boxShadow: '0 2px 5px grey',
                  }}
                >
                  <ATitle style={{ margin: '60px 0px' }} align="center">
                    MHB
                  </ATitle>
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
                  <Row gutter={[0, 10]}>
                    <Col offset={2} span={20}>
                      <Field
                        size="large"
                        name="email"
                        component={Input}
                        prefix={
                          <MailOutlined style={{ color: 'rgba(0,0,0,.25' }} />
                        }
                        placeholder="Enter your email"
                      />
                    </Col>
                    <Col offset={2} span={20}>
                      <Field
                        size="large"
                        name="password"
                        component={InputPassword}
                        prefix={
                          <LockOutlined style={{ color: 'rgba(0,0,0,.25' }} />
                        }
                        placeholder="Enter your email"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col offset={2} span={20}>
                      <Row>
                        <Col xs={24} md={12} lg={12}>
                          <Field
                            name="remember"
                            type="checkbox"
                            component={Checkbox}
                            defaultValue={true}
                          >
                            Remember Me
                          </Field>
                        </Col>
                        <Col xs={24} md={12} lg={12}>
                          <Link
                            style={{
                              float: 'right',
                              paddingTop: '10px',
                              marginBottom: '10px',
                            }}
                            to=""
                          >
                            Forget Password
                          </Link>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row gutter={[0, 12]}>
                    <Col offset={2} span={20}>
                      <Button loading={loading} block>
                        Login
                      </Button>
                    </Col>
                  </Row>
                  <Row gutter={[0, 24]}>
                    <Col offset={2} span={20}>
                      <Row>
                        <Col xs={24} md={12} lg={12}>
                          {/* <AText type="secondary">Don't have account?</AText> */}
                          <p style={{ color: 'rgba(0,0,0,0.25' }}>
                            Don't have account?
                          </p>
                        </Col>
                        <Col xs={24} md={12} lg={12}>
                          <Link
                            style={{
                              float: 'right',
                            }}
                            to=""
                          >
                            <AText underline={true}>Create One</AText>
                          </Link>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </AForm>
            </Col>
          </Row>
        )}
      />
    </>
  );
}
