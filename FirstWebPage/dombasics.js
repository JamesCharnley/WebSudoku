var boardslots = document.getElementsByClassName("board-input");

var board = [[9], [9], [9], [9], [9], [9], [9], [9], [9]]; 
var startBoard = [[9], [9], [9], [9], [9], [9], [9], [9], [9]]; 

Update2DArray();

GenerateRandomPuzzle();

function GenerateRandomPuzzle()
{
    for (var i = 0; i < 7; i++) 
    {
        for (var x = 0; x < 9; x++) 
        {
            var slot = new Slot();
            slot.x = x;
            if(GetRandEmptySlotInRow(slot) == true)
            {
                var num = getRandomInt(1, 9);
                if(IsValid(slot.x, slot.y, num) == true)
                {
                    board[slot.x][slot.y] = num;
                    startBoard[slot.x][slot.y] = num;
                    boardslots[(slot.x * 9) + slot.y].disabled = true;
                }
            }
        
        }    
    }
    if(Solve())
    {
        for (var x = 0; x < 9; x++) 
        {
            for (var y = 0; y < 9; y++) 
            {
            
                board[x][y] = startBoard[x][y];
            }    
        }
    }
    else
    {
        ClearBoard();
        GenerateRandomPuzzle();
    }

    UpdateElements();
}

function ResetBoard(_board)
{
    for (var x = 0; x < 9; x++) 
    {
        for (var y = 0; y < 9; y++) 
        {
            
            _board[x][y] = 0;
        }    
    }
}

function TryInsertNumber()
{
    var y = getRandomInt(0, 8);
    var num = getRandomInt(1, 9);
    if(IsValid(x, y, num) == true)
    {
        board[x][y] = num;
    }
}

function GetRandEmptySlotInRow(_slot)
{
    var y = getRandomInt(0, 8);
    if(board[_slot.x][y] == 0)
    {
        _slot.y = y;
        return true;
    }
    else
    {
        return GetRandEmptySlotInRow(_slot);
    }
}

function ClearBoard()
{
    Array.prototype.forEach.call(boardslots, function(slot) {
        
        slot.disabled = false;
        slot.value = "";
    });    
    ResetBoard(board);
    ResetBoard(startBoard);
    /*for (var x = 0; x < 9; x++) 
    {
        for (var y = 0; y < 9; y++) 
        {
            board[x][y] = 0;
        }
    }
    */
}

function NewGame()
{
    ClearBoard();
    GenerateRandomPuzzle();
}
let newGameBtn = document.getElementById("new-button");
newGameBtn.addEventListener('click', event => {
    NewGame();
});

let clearBtn = document.getElementById("clear-button");
clearBtn.addEventListener('click', event => {
    ClearBoard();
});

function FinishButtonPressed() 
{
    Update2DArray();
    var ts = new Slot();
    ts.x = 5;
    ts.y = 8;
    FindEmpty(ts);
    
}
let btn = document.getElementById("finish-button");
btn.addEventListener('click', event => {
    FinishButtonPressed();
});

function SolveButtonPressed()
{
    Update2DArray();
    var s = Solve();
    if(s == true)
    {
        UpdateElements();
    }
    else
    {
        alert("No Solution");
    }
}
let solvebtn = document.getElementById("solve-button");
solvebtn.addEventListener('click', event => {
    SolveButtonPressed();
});

function Slot()
{
    this.x = 0;
    this.y = 0;
}



function FindEmpty(_slotRef)
{
    for (var x = 0; x < 9; x++) 
    {
        for (var y = 0; y < 9; y++) 
        {
            if(board[x][y] == 0)
            {
                _slotRef.x = x;
                _slotRef.y = y;
                return true;
            }
        }
    }
    return false;
}


function Update2DArray()
{
    var x = 0;
    var y = 0;
    var count = 0;
    Array.prototype.forEach.call(boardslots, function(slot) {
        
        if(slot.value == "")
        {
            board[x][y] = 0;
        }
        else
        {
            board[x][y] = slot.value;
        }

        if(y == 8)
        {
            x++;
            y = 0;
        }
        else
        {
            y++;
        }
        count++;

    
    });

    
}

function UpdateElements()
{
    var x = 0;
    var y = 0;
    var count = 0;
    Array.prototype.forEach.call(boardslots, function(slot) {
        
        if(board[x][y] != 0)
        {
            slot.value = board[x][y];
        }

        if(y == 8)
        {
            x++;
            y = 0;
        }
        else
        {
            y++;
        }
        count++;

    
    });

    
}

function PrintBoard()
{
    console.log(board[0][0] + " " + board[0][1] + " " + board[0][2] + " " + board[0][3] + " " + board[0][4] + " " + board[0][5] + " " + board[0][6] + " " + board[0][7] + " " + board[0][8]);
    console.log(board[1][0] + " " + board[1][1] + " " + board[1][2] + " " + board[1][3] + " " + board[1][4] + " " + board[1][5] + " " + board[1][6] + " " + board[1][7] + " " + board[1][8]);
    console.log(board[2][0] + " " + board[2][1] + " " + board[2][2] + " " + board[2][3] + " " + board[2][4] + " " + board[2][5] + " " + board[2][6] + " " + board[2][7] + " " + board[2][8]);

    console.log(board[3][0] + " " + board[3][1] + " " + board[3][2] + " " + board[3][3] + " " + board[3][4] + " " + board[3][5] + " " + board[3][6] + " " + board[3][7] + " " + board[3][8]);
    console.log(board[4][0] + " " + board[4][1] + " " + board[4][2] + " " + board[4][3] + " " + board[4][4] + " " + board[4][5] + " " + board[4][6] + " " + board[4][7] + " " + board[4][8]);
    console.log(board[5][0] + " " + board[5][1] + " " + board[5][2] + " " + board[5][3] + " " + board[5][4] + " " + board[5][5] + " " + board[5][6] + " " + board[5][7] + " " + board[5][8]);

    console.log(board[6][0] + " " + board[6][1] + " " + board[6][2] + " " + board[6][3] + " " + board[6][4] + " " + board[6][5] + " " + board[6][6] + " " + board[6][7] + " " + board[6][8]);
    console.log(board[7][0] + " " + board[7][1] + " " + board[7][2] + " " + board[7][3] + " " + board[7][4] + " " + board[7][5] + " " + board[7][6] + " " + board[7][7] + " " + board[7][8]);
    console.log(board[8][0] + " " + board[8][1] + " " + board[8][2] + " " + board[8][3] + " " + board[8][4] + " " + board[8][5] + " " + board[8][6] + " " + board[8][7] + " " + board[8][8]);
}

function Solve()
{

    var slot = new Slot();
    var emptyExists = FindEmpty(slot);
    if(emptyExists == false)
    {
        return true;
    }

    for (var i = 1; i < 10; i++)
    {
        if (IsValid(slot.x, slot.y, i) == true)
        {
            
            board[slot.x][slot.y] = i;
            

            if (Solve() == true)
            {
                return true;
            }

            board[slot.x][slot.y] = 0;
        }
        
    }
    return false;
}

function ExistsInRow(_row, _num)
{
    for (var x = 0; x < 9; x++) 
    {
        if(board[_row][x] == _num)
        {
            return true;
        }
    }
    return false;
}
function ExistsInCol(_col, _num)
{
    for (var y = 0; y < 9; y++) 
    {
        if(board[y][_col] == _num)
        {
            return true;
        }
    }
    return false;
}
function ExistsInBox(_row, _col, _num)
{
    for (var x = 0; x < 3; x++) {
        for (var y = 0; y < 3; y++) {
            if (board[x + _row][y + _col] == _num)
            {
                return true;
            }
        }
    }
    return false;
}
function IsValid(_row, _col, _num)
{
    if(board[_row][_col] == 0)
    {
        if(!ExistsInRow(_row, _num))
        {
            if(!ExistsInCol(_col, _num))
            {
                if(!ExistsInBox(_row - _row % 3, _col - _col % 3, _num))
                {
                    return true;
                }
            }
        }
    }
    return false;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is exclusive and the minimum is inclusive
}