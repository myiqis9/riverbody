//script here if needed
//ideas:
//start with an introduction page and a start button. will need states
//- drag human and body textboxes to fillers under two images, then checks if correct when both are in
//- literally jjust simple A or B options for a simple image
//- idk nothing too crazy dont kys over this one

//for style (idk how to comment) 
//- simple tumblr-style minimalist central square box, reuse the old one I have thats circular?
//- double borders to make it cute
//- blue-gray

/*
0 - title
1 - q1
2 - q1
3 - q3
4 - q4
5 - q5
6 - q6
7 - win
8 - lose */
let state = 0;

//find all the components of each state and add them to a respective array
//when changing page, turn all in activePage to false, state++, pages[state] to activePage, show all
let activePage;
let titleP = [], q1P = [], q2P = [], q3P = [], q4P = [], q5P = [], q6P = [], winP = [], loseP =[];
let pages = [titleP, q1P, q2P, q3P, q4P, q5P, q6P, winP, loseP];
