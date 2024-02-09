/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */
  minDepth() {
    if (!this.root) return 0;

    function depth(node) {
      if (!node) return Number.MAX_SAFE_INTEGER;
      if (!node.left && !node.right) return 1;
      return 1 + Math.min(depth(node.left), depth(node.right));
    }

    return depth(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */
  maxDepth() {
    if (!this.root) return 0;

    function depth(node) {
      if (!node) return 0;
      return 1 + Math.max(depth(node.left), depth(node.right));
    }

    return depth(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */
  maxSum() {
    let maxPathSum = Number.MIN_SAFE_INTEGER;

    function findMaxSum(node) {
      if (node === null) return 0;
      let left = Math.max(0, findMaxSum(node.left));
      let right = Math.max(0, findMaxSum(node.right));
      maxPathSum = Math.max(maxPathSum, node.val + left + right);
      return node.val + Math.max(left, right);
    }

    findMaxSum(this.root);
    return maxPathSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */
  nextLarger(x) {
    let result = null;

    function findNextLarger(node) {
      if (!node) return;
      if (node.val > x && (result === null || node.val < result)) {
        result = node.val;
      }
      findNextLarger(node.left);
      findNextLarger(node.right);
    }

    findNextLarger(this.root);
    return result;
  }
  areCousins(node1, node2) {
    let info = [];
  
    function dfs(node, parent, depth, target) {
      if (!node) return;
      if (node === target) {
        info.push({ parent, depth });
      }
      dfs(node.left, node, depth + 1, target);
      dfs(node.right, node, depth + 1, target);
    }
  
    dfs(this.root, null, 0, node1);
    dfs(this.root, null, 0, node2);
  
    return info[0].depth === info[1].depth && info[0].parent !== info[1].parent;
  }
  static serialize(tree) {
    if (!tree.root) return "[]";
    let queue = [tree.root];
    let result = [];
  
    while (queue.length) {
      let node = queue.shift();
      if (node) {
        result.push(node.val);
        queue.push(node.left);
        queue.push(node.right);
      } else {
        result.push(null);
      }
    }
  
    // Remove trailing nulls
    while (result[result.length - 1] === null) {
      result.pop();
    }
  
    return JSON.stringify(result);
  }
  
  static deserialize(data) {
    if (data === "[]") return new BinaryTree();
    let values = JSON.parse(data);
    let root = new BinaryTreeNode(values[0]);
    let tree = new BinaryTree(root);
    let queue = [root];
  
    for (let i = 1; i < values.length; i += 2) {
      let parent = queue.shift();
      if (values[i] !== null) {
        parent.left = new BinaryTreeNode(values[i]);
        queue.push(parent.left);
      }
      if (i + 1 < values.length && values[i + 1] !== null) {
        parent.right = new BinaryTreeNode(values[i + 1]);
        queue.push(parent.right);
      }
    }
  
    return tree;
  }
  lowestCommonAncestor(node1, node2) {
    function findLCA(root, p, q) {
      if (!root || root === p || root === q) return root;
      let left = findLCA(root.left, p, q);
      let right = findLCA(root.right, p, q);
      if (left && right) return root;
      return left ? left : right;
    }
  
    return findLCA(this.root, node1, node2);
  }

  // Additional methods and further study methods can be added here
}

module.exports = { BinaryTree, BinaryTreeNode };
