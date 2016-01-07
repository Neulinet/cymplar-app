import './signup';
import {BACK_END_ROUTE} from '../../core/dto';

namespace SignUpServices {

	const SAMPLE_URL = "http://jsonplaceholder.typicode.com";
	
	/** @ngInject */
    function $SignUpRESTResource($resource: angular.resource.IResourceService): angular.resource.IResourceClass<any> {
		let url = "/api/signup";
		
		// TODO: fix this once have the real api
		let resources: angular.resource.IResourceClass<any> = $resource(url, {}, {
			'getSampleJson': {
				method: 'GET',
				isArray: true,
				url: SAMPLE_URL + '/users',
				params: { text: 'sample text' }
			},
			'getIndustries': {
				method: 'GET',
				isArray: true,
				url: BACK_END_ROUTE + '/industry/_find'
			},
			'getCountries': {
				method: 'GET',
				isArray: true,
				url: BACK_END_ROUTE + '/country/_find'
			},
			'getCities': {
				method: 'GET',
				isArray: true,
				url: BACK_END_ROUTE + '/city/_find'
			},
			'getRoles': {
				method: 'GET',
				isArray: false,
				url: BACK_END_ROUTE + '/account-member-role/_find'	
			},
			'isAccountUserExisted': {
				method: 'GET',
				url: BACK_END_ROUTE + '/account-user/_exist'
			},
			'isAccountOrganizationExisted': {
				method: 'GET',
				url: BACK_END_ROUTE + '/account-organization/_exist'
			},
			'isAccountOrganizationMemberExisted': {
				method: 'GET',
				url: BACK_END_ROUTE + '/account-organization-member/_exist'
			}

		});

		return resources;
	};


	export class $SignUpRESTService {
		constructor(private $http: angular.IHttpService, private $SignUpRESTResource: any, private $q: any, private $resourceHelper: any) {

		}

		getSampleJson = () => {
			let result: angular.IPromise<any> = this.$http.get(SAMPLE_URL + '/users', {});
			return result;
		};
		getSampleJsonFromResource = (params: any) => {
			return this.$resourceHelper.resourceRESTCall(this.$SignUpRESTResource, "getSampleJson", params);
		};
		getCountries = (params: any) => {
			return this.$resourceHelper.resourceRESTCall(this.$SignUpRESTResource, "getCountries", params);
		};
		getIndustries = (params: any) => {
			return this.$resourceHelper.resourceRESTCall(this.$SignUpRESTResource, "getIndustries", params);
		};
		getCities = (country: any) => {
			return this.$resourceHelper.resourceRESTCall(this.$SignUpRESTResource, "getCities", {country: country});
		};
		getRoles = (params: any) => {
			return this.$resourceHelper.resourceRESTCall(this.$SignUpRESTResource, "getRoles", params );
		};
		isAccountUserExisted = (username: string) => {
			return this.$resourceHelper.resourceRESTCall(this.$SignUpRESTResource, "isAccountUserExisted", {username: username});
		};
		isAccountOrganizatioMemberExisted = (email: string) => {
			return this.$resourceHelper.resourceRESTCall(this.$SignUpRESTResource, "isAccountOrganizationMemberExisted", {email: email});
		};
		isAccountOrganizationExisted = (organizationName: string) => {
			return this.$resourceHelper.resourceRESTCall(this.$SignUpRESTResource, "isAccountOrganizationExisted", {domain: organizationName });
		};

	};

	function get$SignUpRESTServiceInstance($http: angular.IHttpService, $SignUpRESTResource: any, $q: any, $resourceHelper: any) {
        return new $SignUpRESTService($http, $SignUpRESTResource, $q, $resourceHelper);
    }

	angular
		.module('app.signup')
		.factory('$SignUpRESTResource', $SignUpRESTResource)
		.factory('$SignUpRESTService', get$SignUpRESTServiceInstance);
}
