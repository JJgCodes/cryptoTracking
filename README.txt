--CRYPTO TRACKER APP--

Will track crypto portfolio from realtime data provided by coingecko API. 

Development using MERN stack.

Current Database Structure (MongoDB): 
        cryptoHoldings 
            - holdings
            - transactions



DB stores each indiviual input/transaction, creates a holding of combined transactions per crypto if none exsist. 



--> Some TODOS: 
    - Add live data into table corresponding to holdings
    - Then add user visual aids such as cell green for holding gain or red for loss. 
        (consider an onclick showing -/+ in $ or %)
    - Move table into it's own compnent along with the modal and corresponding form 
    - Add remove/delete capability  - currently not implemented on backend
    - Consider a login page for a user 
    - UI/UX design elements and overall app look

--> Some Options/thoughts:
    - Make holdings the only display unless the corresponding line is clicked then show drop down of tranasctions
    - Server-side fetching of coingecko API + calculations or could this be kept client-side?



