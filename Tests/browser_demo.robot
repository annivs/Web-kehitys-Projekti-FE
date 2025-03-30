*** Settings ***
Library     Browser    auto_closing_level=KEEP
Resource    Keywords.robot  

*** Test Cases ***
Test MyHealth
    New Browser    chromium    headless=No  
    New Page       http://localhost:5173/src/pages/Kirjaudu.html 
    Get Title      ==    Kirjautuminen
    Type Text    css=.loginForm input[type="text"]    ${Username}    delay=0.1 s
    Type Secret  css=.loginForm input[type="password"]    $Password   delay=0.1 s
    Click    css=.loginForm button
