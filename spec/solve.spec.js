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
});
