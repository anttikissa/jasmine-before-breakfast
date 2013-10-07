var _ = require('underscore');

// Graph utilities
//
// A graph is an object.
// Its keys represent its nodes, and its values represents its edges.
// Graphs are directed.
//
// Example:
//
// 	{ a: [b, c], b: [a], c: [] };
//
// represents the graph
//
// 	a <--> b
// 	|
// 	v
// 	c
Graph = {

	// Remove `node` from `graph`.
	remove: function(graph, node) {
		delete graph[node];

		// Then remove `node` from the dependencies of remaining nodes.
		for (var n in graph) {
			graph[n] = _.without(graph[n], node);
		}
	}
};

// solve(graph) -> [nodes]
//
// Solve graph dependencies.
// Will destroy `graph` in the process.
//
// Example:
//
// `a` depends on `c`, `c` depends on `b`.
//
// `solve({ a: ['b'], b: [], c: ['b'] })` -> `['b', 'c', 'a']`

function solve(graph, startNode) {
	if (startNode != null) {
		graph = prune(graph, startNode);
	}

	var order = [];

	// While graph still has nodes left...
	while (_.keys(graph).length > 0) {

		var zeroDeps = [];
		// Find nodes with zero dependencies and put them aside into `zeroDeps`.
		for (var node in graph) {
			if (graph[node].length == 0) {
				zeroDeps.push(node);
			}
		}

		// If there aren't any nodes without dependencies, we have a cycle.
		if (zeroDeps.length == 0) {
			throw Error('Detected cyclical dependency: '
				+ JSON.stringify(graph));
		}

		// For each node with zero dependencies...
		for (var i = 0; i < zeroDeps.length; i++) {
			// ...push it into the result...
			var node = zeroDeps[i];
			order.push(node);

			// ...and remove it from the graph.
			Graph.remove(graph, node);
		}
	}

	return order;
}

// Return a graph with only those nodes reachable from `startNode` intact.
// Will destroy original graph or parts of it.
function prune(graph, startNode) {
	// Copy reachable nodes over to `reachable`, iterating the process
	// until it stops growing
	var reachable = {};
	reachable[startNode] = graph[startNode];

	var reachables = _.size(reachable);
	while (true) {
		for (node in reachable) {
			var deps = reachable[node];
			deps.forEach(function(dep) {
				reachable[dep] = graph[dep];
			});
		}

		// Iterate until size of `reachable` no longer grows
		var newReachables = _.size(reachable);
		if (reachables == newReachables) {
			break;
		}
		reachables = newReachables;
	}

	return reachable;
}

module.exports.solve = solve;
