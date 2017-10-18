import _ from 'lodash';

/*
 * Returns true if the specified node in the graph is a subgraph node. A
 * subgraph node is one that contains other nodes.
 */
export function isSubgraph(g, v) {
  return !!g.children(v).length;
}

export function edgeToId(e) {
  return escapeId(e.v) + ":" + escapeId(e.w) + ":" + escapeId(e.name);
}

var ID_DELIM = /:/g;
function escapeId(str) {
  return str ? String(str).replace(ID_DELIM, "\\:") : "";
}

export function applyStyle(dom, styleFn) {
  if (styleFn) {
    if (_.isObject(styleFn)) {
      _.mapKeys(styleFn, function (v,k) { dom.style(_.kebabCase(k), v); });
    } else {
      dom.attr("style", styleFn);
    }
  }
}

export function applyClass(dom, classFn, otherClasses) {
  if (classFn) {
    dom
      .attr("class", classFn)
      .attr("class", otherClasses + " " + dom.attr("class"));
  }
}

export function applyTransition(selection, g) {
  var graph = g.graph();

  if (_.isPlainObject(graph)) {
    var transition = graph.transition;
    if (_.isFunction(transition)) {
      return transition(selection);
    }
  }

  return selection;
}

// Public utility functions
export default {
  isSubgraph,
  edgeToId,
  applyStyle,
  applyClass,
  applyTransition
};

