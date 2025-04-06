*** Settings ***
Library     Browser      auto_closing_level=SUITE
Library     CryptoLibrary     variable_decryption=True

*** Variables ***
${Username}    crypt:ZKqJyjDiGorvMd/rrQzYVco5ocTU028EwoPWoznt7FoQR2xt9b/4AlhPB+4QxhMw71CMfOQ=
${Password}    crypt:Pv/puBot7UQHGVh8uMocgg1nx783P3NDrGsAn2GR5WvWofFqx/t26mThwj39Q1mTVuy7la7S/VpLerM=

*** Test Cases ***
Login to MyHealth with CryptoLibrary

    New Browser     chromium    headless=No
    New Page        http://localhost:5173/src/pages/Kirjaudu.html
    Get Title       ==    Kirjautuminen

    Type Text       css=.loginForm input[type="text"]        ${Username}    delay=0.1s
    Type Secret     css=.loginForm input[type="password"]    $Password   delay=0.1s
    Click           css=.loginForm button
