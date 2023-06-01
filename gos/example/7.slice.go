//go:build ignore

package main

import "fmt"

func main(){
	
	s := make([]string, 3)
	s[0] = 'a'
	s[1] = 'b'
	s[2] = 'c'
	fmt.Println("get 2 : ", s[2])
	fmt.Println("len: ", len(s))

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