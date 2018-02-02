
describe('Spying on functions - Got called / got called a specific number of times', function() {

	var testDBS = DBS;

	it('changeView got called exactly 1 time', function() {
		spyOn(testDBS, 'changeView');
		testDBS.init();
		expect(testDBS.changeView).toHaveBeenCalledTimes(1);
	});


	it('changeMaterial got called exactly 6 times', function() {
		spyOn(testDBS, 'changeMaterial');
		testDBS.addRoom();
		expect(testDBS.changeMaterial).toHaveBeenCalledTimes(6);
	});

	// it('the room constructor got called exactly 1 time', function() {
	// 	spyOn(testDBS, 'Room');
	// 	testDBS.addRoom();
	// 	expect(testDBS.Room).toHaveBeenCalledTimes(1);
	// });

	it('render got called', function() {
		spyOn(testDBS, 'render');
		testDBS.animate();
		expect(testDBS.render).toHaveBeenCalled();
	});

	it('parseInt got called', function() {
		spyOn(Number, 'parseInt');
		testDBS.addRoom();
		expect(Number.parseInt).toHaveBeenCalled();
	});

});



describe('Spying on functions - Got called with specific arguments', function() {

	var testDBS = DBS;

	// it('The Room constructor got called with the argument "1"', function() {
	// 	spyOn(testDBS, 'Room');
	// 	testDBS.addRoom();
	// 	expect(testDBS.Room.calls.allArgs()).toEqual([[1]]);
	// });

	it('render got called with no arguments', function() {
		spyOn(testDBS, 'render');
		testDBS.animate();
		expect(testDBS.render.calls.allArgs()).toEqual([[]]);
	});

	it('changeView got called with the argument "side"', function() {
		spyOn(testDBS, 'changeView');
		testDBS.init();
		expect(testDBS.changeView.calls.allArgs()).toEqual([["side"]]);
	});

	it('changeMaterial got called with different arguments every time', function() {
		spyOn(testDBS, 'changeMaterial');
		testDBS.addRoom();
		expect(testDBS.changeMaterial.calls.argsFor(0)).toEqual([3, 1, 0]);
		expect(testDBS.changeMaterial.calls.argsFor(1)).toEqual([3, 2, 0]);
		expect(testDBS.changeMaterial.calls.argsFor(2)).toEqual([3, 3, 0]);
		expect(testDBS.changeMaterial.calls.argsFor(3)).toEqual([3, 4, 0]);
		expect(testDBS.changeMaterial.calls.argsFor(4)).toEqual([3, 5, 0]);
		expect(testDBS.changeMaterial.calls.argsFor(5)).toEqual([3, 6, 0]);
	});




});