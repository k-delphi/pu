# 学习笔记：Golang Container包源码解读 

## 1. 介绍
Go 语言的容器包，提供了常用的容器类型，如列表、环、堆等。

包内共有三个子包：
- **List**   双向链表

- **Ring**   优先队列

- **Heap**   环形链表

List用于实现队列、缓存

Heap用于实现A*搜索、任务队列、调度

Ring用于实现时钟算法、循环缓存、时间轮

接下来进行逐一讲解
***
## 2.**List**
### 结构定义：
```go
type Element struct { 
    next,prev *Element
    list *List
    Value interface{}
}
```
```go
type List struct {
    root Element   //哨兵节点
    len int
}
```
---
+ **Element**是一个节点，**next**和**prev**两个指针指向下一个节点和前一个节点
+ **list**指向当前节点所在的链表
+ **Value**存放节点的值
---
+ **root**自身并不存放数据，由其内部的**next***和**prev**构成一个循环链表* 
+ **len**记录链表的长度

所有的实际节点都是通过**root.next**，**root.prev**串起来的

---
### 方法构建
构造器：
```go
func New() *List{
    return new(List).Init()
}
```
Init( )方法：
```go
func (l *List) Init() *List{
    l.root.next = &l.root
    l.root.prev = &l.root
    l.len = 0
    return l
}
```
---
- 构造器调用Init( )方法,初始化链表
- 避免头尾特殊逻辑
---
### 元素操作
#### PushFront(将元素插入到表头)
```go
func (l *List) PushFront(v any) *Element {
    return l.insertValue(v, l.root.next)
}
```
---
#### PushBack(将元素插入到表尾)
```go
func (l *List) PushBack(v any) *Element {
    return l.insertValue(v, &l.root)
}
```
---
#### insertValue( )与insert( )
```go
func (l *List) insertValue(v any, at *Element) *Element {
    e := &Element{Value: v}
    return l.insert(e, at)
}
```
- 创建新节点，委托insert( )
---

```go
func (l *List) insert(e, at *Element) *Element {
    n := at.next
    at.next = e
    e.prev = at
    e.next = n
    n.prev = e
    e.list = l
    l.len++
    return e
}
```
- 构建新节点并插入值
- 这两个方法都是内部方法，外部无法调用
- [at] <-> [n]       （原结构）
[at] <-> [e] <-> [n] （插入后结构）
---
#### Remove( )与remove( )
```go
func (l *List) Remove(e *Element) any {
    if e.list == l {
        l.remove(e)
    }
    return e.Value
}
```
- 安全检查是否属于当前列表
- 实现逻辑在remove( )方法中
```go
func (l *List) remove(e *Element) {
    e.prev.next = e.next
    e.next.prev = e.prev
    e.next = nil // for GC
    e.prev = nil
    e.list = nil
    l.len--
}
```
- 更新长度
- 解除节点与前后节点的关系
- 清空 e 的前后引用，方便 GC 回收
---
#### 遍历链表
```go
for e := l.Front(); e != nil; e = e.Next() {
    fmt.Println(e.Value)
}
```
- Front( ) 获取链表第一个元素,即**root.next**
- 终止条件是 nil（空链表的 root.next == root）
---
#### 移动元素:
- MoveBefore
- MoveAfter

```go
func (l *List) MoveToFront(e *Element) {
    if e.list != l || l.root.next == e {
        return
    }
    l.move(e, &l.root)
}
```
```go
func (l *List) MoveToBack(e *Element) {
    if e.list != l || l.root.prev == e {
        return
    }
    l.move(e, l.root.prev)
}
```
- 安全检查:
e.list != l 检查 e 是否在 l 中
已经在最前/最后就不用移动
- 调用内部方法 move( )
---
内部方法move( )
```go
func (l *List) move(e, at *Element) {
    if e.list != l || at.list != l && at != &l.root {
        return
    }
    l.insert(l.remove(e), at)
}
```
- 调用 remove(e) 拿到 e（这个操作返回 e 本身）
- 调用 insert(e, at) 插入 e 到 at 之前
---


> 小结：内部封装方法，外部调用方法；遵循DRY原则

## 3.**Heap**
**何为heap？**
> ：Go 的 heap 包没有定义“堆结构体”，而是定义了一个操作**“堆结构数据”的接口函数集**，即你提供数据，它帮你维护最小堆或最大堆的性质。
---
### Heap结构数据
```go
type Interface interface {
    sort.Interface
    Push(x any)   // 添加元素
    Pop() any     // 删除元素
}
```
其中sort包括：
```go
Len() int
Less(i, j int) bool
Swap(i, j int)
```
当结构体满足这一接口与Push/Pop方法时，便可以当作堆来操作

---
### 核心源码
#### heap.Init(构建堆)：
```go
func Init(h Interface) {
    n := h.Len()
    for i := n/2 - 1; i >= 0; i-- {
        down(h, i, n)
    }
}
```
- 从最后一个非叶子节点开始往下堆化（执行down方法）
- 把一个乱序数组变成堆
---
#### heap.Push(添加元素)：
```go
func Push(h Interface, x any) {
    h.Push(x)             // 添加到末尾
    up(h, h.Len()-1)      // 上浮修复堆结构
}
```
- 先把新元素添加到数组末尾
- 用 **up()** 向上冒泡保持堆序
---
#### heap.Pop(删除元素)：
```go
func Pop(h Interface) any {
    n := h.Len() - 1
    h.Swap(0, n)      // 顶部与末尾交换
    x := h.Pop()      // 删除末尾（原堆顶）
    down(h, 0, n)     // 下沉修复堆序
    return x
}
```
- 先把堆顶与末尾交换
- 再把末尾删除（原堆顶）
- 仅能删除堆顶元素
---

#### down( )与up( )
```go
func down(h Interface, i0, n int) bool {
    i := i0
    for {
        j1 := 2*i + 1   
        if j1 >= n {
            break      
        }

        j := j1        
        if j2 := j1 + 1; j2 < n && h.Less(j2, j1) {
            j = j2  
        }

        if !h.Less(j, i) {
            break      
        }

        h.Swap(i, j)   
        i = j        
    }
    return i > i0
}
```
```go
func up(h Interface, j int) {
    for {
        i := (j - 1) / 2 
        if i == j || !h.Less(j, i) {
            break
        }
        h.Swap(i, j) 
        j = i        
    }
}
```
- **down**为下沉函数，先找下一层左侧的节点，然后比较右侧的节点，若有更小的则直接交换，若此时到达边界则终止，否则继续下沉
- **up**为上浮函数，与down相反，先找上一层的节点，若有更小的则直接交换，否则终止
---
#### Less( )、Swap( )、Len( )
```go
Less(i, j int) bool
Swap(i, j int)
Len() int
```
- Less用于比较两个节点的大小，若满足条件则返回true，否则返回false
- Swap用于交换两个节点的位置
- Len用于获取当前堆的长度
- 这三个方法是自己实现的，heap包只负责调用
- 因此我们可以自定义结构体，实现这两个方法，然后将结构体作为参数传入heap包的函数中，即可实现堆的操作
---
#### Fix（当你修改了堆中的元素时，则你需要调用Fix方法来更新堆）
```go
func Fix(h Interface, i int) {
    if!down(h, i, h.Len()) {
        up(h, i)
    }
}
```
- 尝试下沉，失败则上浮
---
#### Push(将元素加至堆末，然后用up上浮)
```go
func Push(h Interface, x any) {
    h.Push(x)            //用户自定义的Push方法
    up(h, h.Len()-1)      
}
```
- Push的实现方法为用户自己定义，作用是将元素加至堆末
- Heap调用Push方法时，会调用up方法来上浮，完成堆的维护

>小结：heap包提供了一个接口，我们可以自定义结构体，实现接口中的方法，然后将结构体作为参数传入heap包的函数中，即可实现堆的操作；
只要重点明白了up（上浮函数）与down（下沉函数）的实现方法，理解Heap并不难
---

## 4.**Ring**
**何为ring?**

>：ring是一个环形链表，**无起点与终点**，首尾相接
---

### 结构定义
```go
type Ring struct {
    next,prev *Ring  //指针类型
    Value any
}
```
- 环形结构：最后一个节点的next指向第一个节点
每个节点的prev指向前一个结点
每个节点的next指向后一个节点
- 自定义长度控制，无len字段
---
### 创建示例
```go
r := ring.New(4) // 创建长度为 4 的环

// 赋值
n := r
for i := 0; i < r.Len(); i++ {
    n.Value = i + 1
    n = n.Next()
}
```
- 为环结构
[1] → [2] → [3] → [4] → (回到 1)
---
### 方法构建
#### 构造器New( )
```go
func New(n int) *Ring {
    if n <= 0 {
        return nil
    }
    r := new(Ring)
    p := r
    for i := 1; i < n; i++ {
        p.next = &Ring{prev: p}
        p = p.next
    }
    p.next = r
    r.prev = p
    return r
}
```
- 创建一个长度为n的环
- 若n小于等于0，则返回nil
---
#### DO函数
```go
func (r *Ring) Do(f func(any)) {
    if r == nil {
        return
    }
    n := r
    for {
        f(n.Value)
        n = n.next
        if n == r {
            break
        }
    }
}
```
- 为空则返回nil
- 遍历直到找到**r（入口）**
---
#### Next( )与Prev( )
```go
func (r *Ring) Next() *Ring {
    if r == nil {
        return nil
    }
    return r.next
}

func (r *Ring) Prev() *Ring {
    if r == nil {
        return nil
    }
    return r.prev
}
```
- 为空则返回nil
- 不为空则返回该节点下一个/上一个节点的值
---
#### Move(从该节点正向/逆向移动)
```go
func (r *Ring) Move(n int) *Ring {
    if r == nil {
        return nil
    }
    p := r
    if n < 0 {
        for ; n < 0; n++ {
            p = p.prev
        }
    } else {
        for ; n > 0; n-- {
            p = p.next
        }
    }
    return p
}
```
- 若n为0，则返回入口节点
- 根据n的值，若为正就正向移动入口节点，负则逆向移动入口节点
---
#### Link（连接两个ring）
```go
func (r *Ring) Link(s *Ring) *Ring {
    if s == nil {
        return r
    }

    n := r.next
    p := s.prev

    r.next = s
    s.prev = r
    p.next = n
    n.prev = p

    return n
}
```
- r为**当前**环的入口节点，s为**要拼接**的环的入口节点

例如：
r <-> n
s <-> ... <-> p
拼接后则变为：r <-> s ... p <-> n
相当于把r与n之间加入s与p

---
#### Unlink(拆出一段子环)
```go
func (r *Ring) Unlink(n int) *Ring {
    if n <= 0 {
        return nil
    }
    return r.Link(r.Move(n + 1))
}
```
- 若n小于等于0，则返回nil
- 若n大于0，则从入口节点的下一个节点开始，“剪断”n个节点（从r+1到r+n），然后变为两个完整的环

示例：
```go
r := ring.New(5)
i := r
for _, v := range []string{"A", "B", "C", "D", "E"} {
    i.Value = v
    i = i.Next()
}

cut := r.Unlink(2)
```
原环：[A] [B] [C] [D] [E]
r 是 A，Unlink(2) 拆走的是 B C
结构变为：A <-> D <-> E <-> A
cut 是 B<->C<->B

---
