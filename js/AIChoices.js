/**
 *TicTacToe Javascript v1.0
 *Last Updated: 2015-07-28
 *Author: William R.A.D. Funk - http://WilliamRobertFunk.com 
*/

/**
 * Chooses the best move for the AI player
 * @param {array} board - The state of the TicTacToe board before decision.
 * @returns {Number} bestIndex - The AI choice of moves with highest score.
 * @author William R.A.D. Funk
 */
function AIchoice(board)
{
    var bestIndex = -1;
    var bestScore = -10000;
    var moveValue;
    var n = 0;

    for(n = 0; n < 9; n++)
    {
        if(board[n] == 0)
        {
            // A copy of the gameboard where hypothetical
            // moves are tested.
            var pBoard = [];
            pBoard = board.slice(0);
            pBoard[n] = 2;
            // Finds the score for this move.
            moveValue = minimax(pBoard, 0, 2);
            pBoard[n] = 0;

            if(moveValue > bestScore)
            {
                bestScore = moveValue;
                bestIndex = n;
            }
        }
    }
    return bestIndex;
}
/**
 * Uses recursive minimax to determine score of each chosen move.
 * @param {Array} tboard - The state of the TicTacToe board before decision.
 * @param {Number} depth - Number of levels down from original move.
 * @param {String} pTurn - Which player is making the move at that level.
 * @returns {Number} max - If at an odd numbered level, the max score is returned.
 * @returns {Number} min - If at an even numbered level, the min score is returned.
 * @author William R.A.D. Funk
 */
function minimax(tboard, depth, pTurn)
{
    // Ensures computer takes the immediate win when present.
    if( (depth == 0) && (checkForWin(tboard, pTurn)) )
    {
        return 1000000;
    }
    // Resetting iterative variables separately from for loops for recursion.
    var h = 0, i = 0, q = 0, v = 0;
    /** @var {Array} possibleMoves - keeps track of possible moves at each recursive layer */
    var possibleMoves = [];
    /** @var {Array} scores - keeps track of scores at each recursive layer */
    var scores = [-10000, -10000, -10000, -10000, -10000, -10000, -10000, -10000, -10000];
    // It's a new turn, change players.
    pTurn = (depth % 2 == 0) ? "1" : "2"
    // Gets all the possible moves.
    for(h = 0; h < 9; h++)
    {
        if(tboard[h] == "0")
        {
            possibleMoves.push(h);
        }
    }
    for(i = 0; i < possibleMoves.length; i++)
    {
        // A copy of the gameboard where hypothetical
        // moves are tested.
        /** @var {Array} theoreticalBoard - A clone of the gameboard where hypothetical moves are tested. */
        var theoreticalBoard = [];
        theoreticalBoard = tboard.slice(0);
        theoreticalBoard[possibleMoves[i]] = pTurn;
        /** @var {Number} moveValue - Score for that index at this level. */
        var moveValue;
        // Somebody won: negative if not computer, positive otherwise.
        if(checkForWin(theoreticalBoard, pTurn))
        {
            moveValue = (depth % 2 == 0) ? (-100 + depth) : (100 - depth);
        }
        // It's a draw
        else if(checkForTie(theoreticalBoard))
        {
            moveValue = (0 - depth);
        }
        // Recursively test remaining moves.
        else
        {
            moveValue = minimax(theoreticalBoard, depth + 1, pTurn);
        }
        // Reset board clone to avoid recursive variable conflict.
        theoreticalBoard = tboard.slice(0);
        // Score for that move is registered.
        scores[possibleMoves[i]] = moveValue;
    }
    // If it's a computer layer, the maximum is chosen.
    // Shows how computer will always choose most beneficial
    // move for itself.
    if(depth % 2 == 1)
    {
        var max = -10000
        for(k = 0; k < 9; k++)
        {
            if( (scores[k] > -10000) && (scores[k] > max) )
            {
                max = scores[k];
            }
        }
        return max;
    }
    // If it's a non-computer layer, the minimum score is returned.
    // Shows how computer's opponent will choose the least beneficial
    // move for computer.
    else
    {
        var min = 10000
        for(v = 0; v < 9; v++)
        {
            if( (scores[v] > -10000) && (scores[v] < min) )
            {
                min = scores[v];
            }
        }
        return min;
    }
}