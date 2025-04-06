*** Settings ***
Library    Browser    auto_closing_level=KEEP
Library           Collections
Library           OperatingSystem
Library           DotenvLibrary
Variables         load_env.py


*** Test Cases ***
Login to MyHealth using env

    New Browser    chromium    headless=No
    New Page    http://localhost:5173/src/pages/Kirjaudu.html
    Get Title      ==    Kirjautuminen

    ${USERNAME}=    Get Environment Variable    USERNAME
    ${PASSWORD}=    Get Environment Variable    PASSWORD

    Log    USERNAME: ${USERNAME}
    Log    PASSWORD: 

    Type Text    css=.loginForm input[type="text"]    ${Username}    delay=0.1 s
    Type Secret  css=.loginForm input[type="password"]    $Password   delay=0.1 s
    Click    css=.loginForm button

