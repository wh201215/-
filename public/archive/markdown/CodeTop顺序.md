# CodeTop顺序

## [3\. 无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)

```Java
**输入: **s = "abcabcbb"
**输出: **3 
**解释:** 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

**时间空间：n  n  **

```SQL
def length_of_longest_substring(s):
    window = set()
    ans = left = 0
    for right, c in enumerate(s):
        while c in window:
            window.remove(s[left])
            left += 1
        window.add(c)
        ans = max(ans, right - left + 1)
    return ans
```

## [146\. LRU 缓存](https://leetcode.cn/problems/lru-cache/)

**分析： 时间： O 1   空间： O n**

```Python
class Node:  
    def __init__(self, key=0, value=0):
        self.key = key     
        self.value = value  
class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity 
        self.dummy = Node()
        self.dummy.prev = self.dummy 
        self.dummy.next = self.dummy
        self.key_to_node = {}
    # 内部函数：获取 key 对应的节点，并把该节点移到链表头部
    def get_node(self, key: int) -> Optional[Node]:
        if key not in self.key_to_node:  # 如果没有这本书
            return None
        node = self.key_to_node[key]     # 找到这本书对应的节点
        self.remove(node)                # 把这本书从原位置抽出来
        self.push_front(node)            # 把这本书放到书架最上面（最新位置）
        return node
       # 内部函数：从链表中删除一个节点（把一本书抽出来）
    def remove(self, x: Node) -> None:
        x.prev.next = x.next
        x.next.prev = x.prev
    # 内部函数：把一个节点插入到链表头（把一本书放到最上面）
    def push_front(self, x: Node) -> None:
#  双向指针  必须链接
        x.prev = self.dummy
        x.next = self.dummy.next
        x.prev.next = x      
        x.next.prev = x  
    # 对外接口   value
    def get(self, key: int) -> int:
        node = self.get_node(key)
        return node.value if node else -1  # 如果没找到，返回 -1
    # 对外接口：插入或更新 key-value
    def put(self, key: int, value: int) -> None:
        node = self.get_node(key) 
        if node:                   
            node.value = value   
            return
        self.key_to_node[key] = node = Node(key, value)
        self.push_front(node) 
        if len(self.key_to_node) > self.capacity:
            back_node = self.dummy.prev    
         # 两重删除
            del self.key_to_node[back_node.key]  
            self.remove(back_node)   
    
if __name__ == "__main__":
    # 输入指令：["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
    # 输入参数：[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
    # 1. LRUCache(2)
    obj = LRUCache(2)
    print("LRUCache(2) -> null")
    # 2. put(1, 1)
    obj.put(1, 1)
    print("put(1, 1)   -> null")
    # 3. put(2, 2)
    obj.put(2, 2)
    print("put(2, 2)   -> null")
    # 此时状态：[2, 1] (2最新, 1最旧)
    # 4. get(1) -> 预期 1
    # 这一步很关键！因为访问了 1，1 变成了最新，2 变成了最旧！
    res = obj.get(1)
    print(f"get(1)      -> {res} (预期: 1)")
    # 此时状态：[1, 2]
    # 5. put(3, 3) -> 预期 null
    # 容量满了(2)，需要淘汰最旧的。因为上一步把 1 变成了最新，所以现在最旧的是 2！
    # 淘汰 2，存入 3
    obj.put(3, 3)
    print("put(3, 3)   -> null (淘汰了 2)")
    # 此时状态：[3, 1]
    # 6. get(2) -> 预期 -1
    res = obj.get(2)
    print(f"get(2)      -> {res} (预期: -1)")
    # 7. put(4, 4) -> 预期 null
    # 容量满。当前最旧的是 1，淘汰 1，存入 4
    obj.put(4, 4)
    print("put(4, 4)   -> null (淘汰了 1)")
    # 此时状态：[4, 3]
    # 8. get(1) -> 预期 -1
    res = obj.get(1)
    print(f"get(1)      -> {res} (预期: -1)")
    # 9. get(3) -> 预期 3
    res = obj.get(3)
    print(f"get(3)      -> {res} (预期: 3)")
    # 此时状态：[3, 4]
    # 10. get(4) -> 预期 4
    res = obj.get(4)
    print(f"get(4)      -> {res} (预期: 4)")
    print("--- 测试结束 ---")
```

## [206\. 反转链表](https://leetcode.cn/problems/reverse-linked-list/)

**分析： 时间：O n  空间 O 1 **

```Python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
def create_linked_list(nums):
    if not nums:
        return None
    head = ListNode(nums[0])
    curr = head
    for num in nums[1:]:
        curr.next = ListNode(num)
        curr = curr.next
    return head
def reverse_linked_list(head):
    pre = None
    cur = head
    while cur:
        temp = cur.next   # <--- 【修正】这里原来写成了 curt
        cur.next = pre
        pre = cur
        cur = temp
    return pre
def print_linked_list(head):
    res = []
    current = head
    while current:
        res.append(str(current.val))
        current = current.next
    return " -> ".join(res) 
nums = [1, 2, 3, 4, 5]
head = create_linked_list(nums)       
head2 = reverse_linked_list(head)
print(f"反转后: {print_linked_list(head2)}")
```

**递归法：**

**时间空间 On  On  递归栈上**

```Python
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head
        new_head = self.reverseList(head.next)
        head.next.next = head
        head.next = None
        return new_head
```

## [215\. 数组中的第K个最大元素](https://leetcode.cn/problems/kth-largest-element-in-an-array/)

```Python
**输入:** [3,2,1,5,6,4], k = 2
**输出:** 5
```

**分析：时间空间： On   On 最差**

```Python
import random
def findKthLargest(nums, k):
    def quick_select(nums, k):
        pivot = random.choice(nums)
        big, equal, small = [], [], []
        for num in nums:
            if num > pivot:
                big.append(num)
            elif num < pivot:
                small.append(num)
            else:
                equal.append(num)
        if k <= len(big):
            return quick_select(big, k)
        elif k <= len(big) + len(equal):
            return pivot
        else：
            quick_select(small, k - len(big) - len(equal))
    return quick_select(nums, k)
```

```Python
import random
class Solution:
    def findKthLargest(self, nums: list[int], k: int) -> int:
        target = len(nums) - k
        def quick_select(l, r):
            ra = random.randint(l, r)
            nums[l], nums[ra] = nums[ra], nums[l]
            pivot = nums[l]
            i, j = l, r
            while i < j:
                while i < j and nums[j] >= pivot: j -= 1
                while i < j and nums[i] <= pivot: i += 1
                nums[i], nums[j] = nums[j], nums[i]
            nums[l], nums[i] = nums[i], nums[l]
            if i == target:
                return nums[i]   
            elif i < target:
                return quick_select(i + 1, r)
            else:
                return quick_select(l, i - 1)  
        return quick_select(0, len(nums) - 1)

```

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTc1OWRlZGRhZDlhMzFmZTAwMmQyMzdjOWFjNWM2ODNfNjI4MzE1MTcwYTgxZmFiODFjNmYzZTEzYzVkMjM3NmRfSUQ6NzYwODc4NDUyMjgxMjkwMjYxN18xNzgyNzM5NDI4OjE3ODI4MjU4MjhfVjM)

**堆排：**

**时间空间：O NlogK   O K**

```Python
import heapq
    def findKthLargest(self, nums: List[int], k: int) -> int:
        heap = []
        for num in nums:
            heapq.heappush(heap, num)
            # 满了 弹出
            if len(heap) > k:
                heapq.heappop(heap)
        # 堆顶
        return heap[0]
```

## [25\. K 个一组翻转链表](https://leetcode.cn/problems/reverse-nodes-in-k-group/)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YmJkYzNkNzg1MWJiMjRhMjQyZmRlNDA5MDM3MDQ0MDVfNDliNzUzYjIxM2NiNTllN2E5Zjg5OTYyOGNiMjZkMWNfSUQ6NzYwODc4NjYxNTk2NzY5ODExOF8xNzgyNzM5NDI4OjE3ODI4MjU4MjhfVjM)

**时间空间 On  O n**

```Python
def reverse_k_group(head, k):
    n = 0
    cur = head
    while cur:
        n += 1
        cur = cur.next
    p0 = dummy = ListNode(0，head)
    pre = None
    cur = head
    while n >= k:
        for _ in range(k):
            temp = cur.next
            cur.next = pre  
            pre = cur
            cur = temp

        tail = p0.next
        p0.next.next = cur
        p0.next = pre
        p0 = tail
        n -= k
    return dummy.next
```

## [15\. 三数之和](https://leetcode.cn/problems/3sum/)

```SQL
class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        nums.sort()
        ans  = []
        n = len(nums)
        for i in range(n-2):
            if i > 0 and nums[i] == nums[i-1]:
                continue
            left = i + 1
            right = n -1
            while left < right:
                total  = nums[left] + nums[i] + nums[right]
                if total  < 0:
                    left += 1
                elif total > 0:
                    right -= 1
                else:
                    ans.append([nums[i],nums[left],nums[right]])
                    while left < right  and nums[left] == nums[left+1]:
                        left += 1
                    while left < right  and nums[right] == nums[right -1]:
                        right -= 1
                    left +=1
                    right -= 1
        return ans

```

## [5\. 最长回文子串](https://leetcode.cn/problems/longest-palindromic-substring/)

给你一个字符串 `s`，找到 `s` 中最长的回文子串。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MzY5NGQzZDIwYmFiZWU0MzczMmM4MDBlY2NkYzAyOWRfZTM3YjE1MjViMjQ0YmYwMWNhYzlhNjM1N2JlZDk4ODlfSUQ6NzYwODc4NjkwMTE2Nzc3MDg1MF8xNzgyNzM5NDI4OjE3ODI4MjU4MjhfVjM)

**时间空间： n\*\*2  1**

```Python
def longestPalindrome(s):
    n = len(s)
    if n < 2:
        return s
    def expand(l, r):
        while l >= 0 and r < n and s[l] == s[r]:
            l -= 1
            r += 1
        return l + 1, r - 1  
    best_l, best_r = 0, 0
    for i in range(n):
        l1, r1 = expand(i, i)       # 奇回文
        if r1 - l1 > best_r - best_l:
            best_l, best_r = l1, r1
        l2, r2 = expand(i, i + 1)   # 偶回文
        if r2 - l2 > best_r - best_l:
            best_l, best_r = l2, r2
    return s[best_l:best_r + 1]
```

```Python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        n = len(s)
        dp = [[False] * n for _ in range(n)]
        maxlen = 0
        ans = ""
        for i in range(n-1, -1, -1):
            for j in range(i, n):
                if s[i] == s[j]:
                    if j - i <= 2:
                        dp[i][j] = True
                    else:
                        dp[i][j] = dp[i+1][j-1]
                if dp[i][j] and j - i + 1 > maxlen:
                    maxlen = j - i + 1
                    ans = s[i:j+1]
        return ans

```

## [21\. 合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/)

**时间空间  On  1**

```Python
def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = cur = ListNode(0)
        while list1 and list2:
            if list1.val < list2.val:
                cur.next = list1
                list1 = list1.next
            else:
                cur.next = list2
                list2 = list2.next
            cur = cur.next
        cur.next = list1 or list2
        return dummy.next
```

## [102\. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/)

**分析：时间空间：   n  n**

```Python
from collections import deque
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None
def build_tree(nodes):
    if not nodes or nodes[0] == "null":
        return None
    root = TreeNode(nodes[0])
    q = deque([root])
    i = 1
    while q and i < len(nodes):
        node = q.popleft()
        if i < len(nodes) and nodes[i] != "null":
            node.left = TreeNode(nodes[i])
            q.append(node.left)
        i += 1
        if i < len(nodes) and nodes[i] != "null":
            node.right = TreeNode(nodes[i])
            q.append(node.right)
        i += 1
    return root
def levelOrder(root):
    if not root:
        return []
    res = []
    q = deque([root])
    while q:
        level = []
        n = len(q)
        for _ in range(n):
            node = q.popleft()
            level.append(node.val)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
        # 针对每层的值
        res.append(level)
    return res
nodes = [3, 9, 20, "null", "null", 15, 7]
root = build_tree(nodes)
result = levelOrder(root) 
print(result) 
```

## [53\. 最大子数组和](https://leetcode.cn/problems/maximum-subarray/)

```Python
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        ans = float('-inf')
        f = 0
        for x in nums:
            f = max(x,f+x)
            ans = max(ans,f)
        return ans
```



## [200\. 岛屿数量](https://leetcode.cn/problems/number-of-islands/)

给你一个由 `'1'`（陆地）和 `'0'`（水）组成的的二维网格，请你计算网格中岛屿的数量。

岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。

此外，你可以假设该网格的四条边均被水包围。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTQwNzhhMGYzODg4M2Y4MzBmNzY3ZjY5OTM4ZDU0ZDhfM2EwMDllNTljMGRkMjhkZDBmNjliNjU1MjM3ODgyMmNfSUQ6NzYwODc4Nzk4MDMwMzU2NzgxNl8xNzgyNzM5NDI4OjE3ODI4MjU4MjhfVjM)

**分析： 时间空间 mn  mn**

```Python
def numIslands(grid):
    m, n = len(grid), len(grid[0])
    count = 0
    def dfs(r, c):
        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] == '0':
            return
        grid[r][c] = '0'
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
     for r in range(m):
        for c in range(n):
            if grid[r][c] == '1':
                count += 1  
                dfs(r, c) 
    return count
grid1 = [
    list("11110"),
    list("11010"),
    list("11000"),
    list("00000")
]
print(numIslands(grid1))   # 预期: 1
mn   mn
```

## [46\. 全排列](https://leetcode.cn/problems/permutations/)

给定一个不含重复数字的数组 `nums` ，返回其 *所有可能的全排列* 。你可以 **按任意顺序** 返回答案。

```Java
**输入：**nums = [1,2,3]
**输出：**[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

分析： 时间空间：n\*n！ n

```Python

def permute(nums: List[int]) -> List[List[int]]:
    n = len(nums)  
    ans = []  
    path = [0] * n 
    used = [False] * n  
    def dfs(i):
        if i == n:
            ans.append(path.copy()) 
            return
        for j in range(n):
            if not used[j]:  
                path[i] = nums[j] 
                used[j] = True  
                dfs(i + 1)  
                used[j] = False  
    dfs(0) 
    return ans   
```

## [20\. 有效的括号](https://leetcode.cn/problems/valid-parentheses/)

```Python
**输入：**s = "()"
**输出：**true
```

**时间空间 n n**

```Python
class Solution:
    def isValid(self, s: str) -> bool:
        mp = {')':'(', '}':'{', ']': '['}
        st = []
        for c in s:
            if c not in mp:
                st.append(c)
            elif  not st or ans.pop() != mp[c]:
                return False
        return not st
```

## [121\. 买卖股票的最佳时机](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/)

**时间空间： n  1**

```Python
def max_profit(prices):
    ans = 0
    min_price = prices[0]
    for p in prices:
        ans = max(ans, p - min_price)
        min_price = min(min_price, p)
    return ans
```

## [236\. 二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/)

**时间空间 n节点  h 树的高度**

```Python
from collections import deque
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None
def buildTree(nodes):
    if not nodes or nodes[0] == "null":
        return None, []
    root = TreeNode(int(nodes[0]))
    queue = deque([root])
    all_nodes = [root]  # 用于存储所有节点对象
    i = 1
    while queue and i < len(nodes):
        current = queue.popleft()
        # 左子节点
        if i < len(nodes) and nodes[i] != "null":
            current.left = TreeNode(int(nodes[i]))
            queue.append(current.left)
            all_nodes.append(current.left)
        i += 1
        # 右子节点
        if i < len(nodes) and nodes[i] != "null":
            current.right = TreeNode(int(nodes[i]))
            queue.append(current.right)
            all_nodes.append(current.right)
        i += 1
    return root, all_nodes

# 递归查找最近公共祖先
def lowestCommonAncestor(root, p, q):
    if not root or root == p or root == q:
        return root
    left = lowestCommonAncestor(root.left, p, q)
    right = lowestCommonAncestor(root.right, p, q)
    if left and right:
        return root
    return left if left else right

# 查找目标值对应的节点对象
def find_node_by_value(all_nodes, value):
    for node in all_nodes:
        if node.val == value:
            return node
    return None

# 主函数入口
if __name__ == "__main__":
    nodes = input().strip().split()
    p_val, q_val = map(int, input().strip().split())

    root, all_nodes = buildTree(nodes)
    p = find_node_by_value(all_nodes, p_val)
    q = find_node_by_value(all_nodes, q_val)

    ancestor = lowestCommonAncestor(root, p, q)
    print(ancestor.val if ancestor else "未找到公共祖先")

```

## [92\. 反转链表 II](https://leetcode.cn/problems/reverse-linked-list-ii/)

```Plain Text
**输入：**head = [1,2,3,4,5], left = 2, right = 4
**输出：**[1,4,3,2,5]
```

**时间空间： n  1**

```Python
def reverseBetween(head, left, right):
    p0 = dummy = ListNode(0，head)
    for _ in range(left - 1):
        p0 = p0.next
    pre = None
    cur = p0.next
    for _ in range(right - left + 1):
        temp = cur.next
        cur.next = pre
        pre = cur
        cur = temp
    p0.next.next = cur
    p0.next = pre
    return dummy.next

```

## [103\. 二叉树的锯齿形层序遍历](https://leetcode.cn/problems/binary-tree-zigzag-level-order-traversal/)

**时间空间： n  n**

```Python
def zigzagLevelOrder(root):
    if not root:
        return []
    res = []
    q = deque([root])
    left_to_right = True
    while q:
        level = []
        n = len(q)
        for _ in range(n):
            node = q.popleft()
            level.append(node.val)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
        if not left_to_right:
            level.reverse()
        res.append(level)
        left_to_right = not left_to_right
    return res


```

## [141\. 环形链表](https://leetcode.cn/problems/linked-list-cycle/)

**时间空间：n  1**

```Python
def hasCycle(head):
    slow=fast=head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False
```

## [300\. 最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/)

**时间空间 n\*\*2  n**

```Python
def lengthOfLIS(nums) -> int:
        if not nums:
           return 0
        n = len(nums)
        dp = [1] * n
        for i in range(n):
            f or j in range(i):
                if nums[j] < nums[i]: 
        # 非连续
                    dp[i] = max(dp[i], dp[j] + 1)
        return max(dp)
```

```Python
def lengthOfLIS(nums):
    if not nums:
        return []
    n = len(nums)
    dp = [1] * n
    prev = [-1] * n 
    for i in range(n):
        for j in range(i):  
            if nums[j] < nums[i]:
                if dp[j] + 1 > dp[i]:
                    dp[i] = dp[j] + 1
                    prev[i] = j  # 记录前驱节点
    max_len = max(dp)
    idx = dp.index(max_len)
    res = []
    while idx != -1:
        res.append(nums[idx])
        idx = prev[idx]
    return res[::-1] 
```

```SQL
def lengthOfLIS(nums):
    tails = []
    for x in nums:
        left, right = 0, len(tails)
        while left <= right:
            mid = (left + right) // 2
            if tails[mid] < x:
                left = mid + 1
            else:
                right = mid + 1

        if left == len(tails):
            tails.append(x)
        else:
            tails[left] = x

    return len(tails)
```

## [54\. 螺旋矩阵](https://leetcode.cn/problems/spiral-matrix/)

**时间空间 mn mn**

```Python
DIRS = [(0, 1), (1, 0), (0, -1), (-1, 0)]  # 右下左上
def spiral_order(matrix):
    m, n = len(matrix), len(matrix[0])
    ans = []
    i = j = di = 0
    for _ in range(m * n):
        ans.append(matrix[i][j])
        matrix[i][j] = None  
        x, y = i + DIRS[di][0], j + DIRS[di][1]
        if x < 0 or x >= m or y < 0 or y >= n or matrix[x][y] is None:
            di = (di + 1) % 4  
        i += DIRS[di][0]
        j += DIRS[di][1]
    return ans 
```

## [143\. 重排链表](https://leetcode.cn/problems/reorder-list/)

**时间空间  n  n**

```Python
class Solution:
    def reorderList(self, head: Optional[ListNode]) -> None:
        if not head or not head.next :
            return None
        def middle(head):
            fast = slow  = head
            while fast and fast.next:
                slow = slow.next
                fast  = fast.next.next
            return slow
        def reverse_list(head):
            cur = head
            pre = None
            while cur:
                temp = cur.next
                cur.next = pre
                pre  =cur
                cur = temp
            return pre
        mid = middle(head)
        l2 = reverse_list(mid.next)
        mid.next = None 
        l1 = head
        while l2:
            l1_temp = l1.next
            l2_temp = l2.next
            l1.next = l2
            l2.next = l1_temp
            l1 = l1_temp
            l2 = l2_temp

```

## [23\. 合并 K 个升序链表](https://leetcode.cn/problems/merge-k-sorted-lists/)

**时间空间 nlogk   logk**

```Python
class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        def merge_list(l1, l2):
            cur = dummy = ListNode(0)
            while l1 and l2:
                if l1.val <= l2.val:
                    cur.next = l1
                    l1 = l1.next
                else:
                    cur.next = l2
                    l2 = l2.next
                cur = cur.next
            cur.next = l1 or l2
            return dummy.next
        m = len(lists)
        if m == 0:
            return None
        if m == 1:
            return lists[0]
        l1 = self.mergeKLists(lists[:m // 2])
        l2 = self.mergeKLists(lists[m // 2:])
        return merge_list(l1, l2)
```

## [415\. 字符串相加](https://leetcode.cn/problems/add-strings/)

```Python
**输入：**num1 = "11", num2 = "123"
**输出：**"134"
```

**时间空间 max\(m,n\)  max\(m,n\)**

```Python
def addStrings(num1：str, num2: str) -> str:
    i, j = len(num1) - 1, len(num2) - 1
    carry = 0
    res = []
    while i >= 0 or j >= 0 or carry:
        n1 = int(num1[i]) if i >= 0 else 0
        n2 = int(num2[j]) if j >= 0 else 0
        total = n1 + n2 + carry
        carry = total // 10
        res.append(str(total % 10))
        i -= 1
        j -= 1
    return ''.join(res[::-1])
```

## [56\. 合并区间](https://leetcode.cn/problems/merge-intervals/)

```Python
**输入：**intervals = [[1,3],[2,6],[8,10],[15,18]]
**输出：**[[1,6],[8,10],[15,18]]
**解释：**区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6]
```

**时间空间 nlogn    n**

```Python

def merge(intervals: List[List[int]]) -> List[List[int]]:
# 没有逗号
    intervals.sort(key=lambda p: p[0])  
    ans = []
    for p in intervals:
        if ans and p[0] <= ans[-1][1]: 
            ans[-1][1] = max(ans[-1][1], p[1])  
        else: 
            ans.append(p)
    return ans
```

## [1143\. 最长公共子序列](https://leetcode.cn/problems/longest-common-subsequence/)

**mn  mn**

```Python
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        m, n = len(text1), len(text2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]  
        for i in range(1，m+1): 
            for j in range(1，n+1):  
                if text1[i-1] == text2[j-1]:
                    dp[i][j] = 1 + dp[i-1][j-1]
                else:
                    dp[i][j] = max(dp[i-1][j], dp[i][j-1])
        return dp[m][n]
 
```

## [124\. 二叉树中的最大路径和](https://leetcode.cn/problems/binary-tree-maximum-path-sum/)

**时间空间： n节点数   h高度**

```Python
def max_path_sum(root):
    ans = float('-inf')
    def dfs(node):
        nonlocal ans
        if not node:
            return 0
        lh = dfs(node.left)
        rh = dfs(node.right)
        ans = max(ans, lh + rh + node.val)
        return max(max(lh, rh) + node.val, 0)
    dfs(root)
    return ans
```

## [93\. 复原 IP 地址](https://leetcode.cn/problems/restore-ip-addresses/)

```Java
**输入：**s = "25525511135"
**输出：**["255.255.11.135","255.255.111.35"]
```

```Python
def restoreIpAddresses(self, s: str) -> List[str]:
    ans = []
    path = []  
    n = len(s)      
    def dfs(i: int):
        if i == n:
            if len(path) == 4:
                ans.append('.'.join(path))  
            return
        for j in range(i, n):
            ss = s[i:j+1] 
            if str(int(ss)) != ss or int(ss) > 255 or len(path) >= 4:
                return  
            path.append(ss)  
            dfs(j + 1) 
            path.pop() 
    dfs(0)
    return ans

```

## [72\. 编辑距离](https://leetcode.cn/problems/edit-distance/)

```Python
class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        n1 = len(word1)
        n2 = len(word2)
        dp = [[0] * (n2 + 1) for _ in range(n1 + 1)]
        for j in range(1, n2 + 1):
            dp[0][j] = dp[0][j-1] + 1
        for i in range(1, n1 + 1):
            dp[i][0] = dp[i-1][0] + 1
        for i in range(1, n1 + 1):
            for j in range(1, n2 + 1):
                if word1[i-1] == word2[j-1]:
                    dp[i][j] = dp[i-1][j-1]
                else:
                    dp[i][j] = min(dp[i][j-1], dp[i-1][j], dp[i-1][j-1] ) + 1      
        return dp[-1][-1]
```

## [82\. 删除排序链表中的重复元素 II](https://leetcode.cn/problems/remove-duplicates-from-sorted-list-ii/)

**时间空间 n n**

```Python
class Solution:
    def deleteDuplicates(self, head: Optional[ListNode]) -> Optional[ListNode]:
        cur = dummy = ListNode(0,next=head)
        while cur.next and cur.next.next:
            val = cur.next.val
            if cur.next.next.val == val:  
                while cur.next and cur.next.val == val:
                    cur.next = cur.next.next
            else:
                cur = cur.next
        return dummy.next
```

## [19\. 删除链表的倒数第 N 个结点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/)

**时间空间 n  1**

```Python
def remove_nth_from_end(head, n):
    fast = slow = dummy ListNode(-1, head)  
    for _ in range(n):
        fast = fast.next
    while fast.next:
        fast = fast.next
        slow = slow.next
    slow.next = slow.next.next
    return dummy.next  
```



## [142\. 环形链表 II](https://leetcode.cn/problems/linked-list-cycle-ii/)

**时间空间 n 1**

```Python
class Solution:
    def detectCycle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            #判断 存在
            if fast is slow:  
                while slow is not head:  # 再走 a 步
                    slow = slow.next
                    head = head.next
                return slow
        return None
```

## [4\. 寻找两个正序数组的中位数](https://leetcode.cn/problems/median-of-two-sorted-arrays/)

```Python
def findMedianSortedArrays(nums1, nums2):
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    m, n = len(nums1), len(nums2)
    imin, imax = 0, m
    half_len = (m + n + 1) // 2 
    while imin <= imax：
        # nums1 的切割位置
        i = (imin + imax) // 2
        # nums2 的切割位置
        j = half_len - i      
        if i < m and nums2[j-1] > nums1[i]:
            imin = i + 1
        elif i > 0 and nums1[i-1] > nums2[j]:
            imax = i - 1
        else: 
            if i == 0:
                max_left = nums2[j-1]
            elif j == 0:
                max_left = nums1[i-1]
            else:
                max_left = max(nums1[i-1], nums2[j-1])        
            if (m + n) % 2 == 1:
                return max_left      
            if i == m:
                min_right = nums2[j]
            elif j == n:
                min_right = nums1[i]
            else:
                min_of_right = min(nums1[i], nums2[j])
            return (max_of_left + min_of_right) / 2.0
```

## [199\. 二叉树的右视图](https://leetcode.cn/problems/binary-tree-right-side-view/)

**时间空间 n n**

```Python
def right_side_view(root):
    if not root:
        return []
    q = deque([root])
    res = []
    while q:
        n = len(q)
        for i in range(n):
            node = q.popleft()
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
            if i == len(q) - 1:   # 每层最后一个
                res.append(node.val)
    return res
    
    from collections import deque

def left_side_view(root):
    if not root:
        return []
    q = deque([root])
    res = []
    while q:
        n = len(q)
        for i in range(n):
            node = q.popleft()
            if i == 0:
                res.append(node.val)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)            
    return res

```

## [165\. 比较版本号](https://leetcode.cn/problems/compare-version-numbers/)

**时间空间  n  n **

```Python
def compare_version(version1, version2):
    l1 = version1.split('.')
    l2 = version2.split('.')
    i= j =0
    while i < len(l1) or j < len(l2):
        v1 = int(l1[i]) if i < len(l1) else 0
        v2 = int(l2[j]) if j < len(l2) else 0
        if v1 < v2:
            return -1
        if v1 > v2:
            return 1
        i += 1
        j += 1
    return 0

```

## [22\. 括号生成](https://leetcode.cn/problems/generate-parentheses/)

**时间空间： C\(2n,n\)/n\+1 \* n     n**

```Python

class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        ans = []
        path = []

        def dfs(left, right):
            if len(path) == 2 * n:
                ans.append("".join(path))
                return
            if left < n:
                path.append("(")
                dfs(left + 1, right)
                path.pop()
            if right < left:
                path.append(")")
                dfs(left, right + 1)
                path.pop()
        dfs(0, 0)
        return ans
```

## [148\. 排序链表](https://leetcode.cn/problems/sort-list/)

**时间空间：nlogn   logn**

```Python
class Solution:
    def sortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head
        def middle_node(head):
            slow = head
            fast = head.next
            while fast and fast.next:
                 slow = slow.next
                fast = fast.next.next
            return slow
        def merge_list(l1, l2):
            dummy = cur = ListNode(0)
            while l1 and l2:
                if l1.val <= l2.val:
                    cur.next = l1
                    l1 = l1.next
                else:
                    cur.next = l2
                    l2 = l2.next
                cur = cur.next
            cur.next = l1 or l2
            return dummy.next
        mid = middle_node(head)
        l2 = mid.next
        mid.next = None
        l1 = self.sortList(head)
        l2 = self.sortList(l2)
        return merge_list(l1, l2)
```

## [232\. 用栈实现队列](https://leetcode.cn/problems/implement-queue-using-stacks/)

```Java
**输入：**
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
**输出：**
[null, null, null, 1, 1, false]

**解释：**
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
myQueue.peek(); // return 1
myQueue.pop(); // return 1, queue is [2]
myQueue.empty(); // return false
```

**时间空间  1  n**

```Python
class MyQueue:
    def __initb
 # A负责接入  B负责弹出 
        self.A = []
        self.B = []
    def push(self, x: int) -> None:
        self.A.append(x)
    def pop(self) -> int:
        if not self.B:
            while self.A:
                self.B.append(self.A.pop())
        return self.B.pop()
    def peek(self) -> int:
        if not self.B:
            while self.A:
                self.B.append(self.A.pop())
        return self.B[-1]

    def empty(self) -> bool:
        return not self.A and not self.B
```

## [239\. 滑动窗口最大值](https://leetcode.cn/problems/sliding-window-maximum/)

**n   k**

```Python
from collections import deque
def maxSlidingWindow(nums, k):
    ans = []
    q = deque()
    for right, c in enumerate(nums):
        while q and nums[q[-1]] <= c:
            q.pop()
        q.append(right)
        left = right - k + 1
        if q[0] < left: 
            q.popleft()
        if left >= 0:
            ans.append(nums[q[0]])
    return ans
虽然里面有个 while 循环，但每个元素最多**进队一次**，最多**出队一次**。
队列长度最长不会超过窗口大小 $K$
```

## [94\. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/)

**n  n和logn**

```C++
def inorderTraversal_stack(root):
    res = []
    stack = []
    cur = root
    while cur or stack:
        while cur:         
            stack.append(cur)
            cur = cur.left
        cur = stack.pop()       
        res.append(cur.val)
        cur = cur.right         # 转向右子树
    return res

```

## [69\. x 的平方根 ](https://leetcode.cn/problems/sqrtx/)

**Logn 1**

```Python
def mySqrt(x: int) -> int:
    left, right = 0, x
    while left <= right:
        mid = left + (left + right) // 2
        if mid * mid == x:
            return mid
        elif mid * mid < x:
            left = mid + 1
        else:
            right = mid - 1
    return right 

```

```Python
class Solution:
    def mySqrt(self, x: int) -> int:
        if x < 2:
            return x
        r = x
   # 默认开始大于
        while r * r > x:
    # 整除
            r = (r + x // r) // 2  
        return r
```

## [32\. 最长有效括号](https://leetcode.cn/problems/longest-valid-parentheses/)

```Python
**输入：**s = "(()"
**输出：**2
**解释：**最长有效括号子串是 "()"
```

**N  n**

```Java
def longest_valid_parentheses(s):
    stack = [-1]
    ans = 0
    for i, c in enumerate(s):
        if c == '(':
            stack.append(i)
        else:
            stack.pop()
            if not stack:
                stack.append(i)
            else:
                 ans = max(ans, i-stack[-1])
    return ans

```

## 👽[31\. 下一个排列](https://leetcode.cn/problems/next-permutation/)

**N   1**

```Python
def nextPermutation(nums):
    n = len(nums)
    i = n - 2
    while i >= 0 and nums[i] >= nums[i + 1]:
        i -= 1
    if i >= 0:
        j = n - 1
        while nums[j] <= nums[i]:
            j -= 1
        nums[i], nums[j] = nums[j], nums[i]
    left, right = i + 1, n - 1
    while left < right:
        nums[left], nums[right] = nums[right], nums[left]
        left += 1
        right -= 1

```

## [8\. 字符串转换整数 ](https://leetcode.cn/problems/string-to-integer-atoi/)

**N 1**

```Python
class Solution:
    def myAtoi(self, s: str) -> int:
        s = s.lstrip()
        if not s:
            return 0
        sign = 1
        if s[0] == '-':
            sign = -1
            s = s[1:]
        elif s[0] == '+':
            s = s[1:]
        num = 0
        for ch in s:
            if char.isdigit():  
                num= num* 10 + int(ch)  
            else:
                break  
        num = sign * num
        if result < -2 ** 31:
            return -2 ** 31
        if result > 2 ** 31 - 1:
            return 2 ** 31 -1 
        return num
```

## [2\. 两数相加](https://leetcode.cn/problems/add-two-numbers/)

```Java
**输入：**l1 = [2,4,3], l2 = [5,6,4]
**输出：**[7,0,8]
**解释：**342 + 465 = 807.
```

**n  1**

```Python
def addTwo(l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
            cur = dummy = ListNode()
            carry = 0
            while l1 or l2 or carry:
                if l1:
                    carry += l1.val
                    l1 = l1.next
                if l2:
                    carry += l2.val
                    l2 = l2.next
                cur.next = ListNode(carry % 10)
                carry //= 10
                cur = cur.next
            return dummy.next

```

## [322\. 零钱兑换](https://leetcode.cn/problems/coin-change/)

**M\*N  N**

```Python
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1) 
    dp[0] = 0
    for i in range(1, amount + 1):
        for coin in coins:
            if i >= coin:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    return -1 if dp[amount] == float('inf') else dp[amount]

```

## [70\. 爬楼梯](https://leetcode.cn/problems/climbing-stairs/)

**N **

```Python
def climbStairs(n):
        dp = [0] * (n + 1)
        dp[0] = dp[1] = 1
        for i in range(2, n + 1):
            dp[i] = dp[i - 1] + dp[i - 2]
        return dp[n]
```

## [43\. 字符串相乘](https://leetcode.cn/problems/multiply-strings/)

```Python
**输入:** num1 = "2", num2 = "3"
**输出:** "6"
```

**m\*n  m\+n**

```Python
class Solution:
    def multiply(self, num1: str, num2: str) -> str:
        if num1 == "0" or num2 == "0":   
            return "0"   
# 双层遍历
        m, n = len(num1), len(num2)
        res = [0] * (m + n)  
        for i in range(m - 1, -1, -1): 
            for j in range(n - 1, -1, -1):
                mul = int(num1[i]) * int(num2[j])
                total = mul + res[i + j + 1]
                res[i + j + 1] = total % 10
                res[i + j] += total // 10
        result = []
        for num in res:
   # 非零 
            if result or num != 0:  
                result.append(str(num))
        return ''.join(result)


```

## [41\. 缺失的第一个正数](https://leetcode.cn/problems/first-missing-positive/)

```Java
**输入：**nums = [3,4,-1,1]
**输出：**2
**解释：**1 在数组中，但 2 没有。
```

N 1

```Python
def firstMissingPositive(nums):
    n = len(nums)
 #  for 循环
    for i in range(n):
        while 1 <= nums[i] <= n and nums[i] != nums[nums[i] - 1]:
            j = nums[i] - 1  
            nums[i], nums[j] = nums[j], nums[i]
    for i in range(n):
        if nums[i] != i + 1:
            return i + 1
    return n + 1

```

## [78\. 子集](https://leetcode.cn/problems/subsets/)

```Java
**输入：**nums = [1,2,3]
**输出：**[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
```

**2\*\*n   2\*\*n**

```Python
def subsets(self, nums):
        n = len(nums)
        ans = []
        path = []
        def dfs(i):
           ans.append(path.copy())  
           for j in range(i, n):  
                path.append(nums[j])  
                dfs(j + 1)  
                path.pop()  
        dfs(0)
        return ans
```

## [151\. 反转字符串中的单词](https://leetcode.cn/problems/reverse-words-in-a-string/)

```Python
**输入：**s = "the sky is blue"
**输出：**"blue is sky the"
```

**n  n**

```Python
def reverse_words(s):
# 去掉左右空格
    s = s.strip()
    i = j = len(s) - 1 
    res = []
    while i >= 0:
        while i >= 0 and s[i] != ' ':
            i -= 1
        res.append(s[i + 1: j + 1])
        while i >= 0 and s[i] == ' ':
            i -= 1
        j = i
    return ' '.join(res)
```

## [34\. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/)

```Python
**输入：**nums = [5,7,7,8,8,10], target = 8
**输出：**[3,4]
```

**Logn  1**

```SQL
def searchRange(nums, target):
    def lower_bound(nums, target):
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return left
    start = lower_bound(nums, target)
    end = lower_bound(nums, target + 1) - 1
    if start >= len(nums) and nums[start] != target:   
        return [-1, -1]
    return [start,end]
    
```

## [155\. 最小栈](https://leetcode.cn/problems/min-stack/)

```Python
class MinStack:
    def __init__(self):
        self.stack = []
        self.minstack = []
    def push(self, x: int) -> None:
        if  not self.stack:
            self.stack.append(x)
            self.minstack.append(x)
        else:
            self.stack.append(x)
            self.minstack.append(min(x,self.minstack[-1]))
    def pop(self) -> None:
        self.stack.pop()
        self.minstack.pop()
    def top(self) -> int:
        return self.stack[-1]
    def getMin(self) -> int:
        return self.minstack[-1]
```

## [129\. 求根节点到叶节点数字之和](https://leetcode.cn/problems/sum-root-to-leaf-numbers/)

**平衡树O\(n\)O\(log n\)**
**最坏情况O\(n\)O\(n\)**

```Python
class Solution:
    def sumNumbers(self, root: Optional[TreeNode],x= 0) -> int:
        if not root:
            return 0
        x = x * 10 + root.val
        if not root.left  and not root.right: 
            return x
        return self.sumNumbers(root.left, x) + self.sumNumbers(root.right, x)

```

## [101\. 对称二叉树](https://leetcode.cn/problems/symmetric-tree/)

On  ologn   on on

```TypeScript

def isSymmetric(root):
    if not root:
        return True
    def isMirror(left, right):
        if not left or not right:
            return t1 == t2
        return (t1.val == t2.val and 
                isMirror(t1.left, t2.right) and 
                isMirror(t1.right, t2.left))
    return isMirror(root.left, root.right)
```

## [394\. 字符串解码](https://leetcode.cn/problems/decode-string/)

```Java
**输入：**s = "3[a]2[bc]"
**输出：**"aaabcbc"
```

**N  n **

```Python
cdef decode_string(s):
    st_str = []
    st_num = []
    res = ""
    num = 0
    for ch in s:
        if ch.isdigit():
            num = num * 10 + int(ch)
        elif ch == '[':
            st_str.append(res)
            st_num.append(num)
            res = ""
            num = 0  
        elif ch == ']':
            res = st_str.pop() + res * st_num.pop()
        else:
            res += ch
    return res
```

## [64\. 最小路径和](https://leetcode.cn/problems/minimum-path-sum/)

给定一个包含非负整数的 *`m`*` x `*`n`* 网格 `grid` ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

**说明：**每次只能向下或者向右移动一步。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZWEwOWI0MGU3OTAyNzNjZGJhYjE1ZmE1MTZlZGEyN2JfZWIxMGQ0NmFiMGM5MzdmNTBlZTgwOGRhYjk2NWRhNjlfSUQ6NzYwOTk0MDgyMjgxMjgyMjcxNF8xNzgyNzM5NDI4OjE3ODI4MjU4MjhfVjM)

**Mn mn   mn n **

```Python
def minPathSum(grid):
    m = len(grid)
    n = len(grid[0])
    dp = [[0] * n for _ in range(m)
    dp[0][0] = grid[0][0]
    for i in range(1, m):
        dp[i][0] = dp[i - 1][0] + grid[i][0]
    for j in range(1, n):
        dp[0][j] = dp[0][j - 1] + grid[0][j]
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
    return dp[m - 1][n - 1]

if __name__ == "__main__":
    m, n = map(int, input().split())
    grid = [list(map(int, input().split())) for _ in range(m)]
    print(minPathSum(grid))
mn   n

```

```Python
def minPathSum(grid):
    m, n = len(grid), len(grid[0])
    dp = [0] * n
    dp[0] = grid[0][0]
    for j in range(1, n):
        dp[j] = dp[j-1] + grid[0][j]      
    for i in range(1, m):
        dp[0] = dp[0] + grid[i][0]                
        for j in range(1, n):
            dp[j] = min(dp[j], dp[j-1]) + grid[i][j]  
    return dp[-1]
```

## [39\. 组合总和](https://leetcode.cn/problems/combination-sum/)

```Java
**输入：**candidates = [2,3,6,7], target = 7**输出：**[[2,2,3],[7]]
**解释：**
2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
7 也是一个候选， 7 = 7 。
仅有这两种组合。
```

**n 叉树，最大深度是 Target/min，时间 n^\(T/m\)  O\(T/m\)**

```Python
def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        candidates.sort()
        n = len(candiates)
        ans = []
        path = []
        def dfs(i, target):
            if target == 0:
                ans.append(path.copy())
                return   
            for j in range(i, n):
                if candidates[j] > target:  
                    break
                path.append(candidates[j])
                dfs(j, target - candidates[j])
                path.pop()  
        dfs(0, target)
        return ans
```

## [470\. 用 Rand7\(\) 实现 Rand10\(\)](https://leetcode.cn/problems/implement-rand10-using-rand7/)

**1  1 **

```Python
class Solution:
    def rand10(self):
        while True:
            x = rand7() - 1  # 0 到 6
            y = rand7() - 1  # 0 到 6
            z = x * 7 + y    # 范围：0 到 48
            if z < 40:
                return (z % 10) + 1
```

## [04\. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)

**N    最大递归深度 = 树的高度 h   h 可能是 log n，也可能是 n**

```Python
def maxDepth(root):
    if not root:
        return 0
    left = maxDepth(root.left)
    right = maxDepth(root.right)
    return 1 + max(left, right)

```

## [695\. 岛屿的最大面积](https://leetcode.cn/problems/max-area-of-island/)

**Mn   mn**

```Python
def max_area_of_island(grid):
    m, n= len(grid), len(grid[0])
    ans = 0
    for r in range(m):
        for c in range(c):
            if grid[r][c] == 1:
                ans = max(ans, dfs(r, c)) 
    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == 0:
            return 0
        grid[r][c] = 0  
        return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1)
    return ans
```

## 👽[110\. 平衡二叉树](https://leetcode.cn/problems/balanced-binary-tree/)

```Plain Text
该节点的**左子树**和**右子树**的高度差（绝对值）**不超过 1**。
该节点的**左子树**和**右子树**本身也必须是平衡二叉树。
```

N  h

```Python
def isBalanced(self, root: Optional[TreeNode]) -> bool:
        def dfs(node):
            if not node:
                return 0
            lh = dfs(node.left)
            rh = dfs(node.right)
            if lh == -1 or rh == -1 or abs(rh-lh) > 1:
                return -1
            return 1 + max(lh,rh)
        return dfs(root) != -1
```

## [221\. 最大正方形](https://leetcode.cn/problems/maximal-square/)

```Python
def maximalSquare(matrix):
    if not matrix:
        return 0
    m, n = len(matrix), len(matrix[0])
    dp = [[0] * (n + 1) for _ in range(m + 1)]  
   #  原矩阵中第 i-1 行、第 j-1 列的格子作为“右下角”时，所能构成的、只包含 "1" 的最大正方形的边长。
    max_side = 0  
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if matrix[i-1][j-1] == "1":  
                dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1
                max_side = max(max_side, dp[i][j])  
    return max_side * max_side  


```

```Python
def maximalSquare(matrix):
    if not matrix:
        return 0
    m, n = len(matrix), len(matrix[0])
    dp = [0] * (n + 1)
    max_side = 0
    for i in range(1, m + 1):
        diag = dp[0] 
        for j in range(1, n + 1):
            prev = dp[j]  
            if matrix[i-1][j-1] == "1":
                dp[j] = min(dp[j], dp[j-1], diag) + 1
                max_side = max(max_side, dp[j])
            else:
                dp[j] = 0
            diag = prev  
    return max_side * max_side


```

## [234\. 回文链表](https://leetcode.cn/problems/palindrome-linked-list/)

给你一个单链表的头节点 `head` ，请你判断该链表是否为回文链表。如果是，返回 `true` ；否则，返回 `false` 。

```Python

class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        if not head or not head.next:
            return True
        def middle(head):
            slow = fast = head
            while fast and fast.next:
                slow = slow.next
                fast = fast.next.next
            return slow
        def reverse_list(head):
            prev = None
            cur = head
            while cur:
                temp = cur.next
                cur.next = prev
                prev = cur
                cur = temp
            return prev
        mid  = middle(head)
        l2 = reverse_list(mid)
        while l2:
            if l2.val != head.val:
                return False
            l2 = l2.next
            head = head.next
        return True 
        
```

## 👽[122\. 买卖股票的最佳时机 II](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/)

```Python
def max_profit(prices):
    ans = 0
    n = len(prices)
    for i in range(1,n):
        tmp = prices[i] - prices[i - 1]
        if tmp > 0:
            ans += tmp
    return ans

```

```Python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        n = len(prices)
        dp = [[0,0] for _ in range(n)]
        dp[0] = [-prices[0], 0]
        for i in range(1, n):
            dp[i][0] = max(dp[i-1][0], - prices[i] + dp[i-1][1])
            dp[i][1] = max(dp[i-1][1], + prices[i] + dp[i-1][0])
        return dp[-1][-1]
```

## [240\. 搜索二维矩阵 II](https://leetcode.cn/problems/search-a-2d-matrix-ii/)

**m \+n  1**

```Python
def search(matrix, target):
    m, n = len(matrix), len(matrix[0])
    i, j = 0, n - 1 
    while i < m and j >= 0:
        if matrix[i][j] == target:
            return True
        elif matrix[i][j] < target:
            i += 1
        else:  
            j -= 1
    return False
```

## [98\. 验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree/)

N  logn

```Python
def isValidBST(self, root, left=-inf, right=inf):
        if not root:
            return True
        return left < root.val < right and \
               self.isValidBST(root.left, left, root.val ) and \
               self.isValidBST(root.right, root.val , right)


```

## [48\. 旋转图像](https://leetcode.cn/problems/rotate-image/)

**n^2  1**

```Python
def rotate(matrix):
    n = len(matrix)
    for i in range(n):
        for j in range(i):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    # 顺时针         
    for row in matrix:
        row.reverse()    
    # 逆时针（j不变 只有i）
    for j in range(n):
        for i in range(n // 2):
            matrix[i][j], matrix[n - 1 - i][j] = matrix[n - 1 - i][j], matrix[i][j]
```

## [14\. 最长公共前缀](https://leetcode.cn/problems/longest-common-prefix/)

```Plain Text
**输入：**strs = ["flower","flow","flight"]
**输出：**"fl"
```

```Python
def longestCommonPrefix(self, strs: List[str]) -> str:
        s0 = strs[0]  
        for right, c in enumerate(s0):
            for s in strs:
                if right == len(s) or s[right] != c:
                    return s[0:right]
         return s0

```

## [662\. 二叉树最大宽度](https://leetcode.cn/problems/maximum-width-of-binary-tree/) 

```Python

    def widthOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        ans, q = 0, deque([(1, root)])  
        while queue:
            n  = len(queue)
            mn, mx = inf, 0 
            for _ in range(n):  
                code, node = queue.popleft()  
                if node.left:
                    queue.append((code * 2, node.left))  
                if node.right:
                    queue.append((code * 2 + 1, node.right)) 
                mn, mx = min(code, mn), max(code, mx)  
            ans = max(ans, mx - mn + 1)  
        return ans 

```

## [543\. 二叉树的直径](https://leetcode.cn/problems/diameter-of-binary-tree/)

N  h

```Python

def diameterOfBinaryTree(root):
    ans = 0
    def dfs(node):
        nonlocal ans
        if not node:
            return 0
        lh = dfs(node.left)
        rh = dfs(node.right)
        ans = max(ans, lh + rh)
        return 1 + max(lh, rh)
    dfs(root)  
    return ans
    
    nodes = ["1", "2", "3", "4", "5"]
    root = build_tree(nodes)
    print(diameterOfBinaryTree(root))  # 预期输出 3
```

## [162\. 寻找峰值](https://leetcode.cn/problems/find-peak-element/)

```Python
class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        l, r = 0, len(nums) - 1
        while l < r:
            mid = l + (l + r) // 2
            if nums[mid] < nums[mid + 1]:  
                l = mid + 1 
            else:
                r = mid
        return l 

```

## [152\. 乘积最大子数组](https://leetcode.cn/problems/maximum-product-subarray/)

**n 1**

```Python
def makx_product(nums):
    ans = float('-inf')
    f_max, f_min = 1, 1
    for x in nums:
        tmp = f_max
        f_max = max(tmp * x, f_min * x, x)
        f_min = min(tmp * x, f_min * x, x)
        ans = max(ans, f_max)
    return ans

```



## [62\. 不同路径](https://leetcode.cn/problems/unique-paths/)

Mn  mn

```Python
def uniquePaths(m: int, n: int) -> int:
    dp = [[1] * n for _ in range(m)]
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    return dp[m - 1][n - 1]
```

```Python
def uniquePaths(m: int, n: int) -> int：
    dp = [1] * n   
    for i in range(1, m):
        for j in range(1, n):
            dp[j] = dp[j] + dp[j - 1]  # 左边+上边
    return dp[-1] 
```



## [560\. 和为 K 的子数组](https://leetcode.cn/problems/subarray-sum-equals-k/)

给你一个整数数组 `nums` 和一个整数 `k` ，请你统计并返回 *该数组中和为 **`k`**** ****的子数组的个数 *。

子数组是数组中元素的连续非空序列。

```Java
**输入：**nums = [1,1,1], k = 2
**输出：**2
```

**Defaultdict 默认创建int    **

```Python
from collections import defaultdict
def subarray_sum(nums, k):
    ans = s = 0
    cnt = defaultdict(int)
    cnt[0] = 1  
    for x in nums:
        s += x
        ans += cnt[s - k]
        cnt[s] += 1
    return ans
```



## [198\. 打家劫舍](https://leetcode.cn/problems/house-robber/)

```Python
def rob(nums):
    n = len(nums)
    # 表示第几户  dp[0]没用
    dp = [0] * (n + 1)
    dp[1] = nums[0]
    for i in range(2, n + 1):
        dp[i] = max(dp[i - 1], nums[i - 1] + dp[i - 2])
    return dp[n]  
```

```Python
def rob(nums):
    pre2 = 0
    pre1 = 0
    for num in nums:
        pre2, pre1 = pre1, max(pre1, pre2 + num)
    return pre1
```

## [112\. 路径总和](https://leetcode.cn/problems/path-sum/)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MGMyZmQwM2Y4N2YwMDIzM2M1ZGMxMjE0ZTEwMTIzYzRfOTcwZjk3NzIwMDUwYWJmNjQ3NWQ5MWJlNGEzZjM1MDVfSUQ6NzYxMTAxMTM3MTUwMDg2Njc4OF8xNzgyNzM5NDI4OjE3ODI4MjU4MjhfVjM)

N  h

```Python
def hasPathSum(self, root， target) -> bool:
        if root is None:
            return False
        target -= root.val
        # 走到 叶子节点
        if not root.left and not root.right : 
            return target == 0
        # 判断所有树
        return self.hasPathSum(root.left, target) or self.hasPathSum(root.right, target)
```

## 👽[113\. 路径总和 II](https://leetcode.cn/problems/path-sum-ii/)

给你二叉树的根节点 `root` 和一个整数目标和 `targetSum` ，找出所有 **从根节点到叶子节点** 路径总和等于给定目标和的路径

```Python
class Solution:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> List[List[int]]:
        ans = []  
        path = []
        def dfs(node, target) -> None:
            if node is None:
                return
        # 先添加 在减去
            path.append(node.val)
            target -= node.val  
            if node.left is None and node.right is None and target == 0:
        # 不能直接返回 要接着找 结果未知
                ans.append(path.copy()) 
            else:
                dfs(node.left, target)
                dfs(node.right, target)
            path.pop()  # 恢复
        dfs(root, targetSum)
        return ans
```

## 👽[179\. 最大数](https://leetcode.cn/problems/largest-number/)

```Python
from functools import cmp_to_key
from typing import List

class Solution:
    def largestNumber(self, nums: List[int]) -> str:
        strs = list(map(str, nums))
        def cmp(x, y):
            if x + y > y + x:
                return -1
            if x + y < y + x:
                return 1
            return 0
#  原地排序
        strs.sort(key=cmp_to_key(cmp))   # 注意：不要赋值给 strs
        res = ''.join(strs)
        return '0' if res[0] == '0' else res
```

## [209\. 长度最小的子数组](https://leetcode.cn/problems/minimum-size-subarray-sum/)

```Java
**输入：**target = 7, nums = [2,3,1,2,4,3]
**输出：**2
**解释：**子数组 [4,3] 是该条件下的长度最小的子数组。
```

```Python
def min_sub_array_len(target, nums):
    n = len(nums)
#  最长 n   
    ans = n + 1
    s = left = 0
    for right, x in enumerate(nums):
        s += x
        while s >= target:
            ans = min(ans, right - left + 1)
            s -= nums[left]
            left += 1
  # 返回零
    return ans if ans <= n else 0
```

## [24\. 两两交换链表中的节点](https://leetcode.cn/problems/swap-nodes-in-pairs/)

```Python
class Solution:
    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:
        node0 = dummy = ListNode(next=head) 
# 头结点是1 
        node1 = head
        while node1 and node1.next:  # 至少有两个节点
            node2 = node1.next
            node3 = node2.next
            node0.next = node2  # 0 -> 2
            node2.next = node1  # 2 -> 1
            node1.next = node3  # 1 -> 3
            node0 = node1  # 下一轮交换，0 是 1
            node1 = node3  # 下一轮交换，1 是 3
        return dummy.next  # 返回新链表的头节点
```

## [83\. 删除排序链表中的重复元素](https://leetcode.cn/problems/remove-duplicates-from-sorted-list/)

```Java
**输入：**head = [1,1,2,3,3]
**输出：**[1,2,3]
```

```Python
class Solution:
    def deleteDuplicates(self, head: Optional[ListNode]) -> Optional[ListNode]:
        cur = head
  # 不需要虚拟节点 直接遍历
        while cur and cur.next:
            if cur.val == cur.next.val:
                cur.next = cur.next.next
            else:
                cur = cur.next
        return head
```

## [227\. 基本计算器 II](https://leetcode.cn/problems/basic-calculator-ii/)

```Python
def calculate(s: str) -> int:
    s = s.replace(' ', '') # 去除字符串中的空格
    stack = []
    num = 0
    sign = '+'
    for i, ch in enumerate(s):
        if ch.isdigit():
            num = num * 10 + int(ch)
 # 不是数字    到字符串尾部
        if not ch.isdigit() or i == len(s) - 1:
            if sign == '+':
                stack.append(num)
            elif sign == '-':
                stack.append(-num)
            elif sign == '*':
                stack.append(stack.pop() * num)
            elif sign == '/':
                stack.append(int(stack.pop() / num))
            sign = ch
            num = 0
    return sum(stack)
```

## [226\. 翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/)



```Python
class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None
        root.left,root.right = root.right,root.left
    # 自动反转
        self.invertTree(root.left)
        self.invertTree(root.right)
        return root

```

## [169\. 多数元素](https://leetcode.cn/problems/majority-element/)

```C++
def majorityElement(nums):
    x, votes = 0, 0
    for num in nums:
        if votes == 0:
            x = num
        if num == x：
           votes += 1
         else：
            votes - = 1
    return x  


```

## [139\. 单词拆分](https://leetcode.cn/problems/word-break/)

```Python
def word_break(s, word_dict):
    n = len(s)
    dp = [False] * (n + 1)
    dp[0] = True
    word_set = set(word_dict) 
    for i in range(1, n + 1):
        for j in range(i):
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                break  
    return dp[n]
```

## [718\. 最长重复子数组](https://leetcode.cn/problems/maximum-length-of-repeated-subarray/)

```Java
**输入：**nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]
**输出：**3
**解释：**长度最长的公共子数组是 [3,2,1] 。
```

```Python
class Solution:
    def findLength(self, nums1, nums2):
        n = len(nums1)
        m = len(nums2)
        dp = [[0] * (m + 1) for _ in range(n + 1)]
        ans = 0
        for i in range(1, n + 1):
            for j in range(1, m + 1):
                if nums1[i - 1] == nums2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1] + 1
                    ans = max(ans, dp[i][j])
        return ans

```

```Python
def findLength(nums1, nums2):
    n, m = len(nums1), len(nums2)
    dp = [0] * (m + 1)  # 一维数组
    ans = 0
    for i in range(1, n + 1):
        for j in range(m, 0, -1):
            if nums1[i - 1] == nums2[j - 1]:
                dp[j] = dp[j - 1] + 1
                ans = max(ans, dp[j])
            else:
                dp[j] = 0  
    return ans

```



## [468\. 验证IP地址](https://leetcode.cn/problems/validate-ip-address/)

```Python
class Solution:
    def validIPAddress(self, queryIP: str) -> str:
        if "." in queryIP:
            arr = queryIP.split(".")
            if len(arr) != 4:
                return "Neither"
            for x in arr:
                if not x.isdigit() or int(x) > 255 or (len(x) > 1 and x[0] == "0"):
                    return "Neither"
            return "IPv4"         
        elif ":" in queryIP:
            arr = queryIP.split(":")
            if len(arr) != 8:
                return "Neither"
            for x in arr:
                if len(x) > 4 or not x.isalnum():
                    return "Neither"
                for ch in x：
                    if ch.lower() > "f": 
                        return "Neither"
            return "IPv6"
        return "Neither"
```

## [79\. 单词搜索](https://leetcode.cn/problems/word-search/)

给定一个 `m x n` 二维字符网格 `board` 和一个字符串单词 `word` 。如果 `word` 存在于网格中，返回 `true` ；否则，返回 `false` 。

```Python
class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        m, n = len(board), len(board[0])
        def dfs(i, j, k):
            if board[i][j] != word[k]:  
                return False
            if k == len(word) - 1: 
                return True
            board[i][j] = ''  
            for x, y in (i, j - 1), (i, j + 1), (i - 1, j), (i + 1, j):  
                if 0 <= x < m and 0 <= y < n and dfs(x, y, k + 1):
                    return True  
            board[i][j] = word[k] 
            return False 
        return any(dfs(i, j, 0) for i in range(m) for j in range(n))
```

## [739\. 每日温度](https://leetcode.cn/problems/daily-temperatures/)

给定一个整数数组 `temperatures` ，表示每天的温度，返回一个数组 `answer` ，其中 `answer[i]` 是指对于第 `i` 天，下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用 `0` 来代替。

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTBmZDE2Y2YxY2ZjZDU2OTc0MmEyNzBiMzFkY2I4YTRfNDQ1ZjQ0Mzc3N2M4ZTcxYzM3MTA3MmJmY2E5YjYxMDZfSUQ6NzYxOTg5NjU2ODA2NTMzMDEwNl8xNzgyNzM5NDI4OjE3ODI4MjU4MjhfVjM)

```Python
def daily_temperatures(temperatures):
    n = len(temperatures)
    ans = [0] * n
    stack = []
    for right, c in enumerate(temperatures):
        while stack and temperatures[stack[-1]] < c:
            left = stack.pop()
            ans[left] = right - left
        stack.append(right)
    return ans
```

## 堆排

```Python
from typing import List

class Solution:
    def sortArray(self, nums: List[int]) -> List[int]:
        n = len(nums)
        def max_heapify(heap, root, heap_size):
            while True:
                largest = root           # 假设当前的根节点是最大的
                left = 2 * root + 1      # 左子节点索引
                right = 2 * root + 2     # 右子节点索引
                # 1. 检查左孩子是否比根大
                if left < heap_size and heap[left] > heap[largest]:
                    largest = left
                # 2. 检查右孩子是否比当前最大的还大
                if right < heap_size and heap[right] > heap[largest]:
                    largest = right
                # 3. 结果判断：如果最大值不是根节点，就交换并继续向下寻找
                if largest != root:
                    # 交换：把较大的孩子换上来
                    heap[root], heap[largest] = heap[largest], heap[root]
                    # 更新 root 指向被交换的孩子，继续检查受影响的子树
                    root = largest
                else:
                    # 如果根节点已经是最大的，说明这棵子树已经符合大顶堆性质，跳出
                    break
        for i in range(n // 2 - 1, -1, -1):
            max_heapify(nums, i, n)
        for i in range(n - 1, 0, -1):
            nums[0], nums[i] = nums[i], nums[0]
            max_heapify(nums, 0, i)

        return nums
```

## 👽[224\. 基本计算器](https://leetcode.cn/problems/basic-calculator/)

```C++
class Solution:
    def calculate(self, s: str) -> int:
        ans,num,sign = 0,0,1
        stack = []
        for c in s:
            if c >= "0" and c <= "9":
                num = num*10 + int(c)
            elif c == "+" or c == "-":
                ans += num*sign
                num = 0
                sign = 1 if c == "+" else -1
            elif c == "(":
                stack.append(ans)
                stack.append(sign)
                ans = 0
                sign = 1
            elif c == ")":
                ans += num*sign
                num = 0
                ans = ans * stack.pop()
                ans = ans + stack.pop()
        ans += num*sign
        return ans
```



