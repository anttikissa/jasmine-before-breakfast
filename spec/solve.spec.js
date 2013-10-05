var solve = require('..').solve;

describe('solve all tasks', function() {
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

	it('should detect cyclical dependencies', function() {
		var graph = {
			a: 'b',
			b: 'a'
		};

		expect(function() { solve(graph); }).toThrow();
	});
});

describe('solve specific task with dependencies', function() {
	it('should not do unnecessary dependencies', function() {
		var tasks = {
			buildAll: ['docs'],
			build: ['compile', 'postprocess'],
			test: ['build'],
			compile: ['preprocess'],
			clean: [],
			docs: ['preprocess'],
			preprocess: [],
			postprocess: []
		}

		expect(solve(tasks, 'test')).toEqual(['postprocess', 'preprocess', 'compile', 'build', 'test']);
	});
});
