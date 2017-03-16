import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, pwdChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
	onEmailChange(text) {
		this.props.emailChanged(text);
	}

	onPwdChange(text) {
		this.props.pwdChanged(text);		
	}

	onButtonPress() {
		const { email, pwd } = this.props;
		this.props.loginUser({ email, pwd });
	}

	renderButton() {
		if (this.props.loading) {
			return <Spinner size="large" />;
		}
		return (
			<Button onPress={this.onButtonPress.bind(this)}>
				Log in
			</Button>
		);
	}

	render() {
		return (
			<Card>
				<CardSection>
					<Input
						label="Email"
						placeholder="user@domain.com"
						onChangeText={this.onEmailChange.bind(this)}
						value={this.props.email}
					/>
				</CardSection>
				<CardSection>
					<Input
						secureTextEntry
						label="Password"
						placeholder="password"
						onChangeText={this.onPwdChange.bind(this)}
						value={this.props.pwd}
					/>
				</CardSection>

				<Text style={styles.errorTextStyle}>
					{this.props.error}
				</Text>

				<CardSection>
					{this.renderButton()}
				</CardSection>
			</Card>
		);
	}
}

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'stretch',
		textAlign: 'center',
		color: 'red'
	}
};

const mapStateToProps = ({ auth }) => {
	const { email, pwd, error, loading } = auth;
	return {
		email, pwd, error, loading
	};
};

export default connect(mapStateToProps, { emailChanged, pwdChanged, loginUser })(LoginForm);
