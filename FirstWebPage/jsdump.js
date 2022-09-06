function Solve()
{
    var slot = new Slot();
    var emptyExists = FindEmpty(slot);
    if(emptyExists == false)
    {
        alert("Solved");
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
        if(board[x][_row] == _num)
        {
            return true;
        }
    }
    return false;
}
function ExistsInCol(_Col, _num)
{
    for (var y = 0; y < 9; y++) 
    {
        if(board[_col][y] == _num)
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
            if (board[x + _col][y + _row] == _num)
            {
                retuen true;
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