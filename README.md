# README #

## Project ##
>
> TIF15a React Native Carpool Project
> current stage: v0.1
>

## Initial Use Information
>
> The project dependencies are not in the repo, but registered in the package.json.  
> After checking out the project run "npm install" in the project directory.
> This ensures that you have all dependencies with the right version.
>

## Conditions And Concept ##
>
> ### Summary ###
> Objective of the app is to provide the user with an easy to use
> solution to plan and manage a carpool. Hence giving the possibility
> to track fuel consumption, driven distance and payments.  
>   
>
>
> *Must have conditions are marked as fat text in the following texts.*  
> *Points that are listed but not marked are seen as nice to have.*
> ### Conditions / The App Must Provide... ###
>  
> 1. a way to enter users with associated information such as  
>    **identification information (name / aka)**  
>    **notification information (email)**  
>    payment information  
>
> 1. a way to authenticate users  
>    **via identification information and hashed password information**  
> 
> 1. a way to group users as a carpool so that  
>    **all users of the carpool are take into consideration when calculating**  
>    **the users can be managed separetly in the carpool for paymant and calculating** (days off)  
>    the users in the carpool can be notified about due payments  
>
> 1. a way to calculate pricing by taking driving information into account by  
>    **providing the possibilty to track driven distance**  
>    **providing the possibilty to track filled up fuel as well as fuel price**  
>    providing the possibilty to set up a flat rate for distance and/or time  
> 
> 1. a way to save and preserve data  
>    **in a database (local)**  
>    via availability through a remote databse (e.g. firebase)  
>
> 2. Additional nice-to-haves:  
>    achievements for driven distance, filled up fuel etc.  
>    integrated animations in general (user interaction and app behavior)  
>    options to set: e.g. another theme, set  different units (kmh / mph), use last opened, auto payment reminder etc.  
>

## Additionals ##
>
> * Material design icons https://www.materialpalette.com/icons  
> * Material design colors https://www.materialpalette.com/blue/light-blue  
>  
> * Main colors are:  
>> * RC Light Blue: #1976D2  
>> * RC Blue:       #0220FF  
>> * RC Purple:     #9600FF  
>> * RC Pink:       #FF00BA
>> * RC Amber:      #FBC02D
>>  
>> * RC Red:        #F44336
>> * RC Green:      #4CAF50 
>  
> * Text colors are:   
>> * RC Text on bright ground: #303030  
>> * RC Text on dark ground:   #FFFFFF  
>> * RC Text for hints:        #9E9E9E  
>  
>  
> * Default Android font is set to be 'Roboto'
>  

## Owners ##
>
> * Nicolas Heinen
> * Felix Dubberke (lRainZz)
>

## Useful Info ##
>
> * Install new dependencies via "npm intall --save [package name]", thus not global and with dependency-reference in the package.json  
> * When isntalling via npm fails on EPERM: error on renaming / moving, disable Antivirus / Windows Defender or try npm cache lean, as well as deleting all "package-lock.js"  
>  



## Usage examples ##
> 
> Creating a new user
> 
![Creating a new user](https://github.com/lRainZz/reactcarpool/blob/master/Create-User.gif)
>
>
> 
> Creating a new carpool
> 
![Creating a new carpool](https://github.com/lRainZz/reactcarpool/blob/master/Create-Carpool.gif)
>
>
> 
> Creating a new filling
> 
![Creating a new filling](https://github.com/lRainZz/reactcarpool/blob/master/Create-Filling.gif)
>
>
> 
> Login and inviting
> 
![Login and inviting](https://github.com/lRainZz/reactcarpool/blob/master/Login-and-Invite.gif)
>
>
>
> Aceepting an invite
> 
![Accepting an invite](https://github.com/lRainZz/reactcarpool/blob/master/Accept-Invite.gif)
