import _ from 'lodash';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import { Card, CardSection, Button, Spinner, Confirm } from './common';
import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends Component {
	state = { showModal: false };
	componentWillMount() {
		_.each(this.props.employee, (value, prop) => {
			this.props.employeeUpdate({ prop, value });
		});
	}

	onButtonPress() {
		const { name, phone, shift } = this.props;
		this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
	}

	onTextPress() {
		const { name, phone, shift } = this.props;
		Communications.text(
			phone, 
			`Hello ${name}, your upcoming shift is on ${shift}. Cheers, your boss`);
	}

	onDecline() {
		this.setState({ showModal: false });
	}

	onAccept() {
		this.setState({ showModal: false });
		this.props.employeeDelete({ uid: this.props.employee.uid });
	}

	renderSaveButton() {
		if (this.props.loading) {
			return (
				<View>
					<CardSection>
						<Spinner size="large" />
					</CardSection>
				</View>
			);
		}
		return (
			<View>
				<CardSection>
					<Button onPress={this.onButtonPress.bind(this)}>
						Save changes
					</Button>
				</CardSection>
				
				<CardSection>
					<Button onPress={this.onTextPress.bind(this)}>
						Text schedule
					</Button>
				</CardSection>
				
				<CardSection>
					<Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
						Delete
					</Button>
				</CardSection>
			</View>
		);
	}

	render() {
		return (
			<Card>
				<EmployeeForm {...this.props} />
				
				{this.renderSaveButton()}

				<Confirm
					visible={this.state.showModal}
					onAccept={this.onAccept.bind(this)}
					onDecline={this.onDecline.bind(this)}
				>
					Are your sure your want to delete this employee ?
				</Confirm>
			</Card>
		);
	}
}

const mapStateToProps = (state) => {
	const { name, phone, shift, loading } = state.employeeForm;
	return {
		name, phone, shift, loading
	};
};

export default connect(
	mapStateToProps, 
	{ employeeUpdate, employeeSave, employeeDelete })(EmployeeEdit);
