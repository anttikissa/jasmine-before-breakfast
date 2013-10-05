var solve = require('..').solve;

describe('solve', function() {
	it('should return empty', function() {
		expect(solve({})).toEqual([]);
	});

	it('should solve one element', function() {
		var graph = {
			element: []
		};
		expect(solve(graph)).toEqual(['element']);
	});
});
