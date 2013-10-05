module.exports = {

	// Solve graph dependencies
	//
	// Example:
	//
	// 'a' depends on 'c', 'c' depends on 'b'
	// { a: ['b'], b: [], c: ['b'] } -> ['b', 'c', 'a']
	solve: function(graph) {
		var order = [];
		for (node in graph) {
			order.push(node);
		}
		return order;
	}
};
