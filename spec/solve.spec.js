var solve = require('..').solve;

describe('solve', function() {
	it('should solve zero elements', function() {
		expect(solve({})).toEqual([]);
	});

	it('should solve one element', function() {
		var graph = {
			element: []
		};
		expect(solve(graph)).toEqual(['element']);
	});

	it('should solve two elements', function() {
		var graph = {
			a: ['b'],
			b: []
		};
		expect(solve(graph)).toEqual(['b', 'a']);
	});

	it('should solve a more complex graph', function() {
		var graph = {
			a: ['b', 'c'],
			b: ['e', 'f', 'd'],
			c: ['b'],
			d: ['e', 'f'],
			e: [],
			f: ['e']
		};

		expect(solve(graph)).toEqual(['e', 'f', 'd', 'b', 'c', 'a']);
	});
});
