
import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect, DispatchProp } from 'react-redux';
import { Form, Field, reduxForm, InjectedFormProps } from 'redux-form';
import { CustomInput } from './CustomInput';
import { userActions } from '../actions';
import { User, RegistrationState as RegisterProps } from '../models';
import { required, validateEmail, validatePassword } from '../services';


const spinner: any = require('../assets/loading-spinner.svg');

interface RegisterState
{
    user: User,
    submitted: boolean
}

// Register page should have both props and state
export class RegisterPage extends React.Component<RegisterProps & DispatchProp<any> & InjectedFormProps, RegisterState>
{
    constructor(props: RegisterProps & DispatchProp<any> & InjectedFormProps)
    {
        super(props);

        // Set initial state
        this.state = {
            user: {
                email: '',
                password: '',
                firstname: '',
                lastname: ''
            },
            submitted: false
        };
        
        // Bind functions to component
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private handleChange(event: any): void
    {
        event = event as React.ChangeEvent<HTMLInputElement>;
        // Get the name of the property that changed and the value -- destruct object
        const { name, value } = event.target;

        // Update the state of the user -- only merges so don't have to worry about previous state
        this.setState((prevState) => ({
            user: {
                ...prevState.user,
                [name]: value
            }
        }));
    }

    private handleSubmit(event: React.FormEvent<HTMLFormElement>): void
    {
        // Why do I want to prevent the default action?
        event.preventDefault();

        this.setState({
            submitted: true
        });

        // Need to verify input is correct -- should try redux forms
        const { user } = this.state;
        const { dispatch } = this.props;
        // Dispatch the registration action
        dispatch(userActions.register(user));
    }

    // React render method
    public render(): React.ReactNode
    {
        const { registering, invalid } = this.props;
        const { user, submitted } = this.state;

        // Create the react node -- this is the page markup -- add validators for fields
        return (
            <div className="page-canvas">
                <div className="form-wrapper">
                    <h1 className="white-header"> Sign up for ShareNet </h1>
                    <Form onSubmit={this.handleSubmit}>
                        <div>
                            <Field name="email" label="Email" type="email" validate={[required, validateEmail]} component={CustomInput} onChange={this.handleChange}/>
                        </div>
                        <div>
                            <Field name="password" label="Password" type="password" validate={[required, validatePassword]} component={CustomInput} onChange={this.handleChange}/>
                        </div>
                        <div>
                            <Field name="firstname" label="First name" type="text" validate={[required]} component={CustomInput} onChange={this.handleChange}/>
                        </div>
                        <div>
                            <Field name="lastname" label="Last name" type="text" validate={[required]} component={CustomInput} onChange={this.handleChange}/>
                        </div>
                        <div>
                            <button type="submit" disabled={registering || invalid}> Submit </button>
                            <Link to="/home" className="link-style"> Cancel </Link>
                        </div>
                        {
                            registering &&
                                <img src={spinner} style={{width: "40px", height: "40px"}}/>
                        }
                    </Form>
                </div>
            </div>
        );
    }
}

// Map from the store to the props
function mapStateToProps(state: any): RegisterProps
{
    // Extract the action!
    const { registering } = state.registration;
    return {
        registering
    };
}

// Connect the register page to the store and export -- autoinjects dispatch
export default connect<RegisterProps>(
    mapStateToProps
)(reduxForm({
    form: 'registerPage'
})(RegisterPage as any));