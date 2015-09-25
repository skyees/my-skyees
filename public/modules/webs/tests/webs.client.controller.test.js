'use strict';

(function() {
	// Webs Controller Spec
	describe('Webs Controller Tests', function() {
		// Initialize global variables
		var WebsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Webs controller.
			WebsController = $controller('WebsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Web object fetched from XHR', inject(function(Webs) {
			// Create sample Web using the Webs service
			var sampleWeb = new Webs({
				name: 'New Web'
			});

			// Create a sample Webs array that includes the new Web
			var sampleWebs = [sampleWeb];

			// Set GET response
			$httpBackend.expectGET('webs').respond(sampleWebs);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.webs).toEqualData(sampleWebs);
		}));

		it('$scope.findOne() should create an array with one Web object fetched from XHR using a webId URL parameter', inject(function(Webs) {
			// Define a sample Web object
			var sampleWeb = new Webs({
				name: 'New Web'
			});

			// Set the URL parameter
			$stateParams.webId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/webs\/([0-9a-fA-F]{24})$/).respond(sampleWeb);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.web).toEqualData(sampleWeb);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Webs) {
			// Create a sample Web object
			var sampleWebPostData = new Webs({
				name: 'New Web'
			});

			// Create a sample Web response
			var sampleWebResponse = new Webs({
				_id: '525cf20451979dea2c000001',
				name: 'New Web'
			});

			// Fixture mock form input values
			scope.name = 'New Web';

			// Set POST response
			$httpBackend.expectPOST('webs', sampleWebPostData).respond(sampleWebResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Web was created
			expect($location.path()).toBe('/webs/' + sampleWebResponse._id);
		}));

		it('$scope.update() should update a valid Web', inject(function(Webs) {
			// Define a sample Web put data
			var sampleWebPutData = new Webs({
				_id: '525cf20451979dea2c000001',
				name: 'New Web'
			});

			// Mock Web in scope
			scope.web = sampleWebPutData;

			// Set PUT response
			$httpBackend.expectPUT(/webs\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/webs/' + sampleWebPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid webId and remove the Web from the scope', inject(function(Webs) {
			// Create new Web object
			var sampleWeb = new Webs({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Webs array and include the Web
			scope.webs = [sampleWeb];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/webs\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleWeb);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.webs.length).toBe(0);
		}));
	});
}());