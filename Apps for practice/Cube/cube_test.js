
describe('Spying on functions', function() {
	var testDBS = DBS;

	it('changeView got called', function() {
		spyOn(testDBS, 'changeView');
		testDBS.init();
		expect(testDBS.changeView).toHaveBeenCalled();
	});


	it('changeMaterial got called', function() {
		spyOn(testDBS, 'changeMaterial');
		testDBS.addRoom()
		expect(testDBS.changeMaterial).toHaveBeenCalled();
	});

});