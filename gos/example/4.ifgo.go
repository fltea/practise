//go:build ignore

package main

import "fmt"

/*
error： main redeclared in this block (see details)
1. 同一个目录下面不能有多个package main，调整或者创建多个文件夹分别放入对应的文件下执行即可。
2. //go:build ignore 要在package定义之前加上并且后面至少一个空行
*/
func main() {

	if 7%2 == 0 {
		fmt.Println("7 is even")
	} else {
		fmt.Println("7 is odd")
	}

	if 8%4 == 0 {
		fmt.Println("8 is divisible by 4")
	}

	if num := 9; num < 0 {
		fmt.Println(num, "is negative")
	} else if num < 10 {
		fmt.Println(num, "has 1 digit")
	} else {
		fmt.Println(num, "has muiltiple digits")
	}
}
