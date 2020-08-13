    // 24576 is the address of the keyboard 16384-24575 exactly 8K is the address of the screen
    @24575
    D = A

    // R0 stores the maximum address of the screen
    @0
    M = D

    // R1 stores the current address of the screen
    @SCREEN
    D = A
    @1
    M = D
(LOOP)
    @KBD
    D = M
    @FILL
    D;JGT

    @CLEAR
    0;JMP
(FILL)
    // Determine whether the screen is full
    @0
    D = M
    @1
    D = D - M
    @LOOP
    D;JLT

    @1
    D = M
    A = M
    // Black
    M = -1
    
    @1
    M = D + 1

    @LOOP
    0;JMP
(CLEAR)
    // Is Screen null
    @SCREEN
    D = A
    @1
    D = D - M
    @LOOP
    D;JGT

    @1
    D = M
    A = M
    M = 0

    @1
    M = D - 1

    @LOOP
    0;JMP