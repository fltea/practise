//go:build ignore

package main

import "fmt"

func main(){
	var a [5]int
	a[4] = 100
	fmt.Println("get 2 : ", a[2])
	fmt.Println("len: ", len(a))

	b := [5]int(1,2,3,4,5)
	fmt.Println("b: ", b)

	var td [2][3]int
	for i := 0; i < 2; i++ {
		for j := 0; j < 3; j++ {
			td[i][j] = i + j
		}
	}
	fmt.Println("td: ", td)
}