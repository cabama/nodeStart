import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from '@material-ui/core'
import * as React from 'react'
import { object, ObjectSchema, ref, string, ValidationError } from 'yup'
import { LoginService } from '../../Services/LoginService'
import { CardStyle, ContainerStyle } from './SignInStyle'

interface IProps {
  history: { push: (url: string) => void }
}

interface IFormFields {
  email: string
  name: string
  surname: string
  password: string
  passwordConfirm: string
}

interface IformStatus {
  error: true,
  info: string,
}

type IStateValidate = {
  [key in keyof IFormFields]?: IformStatus
}

interface IState extends IFormFields {
  isValidate: boolean
  validationErrors: IStateValidate
}

const getYupErrors = (error: ValidationError) => {
  const errorObject = {}
  error.inner.forEach((errors) => {
     errorObject[errors.path] = errors.errors
  })
  return errorObject
}

export class SignIn extends React.Component<IProps, any> {

  public formSchema: ObjectSchema<{ [k in keyof IFormFields]: any }> = object({
    email: string().required('Email is Requerided').email('Is not email valid.'),
    name: string().required('Name is Requerided.'),
    surname: string().required('Surname is requerided.'),
    password: string().min(6, 'Password: min 6 characters.'),
    passwordConfirm: string()
      .oneOf([ref('password'), null], 'Passwords dont match')
      .required('Confirm Password is required'),
  })

  public constructor (props: IProps, state: IState) {
    super(props, state)
    this.state = {
      email: '',
      name: '',
      surname: '',
      password: '',
      passwordConfirm: '',
      validationErrors: {},
    }
  }

  public signIn = () => {
    const email = this.state.email
    const password = this.state.password
    const name = this.state.name
    LoginService.singUp(email, name, password)
      .then((value) => console.log(value))
      .catch((error) => console.error('Error al registrar usuario: ' + error))
  }

  public async handleChanges (changes: { name: keyof IStateValidate, value: any}) {
    const userToValidate = {
      email: this.state.email,
      name: this.state.name,
      surname: this.state.surname,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
    }
    userToValidate[changes.name] = changes.value
    this.formSchema.validate(userToValidate, {abortEarly: false})
      .then((value) => this.setState({validationErrors: {}}))
      .catch((value) => this.setState({ validationErrors: getYupErrors(value)}))
    this.setState({[changes.name]: changes.value})
  }

  public render () {
    return (
      <div className={ContainerStyle}>
        <Card className={CardStyle}>
          <CardHeader title="Sign In"/>
          <CardContent>
            <Grid
              container={true}
              direction="column"
              justify="center"
              alignItems="center"
              spacing={24}
            >
              <Grid item={true} xs={6} style={{ width: '100%' }}>
                <TextField
                  error={this.state.validationErrors.name}
                  label="Name"
                  value={this.state.name}
                  onChange={(event) => this.handleChanges({ name: 'name', value: event.target.value })}
                  margin="normal"
                  style={{ width: '100%' }}
                  helperText={this.state.validationErrors.name}
                />
              </Grid>
              <Grid item={true} xs={6} style={{width: '100%'}}>
                <TextField
                  error={this.state.validationErrors.surname}
                  label="Surname"
                  value={this.state.surname}
                  onChange={(event) => this.handleChanges({ name: 'surname', value: event.target.value })}
                  margin="normal"
                  style={{ width: '100%' }}
                  helperText={this.state.validationErrors.surname}

                />
              </Grid>
              <Grid item={true} xs={6} style={{width: '100%'}}>
                <TextField
                  error={this.state.validationErrors.email}
                  label="Email"
                  value={this.state.email}
                  onChange={(event) => this.handleChanges({ name: 'email', value: event.target.value })}
                  margin="normal"
                  style={{ width: '100%' }}
                  helperText={this.state.validationErrors.email}
                />
              </Grid>
              <Grid item={true} xs={6} style={{ width: '100%' }}>
                <TextField
                  error={this.state.validationErrors.password}
                  label="Password"
                  type="password"
                  value={this.state.password}
                  onChange={(event) => this.handleChanges({ name: 'password', value: event.target.value })}
                  margin="normal"
                  style={{ width: '100%' }}
                  helperText={this.state.validationErrors.password}
                />
              </Grid>
              <Grid item={true} xs={6} style={{ width: '100%' }}>
                <TextField
                  error={this.state.validationErrors.passwordConfirm}
                  label="Repeat Password"
                  type="password"
                  value={this.state.passwordConfirm}
                  onChange={(event) => this.handleChanges({ name: 'passwordConfirm', value: event.target.value })}
                  margin="normal"
                  style={{ width: '100%' }}
                  helperText={this.state.validationErrors.passwordConfirm}
                />
              </Grid>
            </Grid>
          </CardContent>

          <CardActions style={{ justifyContent: 'space-around' }}>
            <Button color="primary" onClick={() => this.signIn()}>Sign In</Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}
