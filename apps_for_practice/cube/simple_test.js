
function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	return a / b;
}

function power(a, b) {
	var result = 1;
	for (i = 0; i < b; i++) {
		result *= a;
	}
	return result;
}

describe('Simple operations', function() {
	it('adding numbers', function() {
		expect(add(12, 6)).toBe(18);
	});

	it('subtracting numbers', function() {
		expect(subtract(12, 6)).toBe(6);
	});

	it('multipling numbers', function() {
		expect(multiply(12, 6)).toBe(72);
	});

	it('dividing numbers', function() {
		expect(divide(12, 6)).toBe(2);
	});
});

describe('Advanced operations', function() {
	it('power of a number', function() {
		expect(power(2, 10)).toBe(1024);
	});

});
