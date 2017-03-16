import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View } from 'react-native';
import { Spinner } from './common';
import ListItem from './ListItem';
import { employeesFetch } from '../actions';

class EmployeeList extends Component {
	componentWillMount() {
		this.props.employeesFetch();
		this.createDataSource(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.createDataSource(nextProps);
	}

	createDataSource({ employees }) {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.dataSource = ds.cloneWithRows(employees);
	}

	renderRow(employee) {
		return <ListItem employee={employee} />;
	}

	renderList() {
		if (this.props.loading) {
			return <Spinner size="large" />;
		}
		return (
			<ListView
				enableEmptySections
				dataSource={this.dataSource}
				renderRow={this.renderRow}
			/>
		);
	}

	render() {
		console.log(this.props);
		return (
			<View>
				{this.renderList()}
			</View>
		);
	}
}
const mapStateToProps = (state) => {
	const { loading, employees } = state.employees;
	return {
		loading,
		employees: _.map(employees, 
			(val, uid) => { 
				return { ...val, uid }; 
			})
	};
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
