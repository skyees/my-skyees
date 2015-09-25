'use strict';

(function() {
	// Mines Controller Spec
	describe('Mines Controller Tests', function() {
		// Initialize global variables
		var MinesController,
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

			// Initialize the Mines controller.
			MinesController = $controller('MinesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Mine object fetched from XHR', inject(function(Mines) {
			// Create sample Mine using the Mines service
			var sampleMine = new Mines({
				name: 'New Mine'
			});

			// Create a sample Mines array that includes the new Mine
			var sampleMines = [sampleMine];

			// Set GET response
			$httpBackend.expectGET('mines').respond(sampleMines);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.mines).toEqualData(sampleMines);
		}));

		it('$scope.findOne() should create an array with one Mine object fetched from XHR using a mineId URL parameter', inject(function(Mines) {
			// Define a sample Mine object
			var sampleMine = new Mines({
				name: 'New Mine'
			});

			// Set the URL parameter
			$stateParams.mineId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/mines\/([0-9a-fA-F]{24})$/).respond(sampleMine);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.mine).toEqualData(sampleMine);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Mines) {
			// Create a sample Mine object
			var sampleMinePostData = new Mines({
				name: 'New Mine'
			});

			// Create a sample Mine response
			var sampleMineResponse = new Mines({
				_id: '525cf20451979dea2c000001',
				name: 'New Mine'
			});

			// Fixture mock form input values
			scope.name = 'New Mine';

			// Set POST response
			$httpBackend.expectPOST('mines', sampleMinePostData).respond(sampleMineResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Mine was created
			expect($location.path()).toBe('/mines/' + sampleMineResponse._id);
		}));

		it('$scope.update() should update a valid Mine', inject(function(Mines) {
			// Define a sample Mine put data
			var sampleMinePutData = new Mines({
				_id: '525cf20451979dea2c000001',
				name: 'New Mine'
			});

			// Mock Mine in scope
			scope.mine = sampleMinePutData;

			// Set PUT response
			$httpBackend.expectPUT(/mines\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/mines/' + sampleMinePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid mineId and remove the Mine from the scope', inject(function(Mines) {
			// Create new Mine object
			var sampleMine = new Mines({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Mines array and include the Mine
			scope.mines = [sampleMine];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/mines\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleMine);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.mines.length).toBe(0);
		}));
	});
}());