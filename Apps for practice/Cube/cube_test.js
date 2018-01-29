
describe('Spying on functions', function() {

	var testDBS = DBS;

	it('changeView got called', function() {
		spyOn(testDBS, 'changeView');
		testDBS.init();
		expect(testDBS.changeView).toHaveBeenCalledTimes(1);
	});


	it('changeMaterial got called', function() {
		spyOn(testDBS, 'changeMaterial');
		testDBS.addRoom()
		expect(testDBS.changeMaterial).toHaveBeenCalledTimes(6);

	});

	it('the room constructor got called', function() {
		spyOn(testDBS, 'Room');
		testDBS.addRoom()
		expect(testDBS.Room).toHaveBeenCalledTimes(1);
	});

	it('render got called', function() {
		spyOn(testDBS, 'render');
		testDBS.animate()
		expect(testDBS.render).toHaveBeenCalled();
	});

	it('parseInt got called', function() {
		spyOn(Number, 'parseInt');
		testDBS.addRoom()
		expect(Number.parseInt).toHaveBeenCalled();
	});

});